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
import { cardHeaderVariants } from './card.variants';

@Component({
  selector: 'hb-card-header, [hb-card-header]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'card-header'" },
  exportAs: 'hbCardHeader',
})
export class HbCardHeaderComponent {
  private readonly card = inject(HbCardComponent);
  readonly hbBorder = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(cardHeaderVariants({ size: this.card.hbSize(), border: this.hbBorder() }), this.class()),
  );
}
