import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldTitleVariants } from './field.variants';

@Component({
  selector: 'hb-field-title, [hb-field-title]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-title'" },
  exportAs: 'hbFieldTitle',
})
export class HbFieldTitleComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldTitleVariants(), this.class()));
}
