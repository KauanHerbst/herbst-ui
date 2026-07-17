import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { marked } from 'marked';

import { HbCodeBlockImports, type HbCodeLanguage } from '@herbst/ui';

import { slugify } from '../docs-nav';
import { DocsPagerComponent } from '../docs-pager.component';
import { TranslatePipe } from '../t.pipe';

interface ProseBlock {
  kind: 'prose';
  html: SafeHtml;
}

interface CodeBlock {
  kind: 'code';
  code: string;
  language: HbCodeLanguage;
}

type DocBlock = ProseBlock | CodeBlock;

@Component({
  selector: 'app-markdown-page',
  imports: [HbCodeBlockImports, DocsPagerComponent, TranslatePipe],
  template: `
    @if (blocks(); as list) {
      @for (block of list; track $index) {
        @if (block.kind === 'code') {
          <hb-code-block
            class="my-6"
            [hbShowHeader]="false"
            [hbCode]="block.code"
            [hbLanguage]="block.language"
          />
        } @else {
          <article class="docs-prose" [innerHTML]="block.html"></article>
        }
      }

      <app-docs-pager [slug]="slug" />
    } @else {
      <article class="docs-prose">
        <h1>404</h1>
        <p>{{ 'doc.error' | t }}</p>
      </article>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly slug = (this.route.snapshot.data['slug'] as string) ?? 'introduction';
  private readonly routeData = toSignal(this.route.data);

  protected readonly blocks = computed<DocBlock[] | null>(() => {
    const markdown = this.routeData()?.['markdown'] as string | null | undefined;
    return markdown == null ? null : this.toBlocks(markdown);
  });

  private toBlocks(markdown: string): DocBlock[] {
    const tokens = marked.lexer(markdown);
    const blocks: DocBlock[] = [];
    let prose = '';

    const flush = () => {
      if (!prose.trim()) {
        prose = '';
        return;
      }
      const html = this.withHeadingIds(marked.parse(prose, { async: false }) as string);
      blocks.push({ kind: 'prose', html: this.sanitizer.bypassSecurityTrustHtml(html) });
      prose = '';
    };

    for (const token of tokens) {
      if (token.type === 'code') {
        flush();
        blocks.push({
          kind: 'code',
          code: token.text,
          language: (token.lang || 'bash') as HbCodeLanguage,
        });
      } else {
        prose += token.raw;
      }
    }

    flush();
    return blocks;
  }

  private withHeadingIds(html: string): string {
    return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level, inner) => {
      const id = slugify(String(inner).replace(/<[^>]+>/g, ''));
      return `<h${level} id="${id}">${inner}</h${level}>`;
    });
  }
}
