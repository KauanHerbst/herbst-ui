import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { selectLabelVariants } from '../select';

@Component({
  selector: 'hb-combobox-label, [hb-combobox-label]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'combobox-label'" },
  exportAs: 'hbComboboxLabel',
})
export class HbComboboxLabelComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(selectLabelVariants(), this.class()));
}
