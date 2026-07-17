import { Clipboard } from '@angular/cdk/clipboard';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck, phosphorCopy } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbButtonComponent } from '../button';
import {
  codeBlockHeaderVariants,
  codeBlockVariants,
  type HbCodeLanguage,
} from './code-block.variants';
import { HbHighlightService } from './highlight.service';

@Component({
  selector: 'hb-code-block',
  imports: [NgIcon, HbButtonComponent],
  viewProviders: [provideIcons({ phosphorCopy, phosphorCheck })],
  template: `
    @if (hbShowHeader()) {
      <div [class]="headerClasses">
        <span class="truncate font-mono text-foreground/75 normal-case tracking-normal">
          {{ label() }}
        </span>
        @if (hbCopyButton()) {
          <button
            hb-button
            hbType="ghost"
            hbSize="icon"
            class="ml-auto size-7"
            [attr.aria-label]="copied() ? 'Copied' : 'Copy'"
            (click)="copy()"
          >
            <ng-icon [name]="copied() ? 'phosphorCheck' : 'phosphorCopy'" [class.text-success]="copied()" />
          </button>
        }
      </div>
    }

    <div class="hb-code-scroll overflow-auto" [style.maxHeight.px]="hbMaxHeight() || null">
      @if (highlightedHtml(); as html) {
        <div class="hb-code-shiki" [innerHTML]="html"></div>
      } @else {
        <pre class="hb-code-fallback"><code>{{ hbCode() }}</code></pre>
      }
    </div>

    @if (!hbShowHeader() && hbCopyButton()) {
      <button
        hb-button
        hbType="ghost"
        hbSize="icon"
        class="absolute top-2 right-2 size-7 bg-card/70 opacity-0 backdrop-blur transition-opacity group-hover/code:opacity-100 focus-visible:opacity-100"
        [attr.aria-label]="copied() ? 'Copied' : 'Copy'"
        (click)="copy()"
      >
        <ng-icon [name]="copied() ? 'phosphorCheck' : 'phosphorCopy'" [class.text-success]="copied()" />
      </button>
    }
  `,
  styles: `
    [data-slot='code-block'] .hb-code-shiki .shiki,
    [data-slot='code-block'] .hb-code-fallback {
      margin: 0;
      padding: 0.875rem 1rem;
      background: transparent !important;
      font-family: var(--font-mono);
      font-size: 0.8125rem;
      line-height: 1.7;
      tab-size: 2;
      overflow: visible;
    }
    [data-slot='code-block'] .hb-code-fallback code {
      font-family: inherit;
      color: var(--foreground);
    }
    [data-slot='code-block'][data-wrap='true'] .shiki code,
    [data-slot='code-block'][data-wrap='true'] .hb-code-fallback code {
      white-space: pre-wrap;
      word-break: break-word;
    }
    [data-slot='code-block'][data-line-numbers='true'] .shiki code {
      counter-reset: hb-line;
    }
    [data-slot='code-block'][data-line-numbers='true'] .shiki .line::before {
      counter-increment: hb-line;
      content: counter(hb-line);
      display: inline-block;
      width: 1.25rem;
      margin-right: 1.25rem;
      text-align: right;
      color: var(--muted-foreground);
      opacity: 0.55;
      user-select: none;
    }
    [data-slot='code-block'] .shiki .line.highlighted {
      display: inline-block;
      width: 100%;
      background: color-mix(in oklab, var(--primary) 9%, transparent);
      box-shadow: inset 2px 0 0 var(--primary);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'code-block'",
    '[attr.data-wrap]': 'hbWrap()',
    '[attr.data-line-numbers]': 'hbLineNumbers()',
  },
  exportAs: 'hbCodeBlock',
})
export class HbCodeBlockComponent {
  private readonly highlighter = inject(HbHighlightService);
  private readonly clipboard = inject(Clipboard);
  private readonly sanitizer = inject(DomSanitizer);

  readonly hbCode = input<string>('');
  readonly hbLanguage = input<HbCodeLanguage>('ts');
  readonly hbFilename = input<string>('');
  readonly hbShowHeader = input(true, { transform: booleanAttribute });
  readonly hbCopyButton = input(true, { transform: booleanAttribute });
  readonly hbLineNumbers = input(false, { transform: booleanAttribute });
  readonly hbWrap = input(false, { transform: booleanAttribute });
  readonly hbMaxHeight = input<number>(0);
  readonly hbHighlightLines = input<number[]>([]);
  readonly class = input<ClassValue>('');

  readonly hbCopy = output<void>();

  protected readonly copied = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml | null>(null);

  protected readonly classes = computed(() => cn(codeBlockVariants(), this.class()));
  protected readonly headerClasses = codeBlockHeaderVariants();
  protected readonly label = computed(() => this.hbFilename() || this.hbLanguage());

  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      const code = this.hbCode();
      const language = this.hbLanguage();
      const lines = this.hbHighlightLines();

      if (!code) {
        this.highlightedHtml.set(null);
        return;
      }

      this.highlighter
        .highlight(code, language, lines)
        .then((html) => this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html)))
        .catch(() => this.highlightedHtml.set(null));
    });
  }

  protected copy(): void {
    this.clipboard.copy(this.hbCode());
    this.copied.set(true);
    this.hbCopy.emit();
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copied.set(false), 2000);
  }
}
