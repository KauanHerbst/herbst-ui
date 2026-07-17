import { Clipboard } from '@angular/cdk/clipboard';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck, phosphorCode, phosphorCopy } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbButtonComponent } from '../button';
import { HbCodeBlockComponent, type HbCodeLanguage } from '../code-block';
import {
  codePreviewSurfaceVariants,
  codePreviewToolbarVariants,
  codePreviewVariants,
  type HbCodePreviewAlign,
} from './code-preview.variants';

@Component({
  selector: 'hb-code-preview',
  imports: [NgIcon, HbButtonComponent, HbCodeBlockComponent],
  viewProviders: [provideIcons({ phosphorCode, phosphorCopy, phosphorCheck })],
  template: `
    <div [class]="surfaceClasses()">
      <ng-content />
    </div>

    <div [class]="toolbarClasses">
      <button
        hb-button
        hbType="ghost"
        hbSize="sm"
        class="gap-1.5 font-mono text-[0.6875rem] tracking-[0.06em] text-muted-foreground uppercase"
        (click)="toggle()"
      >
        <ng-icon name="phosphorCode" />
        {{ hbExpanded() ? 'Hide code' : 'Show code' }}
      </button>

      <button
        hb-button
        hbType="ghost"
        hbSize="icon"
        class="size-7"
        [attr.aria-label]="copied() ? 'Copied' : 'Copy'"
        (click)="copy()"
      >
        <ng-icon [name]="copied() ? 'phosphorCheck' : 'phosphorCopy'" [class.text-success]="copied()" />
      </button>
    </div>

    @if (hbExpanded()) {
      <hb-code-block
        [hbCode]="hbCode()"
        [hbLanguage]="hbLanguage()"
        [hbLineNumbers]="hbLineNumbers()"
        [hbShowHeader]="false"
        [hbCopyButton]="false"
        class="rounded-none border-0 border-t border-border shadow-none"
      />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'code-preview'",
  },
  exportAs: 'hbCodePreview',
})
export class HbCodePreviewComponent {
  private readonly clipboard = inject(Clipboard);

  readonly hbCode = input<string>('');
  readonly hbLanguage = input<HbCodeLanguage>('angular-ts');
  readonly hbLineNumbers = input(false, { transform: booleanAttribute });
  readonly hbAlign = input<HbCodePreviewAlign>('center');
  readonly hbExpanded = model(false);
  readonly class = input<ClassValue>('');

  protected readonly copied = signal(false);

  protected readonly classes = computed(() => cn(codePreviewVariants(), this.class()));
  protected readonly toolbarClasses = codePreviewToolbarVariants();
  protected readonly surfaceClasses = computed(() =>
    codePreviewSurfaceVariants({ align: this.hbAlign() }),
  );

  private resetTimer?: ReturnType<typeof setTimeout>;

  protected toggle(): void {
    this.hbExpanded.update((value) => !value);
  }

  protected copy(): void {
    this.clipboard.copy(this.hbCode());
    this.copied.set(true);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copied.set(false), 2000);
  }
}
