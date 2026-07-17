import {
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  HB_TABLE,
  HB_TABLE_ROW,
  type HbTableRowContext,
  type HbTableRowRef,
} from './table.token';
import { tableRowClass, tableRowInteractiveClass } from './table.variants';

@Directive({
  selector: 'tr[hb-table-row], [hb-table-row]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'table-row'",
    '[attr.data-selected]': 'isDataRow() && table?.isSelected(hbRowValue()) ? true : null',
    '[attr.aria-selected]': 'selectable() ? table!.isSelected(hbRowValue()) : null',
    '[attr.data-expanded]': 'isDataRow() && table?.isExpanded(hbRowValue()) ? true : null',
    '[attr.tabindex]': 'tabindex()',
    '(click)': 'onClick($event)',
    '(keydown)': 'onKeydown($event)',
    '(focus)': 'onFocus()',
  },
  providers: [{ provide: HB_TABLE_ROW, useExisting: forwardRef(() => HbTableRowDirective) }],
  exportAs: 'hbTableRow',
})
export class HbTableRowDirective implements HbTableRowContext {
  protected readonly table = inject(HB_TABLE, { optional: true });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly hbRowValue = input<unknown>(null);
  readonly class = input<ClassValue>('');

  private readonly ref: HbTableRowRef = {
    value: () => this.hbRowValue(),
    element: () => this.el.nativeElement,
  };

  protected readonly isDataRow = computed(
    () => this.hbRowValue() !== null && this.hbRowValue() !== undefined,
  );
  protected readonly selectable = computed(
    () => this.isDataRow() && !!this.table && this.table.selectionMode() !== 'none',
  );
  protected readonly tabindex = computed(() => {
    if (!this.table?.keyboardNavigation() || !this.isDataRow()) return null;
    return this.table.isActiveRow(this.ref) ? 0 : -1;
  });
  protected readonly classes = computed(() =>
    cn(
      tableRowClass,
      (this.selectable() || (this.table?.keyboardNavigation() && this.isDataRow())) &&
        tableRowInteractiveClass,
      this.class(),
    ),
  );

  constructor() {
    let registered = false;
    effect(() => {
      if (this.isDataRow() && !registered && this.table) {
        registered = true;
        this.table.registerRow(this.ref);
      }
    });
    this.destroyRef.onDestroy(() => {
      if (registered) this.table?.unregisterRow(this.ref);
    });
  }

  value = (): unknown => this.hbRowValue();
  isSelected = (): boolean => (this.table ? this.table.isSelected(this.hbRowValue()) : false);
  toggle = (): void => this.table?.toggleRow(this.hbRowValue());
  isExpanded = (): boolean => (this.table ? this.table.isExpanded(this.hbRowValue()) : false);
  toggleExpanded = (): void => this.table?.toggleExpanded(this.hbRowValue());

  protected onClick(event: MouseEvent): void {
    if (this.selectable()) this.table!.toggleRow(this.hbRowValue(), event);
  }
  protected onKeydown(event: KeyboardEvent): void {
    if (this.table?.keyboardNavigation() && this.isDataRow()) {
      this.table.onRowKeydown(this.ref, event);
    }
  }
  protected onFocus(): void {
    if (this.isDataRow()) this.table?.onRowFocus(this.ref);
  }
}
