import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { cardTitleVariants } from './card.variants';

@Component({
  selector: 'hb-card-title, [hb-card-title]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'card-title'" },
  exportAs: 'hbCardTitle',
})
export class HbCardTitleComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(cardTitleVariants(), this.class()));
}
