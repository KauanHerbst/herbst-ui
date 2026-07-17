import { Pipe, type PipeTransform } from '@angular/core';

import type { HbSortMeta } from './table.token';

type Row = Record<string, unknown>;

const compareValues = (a: unknown, b: unknown): number => {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
};

@Pipe({ name: 'hbTableSort', pure: true })
export class HbTableSortPipe implements PipeTransform {
  transform<T extends Row>(
    rows: T[] | null | undefined,
    sort: HbSortMeta | HbSortMeta[] | null,
  ): T[] {
    if (!rows) return [];
    const metas = Array.isArray(sort) ? sort : sort ? [sort] : [];
    if (!metas.length) return rows;
    return [...rows].sort((a, b) => {
      for (const { field, order } of metas) {
        const diff = compareValues(a[field], b[field]);
        if (diff !== 0) return diff * order;
      }
      return 0;
    });
  }
}

@Pipe({ name: 'hbTableFilter', pure: true })
export class HbTableFilterPipe implements PipeTransform {
  transform<T extends Row>(
    rows: T[] | null | undefined,
    query: string | null | undefined,
    fields?: string[],
  ): T[] {
    if (!rows) return [];
    const q = (query ?? '').trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const keys = fields?.length ? fields : Object.keys(row);
      return keys.some((key) => {
        const value = row[key];
        return value != null && String(value).toLowerCase().includes(q);
      });
    });
  }
}
