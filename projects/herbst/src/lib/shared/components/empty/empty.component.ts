import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  emptyVariants,
  type HbEmptyBackground,
  type HbEmptySize,
  type HbEmptyVariant,
} from './empty.variants';

@Component({
  selector: 'hb-empty, [hb-empty]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'empty'" },
  exportAs: 'hbEmpty',
})
export class HbEmptyComponent {
  readonly hbSize = input<HbEmptySize>('md');
  readonly hbVariant = input<HbEmptyVariant>('default');
  readonly hbBackground = input<HbEmptyBackground>('none');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      emptyVariants({
        size: this.hbSize(),
        variant: this.hbVariant(),
        background: this.hbBackground(),
      }),
      this.class(),
    ),
  );
}
