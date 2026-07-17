import { InjectionToken } from '@angular/core';

import type { HbTableSelectionMode, HbTableSize, HbTableSortMode } from './table.variants';

export interface HbSortMeta {
  field: string;
  order: 1 | -1;
}

export interface HbTableRowRef {
  value: () => unknown;
  element: () => HTMLElement;
}

export interface HbTableContext {
  readonly size: () => HbTableSize;

  readonly selectionMode: () => HbTableSelectionMode;
  isSelected(row: unknown): boolean;
  toggleRow(row: unknown, event?: MouseEvent): void;
  setRowSelected(row: unknown, selected: boolean): void;
  allSelected(): boolean;
  someSelected(): boolean;
  toggleAll(): void;

  readonly sortMode: () => HbTableSortMode;
  readonly sortable: () => boolean;
  sortOrderOf(field: string): 0 | 1 | -1;
  sortBy(field: string): void;

  isExpanded(row: unknown): boolean;
  toggleExpanded(row: unknown): void;

  readonly keyboardNavigation: () => boolean;
  registerRow(row: HbTableRowRef): void;
  unregisterRow(row: HbTableRowRef): void;
  isActiveRow(row: HbTableRowRef): boolean;
  onRowFocus(row: HbTableRowRef): void;
  onRowKeydown(row: HbTableRowRef, event: KeyboardEvent): void;

  registerColumn(column: HbTableColumn): void;
  unregisterColumn(key: string): void;
  columns(): HbTableColumn[];
  isColumnVisible(key: string): boolean;
  toggleColumn(key: string): void;
}

export interface HbTableColumn {
  key: string;
  label: string;
}

export const HB_TABLE = new InjectionToken<HbTableContext>('HB_TABLE');

export interface HbTableRowContext {
  value: () => unknown;
  isSelected: () => boolean;
  toggle: () => void;
  isExpanded: () => boolean;
  toggleExpanded: () => void;
}

export const HB_TABLE_ROW = new InjectionToken<HbTableRowContext>('HB_TABLE_ROW');
