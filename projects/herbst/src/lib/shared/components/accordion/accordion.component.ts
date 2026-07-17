import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CDK_ACCORDION, CdkAccordion } from '@angular/cdk/accordion';

import { cn, type ClassValue } from '../../utils';
import { accordionVariants, type HbAccordionBordered } from './accordion.variants';
import { HbAccordionItemComponent } from './accordion-item.component';

@Component({
  selector: 'hb-accordion',
  hostDirectives: [CdkAccordion],
  providers: [{ provide: CDK_ACCORDION, useExisting: CdkAccordion }],
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'accordion'",
  },
  exportAs: 'hbAccordion',
})
export class HbAccordionComponent {
  private readonly cdk = inject(CdkAccordion);

  readonly hbType = input<'single' | 'multiple'>('single');
  readonly hbCollapsible = input(true, { transform: booleanAttribute });
  readonly hbBordered = input<HbAccordionBordered>('divider');
  readonly hbDefaultValue = input<string | string[]>('');
  readonly class = input<ClassValue>('');

  readonly items = contentChildren(HbAccordionItemComponent);

  protected readonly classes = computed(() =>
    cn(accordionVariants({ bordered: this.hbBordered() }), this.class()),
  );

  constructor() {
    effect(() => {
      this.cdk.multi = this.hbType() === 'multiple';
    });

    afterNextRender(() => {
      const dv = this.hbDefaultValue();
      const values = Array.isArray(dv) ? dv : dv ? [dv] : [];
      for (const item of this.items()) {
        if (values.includes(item.hbValue())) item.open();
      }
    });
  }

  canClose(): boolean {
    if (this.hbCollapsible()) return true;
    const openCount = this.items().filter((i) => i.expanded()).length;
    return openCount > 1;
  }
}
