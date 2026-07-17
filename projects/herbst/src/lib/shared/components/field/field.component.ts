import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldVariants, type HbFieldOrientation } from './field.variants';

@Component({
  selector: 'hb-field, [hb-field]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    role: 'group',
    '[attr.data-invalid]': "hbInvalid() ? 'true' : null",
    '[attr.data-slot]': "'field'",
  },
  exportAs: 'hbField',
})
export class HbFieldComponent {
  readonly hbOrientation = input<HbFieldOrientation>('vertical');
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(fieldVariants({ orientation: this.hbOrientation() }), this.class()),
  );
}
