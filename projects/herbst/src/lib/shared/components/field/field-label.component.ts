import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldLabelVariants } from './field.variants';

@Component({
  selector: 'hb-field-label, label[hb-field-label]',
  template: `
    <ng-content />
    @if (hbRequired()) {
      <span class="text-destructive" aria-hidden="true">*</span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-label'" },
  exportAs: 'hbFieldLabel',
})
export class HbFieldLabelComponent {
  readonly hbRequired = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldLabelVariants(), this.class()));
}
