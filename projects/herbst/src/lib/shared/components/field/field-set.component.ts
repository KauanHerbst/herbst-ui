import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldSetVariants } from './field.variants';

@Component({
  selector: 'hb-field-set, fieldset[hb-field-set]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-set'" },
  exportAs: 'hbFieldSet',
})
export class HbFieldSetComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldSetVariants(), this.class()));
}
