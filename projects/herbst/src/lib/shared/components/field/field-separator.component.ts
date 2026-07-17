import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldSeparatorVariants } from './field.variants';

@Component({
  selector: 'hb-field-separator, [hb-field-separator]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'separator', '[attr.data-slot]': "'field-separator'" },
  exportAs: 'hbFieldSeparator',
})
export class HbFieldSeparatorComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldSeparatorVariants(), this.class()));
}
