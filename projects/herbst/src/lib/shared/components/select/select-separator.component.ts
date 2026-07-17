import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { selectSeparatorVariants } from './select.variants';

@Component({
  selector: 'hb-select-separator, [hb-select-separator]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'separator', '[attr.data-slot]': "'select-separator'" },
  exportAs: 'hbSelectSeparator',
})
export class HbSelectSeparatorComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(selectSeparatorVariants(), this.class()));
}
