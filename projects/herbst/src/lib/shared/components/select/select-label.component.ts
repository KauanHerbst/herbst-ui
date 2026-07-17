import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { selectLabelVariants } from './select.variants';

@Component({
  selector: 'hb-select-label, [hb-select-label]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'select-label'" },
  exportAs: 'hbSelectLabel',
})
export class HbSelectLabelComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(selectLabelVariants(), this.class()));
}
