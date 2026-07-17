import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { cardDescriptionVariants } from './card.variants';

@Component({
  selector: 'hb-card-description, [hb-card-description]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'card-description'" },
  exportAs: 'hbCardDescription',
})
export class HbCardDescriptionComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(cardDescriptionVariants(), this.class()));
}
