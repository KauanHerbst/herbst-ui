import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';

import { HbCheckboxComponent } from '../checkbox';
import { HB_TABLE } from './table.token';

@Component({
  selector: 'hb-table-select-all',
  imports: [HbCheckboxComponent],
  template: `
    <hb-checkbox
      [hbChecked]="table?.allSelected() ?? false"
      [hbIndeterminate]="table?.someSelected() ?? false"
      [hbSize]="table?.size() === 'xs' ? 'xs' : 'sm'"
      hbAriaLabel="Select all rows"
      (hbChange)="table?.toggleAll()"
      (click)="$event.stopPropagation()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'inline-flex', '[attr.data-slot]': "'table-select-all'" },
})
export class HbTableSelectAllComponent {
  protected readonly table = inject(HB_TABLE, { optional: true });
}
