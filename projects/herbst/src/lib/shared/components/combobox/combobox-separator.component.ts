import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { selectSeparatorVariants } from '../select';

@Component({
  selector: 'hb-combobox-separator, [hb-combobox-separator]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'separator', '[attr.data-slot]': "'combobox-separator'" },
  exportAs: 'hbComboboxSeparator',
})
export class HbComboboxSeparatorComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(selectSeparatorVariants(), this.class()));
}
