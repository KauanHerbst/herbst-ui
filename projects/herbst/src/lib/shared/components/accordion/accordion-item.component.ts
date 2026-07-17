import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkAccordionItem } from '@angular/cdk/accordion';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbAccordionComponent } from './accordion.component';
import {
  accordionContentVariants,
  accordionItemVariants,
  accordionTriggerVariants,
} from './accordion.variants';

@Component({
  selector: 'hb-accordion-item',
  hostDirectives: [CdkAccordionItem],
  imports: [NgIcon],
  template: `
    <button
      type="button"
      data-slot="accordion-trigger"
      [id]="'trigger-' + cdkItem.id"
      [attr.aria-controls]="'region-' + cdkItem.id"
      [attr.aria-expanded]="expanded()"
      [disabled]="hbDisabled()"
      [class]="triggerClasses"
      (click)="onTriggerClick()"
    >
      {{ hbTitle() }}
      <ng-icon name="phosphorCaretDown" [class.rotate-180]="expanded()" />
    </button>

    <div
      role="region"
      data-slot="accordion-content"
      [id]="'region-' + cdkItem.id"
      [attr.aria-labelledby]="'trigger-' + cdkItem.id"
      [attr.data-state]="state()"
      [inert]="!expanded()"
      [class]="contentClasses"
    >
      <div class="overflow-hidden">
        <div class="pt-0 pb-4">
          <ng-content />
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorCaretDown })],
  host: {
    '[class]': 'itemClasses()',
    '[attr.data-slot]': "'accordion-item'",
    '[attr.data-state]': 'state()',
    '[attr.data-disabled]': "hbDisabled() ? '' : null",
  },
  exportAs: 'hbAccordionItem',
})
export class HbAccordionItemComponent {
  protected readonly cdkItem = inject(CdkAccordionItem);
  private readonly parent = inject(HbAccordionComponent);

  readonly hbTitle = input<string>('');
  readonly hbValue = input<string>('');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  private readonly _expanded = signal(false);
  readonly expanded = this._expanded.asReadonly();
  protected readonly state = computed(() => (this._expanded() ? 'open' : 'closed'));

  protected readonly itemClasses = computed(() =>
    cn(accordionItemVariants({ bordered: this.parent.hbBordered() }), this.class()),
  );
  protected readonly triggerClasses = cn(accordionTriggerVariants());
  protected readonly contentClasses = cn(accordionContentVariants());

  constructor() {
    this.cdkItem.expandedChange
      .pipe(takeUntilDestroyed())
      .subscribe((v) => this._expanded.set(v));

    effect(() => {
      this.cdkItem.disabled = this.hbDisabled();
    });
  }

  open(): void {
    this.cdkItem.open();
  }

  onTriggerClick(): void {
    if (this.expanded() && !this.parent.canClose()) return;
    this.cdkItem.toggle();
  }
}
