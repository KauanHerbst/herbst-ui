import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldDescriptionVariants } from './field.variants';

@Component({
  selector: 'hb-field-description, [hb-field-description]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-description'" },
  exportAs: 'hbFieldDescription',
})
export class HbFieldDescriptionComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldDescriptionVariants(), this.class()));
}
