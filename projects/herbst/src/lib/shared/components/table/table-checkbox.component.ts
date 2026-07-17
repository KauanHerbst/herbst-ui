import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';

import { HbCheckboxComponent } from '../checkbox';
import { HB_TABLE, HB_TABLE_ROW } from './table.token';

@Component({
  selector: 'hb-table-checkbox',
  imports: [HbCheckboxComponent],
  template: `
    <hb-checkbox
      [hbChecked]="row.isSelected()"
      [hbSize]="table?.size() === 'xs' ? 'xs' : 'sm'"
      hbAriaLabel="Select row"
      (hbChange)="onToggle($event)"
      (click)="$event.stopPropagation()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'inline-flex', '[attr.data-slot]': "'table-checkbox'" },
})
export class HbTableCheckboxComponent {
  protected readonly table = inject(HB_TABLE, { optional: true });
  protected readonly row = inject(HB_TABLE_ROW);

  protected onToggle(checked: boolean): void {
    this.table?.setRowSelected(this.row.value(), checked);
  }
}
