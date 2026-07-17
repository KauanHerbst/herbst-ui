import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbKbdComponent } from '../kbd';
import { HbSpinnerComponent } from '../spinner';
import {
  HB_TABLE,
  type HbSortMeta,
  type HbTableColumn,
  type HbTableContext,
  type HbTableRowRef,
} from './table.token';
import {
  tableSelectedRowClass,
  tableStickyHeaderClass,
  tableVariants,
  tableWrapperVariants,
  type HbTableSelectionMode,
  type HbTableSize,
  type HbTableSortMode,
} from './table.variants';

@Component({
  selector: 'hb-table',
  imports: [HbSpinnerComponent, HbKbdComponent],
  template: `
    <div [class]="wrapperClasses()" [style.maxHeight]="hbScrollable() ? hbScrollHeight() : null">
      <table [class]="tableClasses()">
        <ng-content />
      </table>
    </div>

    @if (hbKeyboardNavigation() && hbShowShortcuts()) {
      <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <span class="inline-flex items-center gap-1"><hb-kbd>↑</hb-kbd><hb-kbd>↓</hb-kbd> navigate</span>
        <span class="inline-flex items-center gap-1"><hb-kbd>Space</hb-kbd> select</span>
        <span class="inline-flex items-center gap-1"><hb-kbd>Enter</hb-kbd> open</span>
        <span class="inline-flex items-center gap-1"><hb-kbd>Home</hb-kbd><hb-kbd>End</hb-kbd> ends</span>
      </div>
    }

    @if (hbLoading()) {
      <div
        class="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-background/60"
        aria-live="polite"
        aria-busy="true"
      >
        <hb-spinner hbSize="lg" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'relative block w-full', '[attr.data-slot]': "'table'" },
  providers: [{ provide: HB_TABLE, useExisting: forwardRef(() => HbTableComponent) }],
  exportAs: 'hbTable',
})
export class HbTableComponent implements HbTableContext {
  readonly hbSize = input<HbTableSize>('md');
  readonly hbGridlines = input(false, { transform: booleanAttribute });
  readonly hbStriped = input(false, { transform: booleanAttribute });
  readonly hbHoverable = input(true, { transform: booleanAttribute });
  readonly hbBordered = input(true, { transform: booleanAttribute });
  readonly hbScrollable = input(false, { transform: booleanAttribute });
  readonly hbScrollHeight = input<string>('');
  readonly hbLoading = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  readonly hbTableClass = input<ClassValue>('');

  readonly hbSelectionMode = input<HbTableSelectionMode>('none');
  readonly hbSelection = model<unknown>(null);
  readonly hbDataKey = input<string>('');
  readonly hbCompareWith = input<(a: unknown, b: unknown) => boolean>();
  readonly hbMetaKeySelection = input(false, { transform: booleanAttribute });

  readonly hbSortMode = input<HbTableSortMode>('single');
  readonly hbSort = model<HbSortMeta | HbSortMeta[] | null>(null);
  readonly hbRemovableSort = input(false, { transform: booleanAttribute });
  readonly hbCustomSort = input(false, { transform: booleanAttribute });

  readonly hbKeyboardNavigation = input(false, { transform: booleanAttribute });
  readonly hbShowShortcuts = input(false, { transform: booleanAttribute });

  readonly hbHiddenColumns = model<string[]>([]);

  readonly hbRowActivate = output<unknown>();
  readonly hbExpandedChange = output<unknown[]>();

  readonly size = this.hbSize;
  readonly selectionMode = this.hbSelectionMode;
  readonly sortMode = this.hbSortMode;
  readonly keyboardNavigation = this.hbKeyboardNavigation;
  readonly sortable = computed(() => true);

  private readonly rows = signal<HbTableRowRef[]>([]);
  private readonly activeRow = signal<HbTableRowRef | null>(null);
  private readonly expandedKeys = signal<unknown[]>([]);
  private readonly columnList = signal<HbTableColumn[]>([]);

  protected readonly wrapperClasses = computed(() =>
    cn(
      tableWrapperVariants({ scrollable: this.hbScrollable(), bordered: this.hbBordered() }),
      this.class(),
    ),
  );
  protected readonly tableClasses = computed(() =>
    cn(
      tableVariants({
        size: this.hbSize(),
        gridlines: this.hbGridlines(),
        striped: this.hbStriped(),
        hoverable: this.hbHoverable(),
      }),
      tableSelectedRowClass,
      this.hbScrollable() && tableStickyHeaderClass,
      this.hbTableClass(),
    ),
  );

  private keyOf(row: unknown): unknown {
    const key = this.hbDataKey();
    return key && row && typeof row === 'object' ? (row as Record<string, unknown>)[key] : row;
  }
  private equals(a: unknown, b: unknown): boolean {
    const cmp = this.hbCompareWith();
    if (cmp) return cmp(a, b);
    if (this.hbDataKey()) return this.keyOf(a) === this.keyOf(b);
    return a === b;
  }
  private get selectionArray(): unknown[] {
    const v = this.hbSelection();
    return Array.isArray(v) ? v : [];
  }

  registerColumn(column: HbTableColumn): void {
    this.columnList.update((list) =>
      list.some((c) => c.key === column.key) ? list : [...list, column],
    );
  }
  unregisterColumn(key: string): void {
    this.columnList.update((list) => list.filter((c) => c.key !== key));
  }
  columns = (): HbTableColumn[] => this.columnList();
  isColumnVisible(key: string): boolean {
    return !this.hbHiddenColumns().includes(key);
  }
  toggleColumn(key: string): void {
    const hidden = this.hbHiddenColumns();
    this.hbHiddenColumns.set(
      hidden.includes(key) ? hidden.filter((k) => k !== key) : [...hidden, key],
    );
  }

  isSelected(row: unknown): boolean {
    if (this.hbSelectionMode() === 'single') return this.equals(this.hbSelection(), row);
    return this.selectionArray.some((v) => this.equals(v, row));
  }
  private commitSelection(value: unknown): void {
    this.hbSelection.set(value);
  }
  setRowSelected(row: unknown, selected: boolean): void {
    if (this.hbSelectionMode() === 'single') {
      this.commitSelection(selected ? row : null);
      return;
    }
    const current = this.selectionArray;
    const next = selected
      ? current.some((v) => this.equals(v, row))
        ? current
        : [...current, row]
      : current.filter((v) => !this.equals(v, row));
    this.commitSelection(next);
  }
  toggleRow(row: unknown, event?: MouseEvent): void {
    const mode = this.hbSelectionMode();
    if (mode === 'none') return;
    if (mode === 'single') {
      this.commitSelection(this.isSelected(row) ? null : row);
      return;
    }
    const additive = !this.hbMetaKeySelection() || !!(event && (event.ctrlKey || event.metaKey));
    if (additive) {
      this.setRowSelected(row, !this.isSelected(row));
    } else {
      this.commitSelection(this.isSelected(row) && this.selectionArray.length === 1 ? [] : [row]);
    }
  }
  allSelected(): boolean {
    const all = this.rows();
    return all.length > 0 && all.every((r) => this.isSelected(r.value()));
  }
  someSelected(): boolean {
    const all = this.rows();
    const anySel = all.some((r) => this.isSelected(r.value()));
    return anySel && !this.allSelected();
  }
  toggleAll(): void {
    if (this.hbSelectionMode() !== 'multiple') return;
    this.commitSelection(this.allSelected() ? [] : this.rows().map((r) => r.value()));
  }

  private get sortMetas(): HbSortMeta[] {
    const s = this.hbSort();
    return Array.isArray(s) ? s : s ? [s] : [];
  }
  sortOrderOf(field: string): 0 | 1 | -1 {
    return this.sortMetas.find((m) => m.field === field)?.order ?? 0;
  }
  private commitSort(metas: HbSortMeta[]): void {
    const value = this.hbSortMode() === 'multiple' ? metas : (metas[0] ?? null);
    this.hbSort.set(value);
  }
  sortBy(field: string): void {
    const metas = this.sortMetas.map((m) => ({ ...m }));
    if (this.hbSortMode() === 'single') {
      const current = metas[0];
      if (current?.field === field) {
        if (current.order === 1) this.commitSort([{ field, order: -1 }]);
        else this.commitSort(this.hbRemovableSort() ? [] : [{ field, order: 1 }]);
      } else {
        this.commitSort([{ field, order: 1 }]);
      }
      return;
    }
    const idx = metas.findIndex((m) => m.field === field);
    if (idx === -1) {
      metas.push({ field, order: 1 });
    } else if (metas[idx].order === 1) {
      metas[idx].order = -1;
    } else if (this.hbRemovableSort()) {
      metas.splice(idx, 1);
    } else {
      metas[idx].order = 1;
    }
    this.commitSort(metas);
  }

  isExpanded(row: unknown): boolean {
    const key = this.keyOf(row);
    return this.expandedKeys().some((k) => k === key);
  }
  toggleExpanded(row: unknown): void {
    const key = this.keyOf(row);
    const current = this.expandedKeys();
    const next = current.some((k) => k === key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    this.expandedKeys.set(next);
    this.hbExpandedChange.emit(next);
  }

  registerRow(row: HbTableRowRef): void {
    this.rows.update((list) => [...list, row]);
    if (!this.activeRow()) this.activeRow.set(row);
  }
  unregisterRow(row: HbTableRowRef): void {
    this.rows.update((list) => list.filter((r) => r !== row));
    if (this.activeRow() === row) this.activeRow.set(this.rows()[0] ?? null);
  }
  isActiveRow(row: HbTableRowRef): boolean {
    const active = this.activeRow();
    return active ? active === row : this.rows()[0] === row;
  }
  onRowFocus(row: HbTableRowRef): void {
    this.activeRow.set(row);
  }
  private ordered(): HbTableRowRef[] {
    return [...this.rows()].sort((a, b) =>
      a.element().compareDocumentPosition(b.element()) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
  }
  private focusRow(row: HbTableRowRef | undefined): void {
    if (!row) return;
    this.activeRow.set(row);
    row.element().focus();
  }
  onRowKeydown(row: HbTableRowRef, event: KeyboardEvent): void {
    const list = this.ordered();
    const i = list.indexOf(row);
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusRow(list[Math.min(i + 1, list.length - 1)]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusRow(list[Math.max(i - 1, 0)]);
        break;
      case 'Home':
        event.preventDefault();
        this.focusRow(list[0]);
        break;
      case 'End':
        event.preventDefault();
        this.focusRow(list[list.length - 1]);
        break;
      case ' ':
        event.preventDefault();
        this.toggleRow(row.value());
        break;
      case 'Enter':
        event.preventDefault();
        this.hbRowActivate.emit(row.value());
        break;
    }
  }
}
