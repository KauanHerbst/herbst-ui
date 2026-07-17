import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldContentVariants } from './field.variants';

@Component({
  selector: 'hb-field-content, [hb-field-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-content'" },
  exportAs: 'hbFieldContent',
})
export class HbFieldContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldContentVariants(), this.class()));
}
