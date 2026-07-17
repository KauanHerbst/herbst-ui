import { computed, Directive, inject, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_TABLE } from './table.token';
import { tableCellClass } from './table.variants';

@Directive({
  selector: 'td[hb-table-cell], [hb-table-cell]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'table-cell'",
    '[attr.data-column]': 'hbColumn() || null',
    '[hidden]': 'isHidden()',
  },
})
export class HbTableCellDirective {
  private readonly table = inject(HB_TABLE, { optional: true });
  readonly hbColumn = input<string>('');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(tableCellClass, this.class()));
  protected readonly isHidden = computed(
    () => !!this.hbColumn() && !!this.table && !this.table.isColumnVisible(this.hbColumn()),
  );
}
