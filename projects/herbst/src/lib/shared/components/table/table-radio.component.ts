import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';

import { radioVariants, type HbRadioSize } from '../radio';
import { HB_TABLE, HB_TABLE_ROW } from './table.token';




let tableRadioUid = 0;
@Component({
  selector: 'hb-table-radio',
  template: `
    <label class="inline-flex cursor-pointer" (click)="$event.stopPropagation()">
      <input
        type="radio"
        class="peer sr-only"
        [name]="name"
        [checked]="row.isSelected()"
        (change)="onSelect()"
        [attr.aria-label]="'Select row'"
      />
      <span
        [class]="circleClasses()"
        [attr.data-state]="row.isSelected() ? 'checked' : 'unchecked'"
        aria-hidden="true"
      >
        @if (row.isSelected()) {
          <span data-slot="radio-dot"></span>
        }
      </span>
    </label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'inline-flex', '[attr.data-slot]': "'table-radio'" },
})
export class HbTableRadioComponent {
  protected readonly table = inject(HB_TABLE, { optional: true });
  protected readonly row = inject(HB_TABLE_ROW);
  protected readonly name = `hb-table-radio-${++tableRadioUid}`;

  protected readonly circleClasses = computed(() => {
    const size: HbRadioSize = this.table?.size() === 'xs' ? 'xs' : 'sm';
    return radioVariants({ size, status: 'default', focusable: true });
  });

  protected onSelect(): void {
    this.table?.setRowSelected(this.row.value(), true);
  }
}
