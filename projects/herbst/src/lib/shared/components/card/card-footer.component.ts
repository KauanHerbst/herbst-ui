import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbCardComponent } from './card.component';
import { cardFooterVariants } from './card.variants';

@Component({
  selector: 'hb-card-footer, [hb-card-footer]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'card-footer'" },
  exportAs: 'hbCardFooter',
})
export class HbCardFooterComponent {
  private readonly card = inject(HbCardComponent);
  readonly hbBorder = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(cardFooterVariants({ size: this.card.hbSize(), border: this.hbBorder() }), this.class()),
  );
}
