import { HbTableBodyDirective } from './table-body.directive';
import { HbTableCaptionDirective } from './table-caption.directive';
import { HbTableCellDirective } from './table-cell.directive';
import { HbTableCheckboxComponent } from './table-checkbox.component';
import { HbTableColumnToggleComponent } from './table-column-toggle.component';
import { HbTableExpandToggleComponent } from './table-expand-toggle.component';
import { HbTableFooterDirective } from './table-footer.directive';
import { HbTableHeadComponent } from './table-head.component';
import { HbTableHeaderDirective } from './table-header.directive';
import { HbTableRadioComponent } from './table-radio.component';
import { HbTableRowDirective } from './table-row.directive';
import { HbTableSelectAllComponent } from './table-select-all.component';
import { HbTableComponent } from './table.component';
import { HbTableFilterPipe, HbTableSortPipe } from './table.pipes';

export const HbTableImports = [
  HbTableComponent,
  HbTableCaptionDirective,
  HbTableHeaderDirective,
  HbTableBodyDirective,
  HbTableFooterDirective,
  HbTableRowDirective,
  HbTableHeadComponent,
  HbTableCellDirective,
  HbTableCheckboxComponent,
  HbTableSelectAllComponent,
  HbTableRadioComponent,
  HbTableExpandToggleComponent,
  HbTableColumnToggleComponent,
  HbTableSortPipe,
  HbTableFilterPipe,
] as const;
