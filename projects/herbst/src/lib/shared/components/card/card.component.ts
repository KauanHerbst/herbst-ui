import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { cardActionVariants, cardVariants, type HbCardSize } from './card.variants';

@Component({
  selector: 'hb-card, [hb-card]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'card'" },
  exportAs: 'hbCard',
})
export class HbCardComponent {
  readonly hbSize = input<HbCardSize>('md');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(cardVariants({ size: this.hbSize() }), this.class()),
  );
}

@Directive({
  selector: '[hb-card-action]',
  host: {
    class: 'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
    '[attr.data-slot]': "'card-action'",
    '(click)': 'hbActionClick.emit()',
  },
  exportAs: 'hbCardAction',
})
export class HbCardActionDirective {
  readonly hbActionClick = output<void>();
  protected readonly baseClasses = cardActionVariants();
}
