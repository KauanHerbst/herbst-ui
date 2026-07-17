import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { emptyMediaVariants, type HbEmptyMediaVariant } from './empty.variants';

@Component({
  selector: 'hb-empty-media, [hb-empty-media]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'empty-media'" },
  exportAs: 'hbEmptyMedia',
})
export class HbEmptyMediaComponent {
  readonly hbVariant = input<HbEmptyMediaVariant>('default');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(emptyMediaVariants({ variant: this.hbVariant() }), this.class()),
  );
}
