import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbCardComponent } from './card.component';
import { cardContentVariants } from './card.variants';

@Component({
  selector: 'hb-card-content, [hb-card-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'card-content'" },
  exportAs: 'hbCardContent',
})
export class HbCardContentComponent {
  private readonly card = inject(HbCardComponent);
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(cardContentVariants({ size: this.card.hbSize() }), this.class()),
  );
}
