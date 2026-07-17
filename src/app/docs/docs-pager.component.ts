import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ALL_DOC_SLUGS, COMPONENT_NAMES, titleFromSlug } from './docs-nav';
import { LocaleService } from './locale.service';
import { TranslatePipe } from './t.pipe';

interface PagerLink {
  link: unknown[];
  title: string;
}

@Component({
  selector: 'app-docs-pager',
  imports: [RouterLink, TranslatePipe],
  template: `
    <nav class="mt-16 flex items-stretch justify-between gap-4 border-t border-border pt-6">
      @if (prev(); as p) {
        <a
          [routerLink]="p.link"
          class="group flex flex-col gap-1 rounded-md border border-border px-4 py-3 transition-colors hover:bg-accent/50"
        >
          <span class="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {{ 'pager.prev' | t }}
          </span>
          <span class="font-medium">← {{ p.title }}</span>
        </a>
      } @else {
        <span></span>
      }

      @if (next(); as n) {
        <a
          [routerLink]="n.link"
          class="group ml-auto flex flex-col items-end gap-1 rounded-md border border-border px-4 py-3 text-right transition-colors hover:bg-accent/50"
        >
          <span class="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {{ 'pager.next' | t }}
          </span>
          <span class="font-medium">{{ n.title }} →</span>
        </a>
      }
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPagerComponent {
  protected readonly loc = inject(LocaleService);
  readonly slug = input.required<string>();

  private readonly index = computed(() => ALL_DOC_SLUGS.indexOf(this.slug()));

  protected readonly prev = computed(() =>
    this.index() > 0 ? this.entry(ALL_DOC_SLUGS[this.index() - 1]) : null,
  );
  protected readonly next = computed(() => {
    const i = this.index();
    return i >= 0 && i < ALL_DOC_SLUGS.length - 1 ? this.entry(ALL_DOC_SLUGS[i + 1]) : null;
  });

  private entry(slug: string): PagerLink {
    const isComponent = COMPONENT_NAMES.includes(slug);
    return {
      link: isComponent ? this.loc.docsLink('components', slug) : this.loc.docsLink(slug),
      title: isComponent ? titleFromSlug(slug) : this.loc.t(`page.${slug}`),
    };
  }
}
