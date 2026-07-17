import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldGroupVariants, type HbFieldColumns } from './field.variants';

@Component({
  selector: 'hb-field-group, [hb-field-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-group'" },
  exportAs: 'hbFieldGroup',
})
export class HbFieldGroupComponent {
  readonly hbColumns = input<HbFieldColumns>(1);
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(fieldGroupVariants({ columns: this.hbColumns() }), this.class()),
  );
}
