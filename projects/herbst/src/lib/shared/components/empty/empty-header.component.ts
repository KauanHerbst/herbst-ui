import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { emptyHeaderVariants } from './empty.variants';

@Component({
  selector: 'hb-empty-header, [hb-empty-header]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'empty-header'" },
  exportAs: 'hbEmptyHeader',
})
export class HbEmptyHeaderComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(emptyHeaderVariants(), this.class()));
}
