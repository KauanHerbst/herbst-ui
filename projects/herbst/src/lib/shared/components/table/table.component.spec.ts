import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { HbTableImports } from './table.imports';
import { HbTableFilterPipe, HbTableSortPipe } from './table.pipes';
import type { HbSortMeta } from './table.token';
import type { HbTableSelectionMode } from './table.variants';

interface Person {
  id: number;
  name: string;
  age: number;
}

@Component({
  imports: [HbTableImports],
  template: `
    <hb-table
      [hbGridlines]="gridlines()"
      [hbStriped]="striped()"
      [hbSelectionMode]="selectionMode()"
      [(hbSelection)]="selection"
      [(hbSort)]="sort"
      [hbRemovableSort]="removable()"
      hbDataKey="id"
      hbKeyboardNavigation
      (hbRowActivate)="activated.set($event)"
    >
      <thead hb-table-header>
        <tr hb-table-row>
          <th hb-table-head><hb-table-select-all /></th>
          <th hb-table-head hbSortField="name">Name</th>
          <th hb-table-head hbSortField="age">Age</th>
        </tr>
      </thead>
      <tbody hb-table-body>
        @for (p of people; track p.id) {
          <tr hb-table-row [hbRowValue]="p">
            <td hb-table-cell><hb-table-checkbox /></td>
            <td hb-table-cell>{{ p.name }}</td>
            <td hb-table-cell>{{ p.age }}</td>
          </tr>
        }
      </tbody>
    </hb-table>
  `,
})
class Host {
  readonly people: Person[] = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Carol', age: 35 },
  ];
  readonly gridlines = signal(false);
  readonly striped = signal(false);
  readonly selectionMode = signal<HbTableSelectionMode>('multiple');
  readonly selection = signal<unknown>([]);
  readonly sort = signal<HbSortMeta | HbSortMeta[] | null>(null);
  readonly removable = signal(false);
  readonly activated = signal<unknown>(null);
}

describe('HbTableComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const table = fixture.nativeElement.querySelector('table') as HTMLElement;
    const bodyRows = () => Array.from(table.querySelectorAll('tbody tr')) as HTMLTableRowElement[];
    return { fixture, host: fixture.componentInstance, table, bodyRows };
  }

  it('renders a real <table> with the compound structure', () => {
    const { table } = render();
    expect(table.tagName).toBe('TABLE');
    expect(table.querySelector('thead')).toBeTruthy();
    expect(table.querySelectorAll('tbody tr').length).toBe(3);
    expect(table.querySelectorAll('thead th').length).toBe(3);
  });

  it('applies gridlines/striped classes on the table element', () => {
    const { fixture, host, table } = render();
    host.gridlines.set(true);
    host.striped.set(true);
    fixture.detectChanges();
    expect(table.className).toContain('[&_th]:h-10');
    expect(table.className).toContain('[&_th]:border');
    expect(table.className).toContain('[&_tbody_tr:nth-child(even)]:bg-muted/40');
  });

  it('toggles sort asc → desc on repeated header clicks', () => {
    const { fixture, host, table } = render();
    const nameHead = table.querySelectorAll('thead th')[1] as HTMLElement;
    nameHead.click();
    fixture.detectChanges();
    expect(host.sort()).toEqual({ field: 'name', order: 1 });
    nameHead.click();
    fixture.detectChanges();
    expect(host.sort()).toEqual({ field: 'name', order: -1 });
    expect(nameHead.getAttribute('aria-sort')).toBe('descending');
  });

  it('clears sort on the third click when removable', () => {
    const { fixture, host, table } = render();
    host.removable.set(true);
    fixture.detectChanges();
    const ageHead = table.querySelectorAll('thead th')[2] as HTMLElement;
    ageHead.click();
    ageHead.click();
    ageHead.click();
    fixture.detectChanges();
    expect(host.sort()).toBeNull();
  });

  it('selects a row on click and reflects data-selected', () => {
    const { fixture, host, bodyRows } = render();
    bodyRows()[0].click();
    fixture.detectChanges();
    expect((host.selection() as Person[]).map((p) => p.id)).toEqual([1]);
    expect(bodyRows()[0].getAttribute('data-selected')).toBe('true');
  });

  it('select-all checkbox is indeterminate for a partial selection then selects all', () => {
    const { fixture, host, table, bodyRows } = render();
    bodyRows()[0].click();
    fixture.detectChanges();
    const selectAllInput = table.querySelector('thead input[type="checkbox"]') as HTMLInputElement;
    expect(selectAllInput.indeterminate).toBe(true);
    selectAllInput.click();
    fixture.detectChanges();
    expect((host.selection() as Person[]).length).toBe(3);
  });

  it('checkbox click selects only its row and stops the row toggle', () => {
    const { fixture, host, bodyRows } = render();
    const cbInput = bodyRows()[1].querySelector('input[type="checkbox"]') as HTMLInputElement;
    cbInput.click();
    fixture.detectChanges();
    expect((host.selection() as Person[]).map((p) => p.id)).toEqual([2]);
  });

  it('moves focus with ArrowDown and activates a row with Enter', () => {
    const { fixture, host, bodyRows } = render();
    const rows = bodyRows();
    rows[0].focus();
    rows[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(rows[1]);
    rows[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect((host.activated() as Person).id).toBe(2);
  });

  it('selects the focused row with Space', () => {
    const { fixture, host, bodyRows } = render();
    const rows = bodyRows();
    rows[2].focus();
    rows[2].dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect((host.selection() as Person[]).map((p) => p.id)).toEqual([3]);
  });
});

describe('table pipes', () => {
  const rows = [
    { id: 1, name: 'Bob', age: 25 },
    { id: 2, name: 'Alice', age: 35 },
    { id: 3, name: 'Carol', age: 30 },
  ];

  it('hbTableSort sorts ascending/descending by field', () => {
    const pipe = new HbTableSortPipe();
    expect(pipe.transform(rows, { field: 'name', order: 1 }).map((r) => r.name)).toEqual([
      'Alice',
      'Bob',
      'Carol',
    ]);
    expect(pipe.transform(rows, { field: 'age', order: -1 }).map((r) => r.age)).toEqual([
      35, 30, 25,
    ]);
  });

  it('hbTableSort returns the original array when there is no sort', () => {
    const pipe = new HbTableSortPipe();
    expect(pipe.transform(rows, null)).toBe(rows);
  });

  it('hbTableFilter keeps rows matching the query (case-insensitive)', () => {
    const pipe = new HbTableFilterPipe();
    expect(pipe.transform(rows, 'car').map((r) => r.name)).toEqual(['Carol']);
    expect(pipe.transform(rows, '').length).toBe(3);
    expect(pipe.transform(rows, 'bob', ['name']).length).toBe(1);
  });
});

@Component({
  imports: [HbTableImports],
  template: `
    <hb-table [(hbHiddenColumns)]="hidden">
      <hb-table-column-toggle />
      <thead hb-table-header>
        <tr hb-table-row>
          <th hb-table-head hbColumn="name" hbColumnLabel="Name">Name</th>
          <th hb-table-head hbColumn="age" hbColumnLabel="Age">Age</th>
        </tr>
      </thead>
      <tbody hb-table-body>
        <tr hb-table-row>
          <td hb-table-cell hbColumn="name">Alice</td>
          <td hb-table-cell hbColumn="age">30</td>
        </tr>
      </tbody>
    </hb-table>
  `,
})
class ColumnHost {
  readonly hidden = signal<string[]>([]);
}

describe('HbTableComponent column visibility', () => {
  function render() {
    const fixture = TestBed.createComponent(ColumnHost);
    fixture.detectChanges();
    const cellsFor = (col: string) =>
      Array.from(
        fixture.nativeElement.querySelectorAll(`[data-column="${col}"]`),
      ) as HTMLElement[];
    return { fixture, host: fixture.componentInstance, cellsFor };
  }

  it('registers columns and marks head + cells with data-column', () => {
    const { fixture } = render();
    expect(fixture.nativeElement.querySelectorAll('[data-slot="table-column-toggle"]').length).toBe(
      1,
    );
    expect(fixture.nativeElement.querySelectorAll('[data-column="name"]').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('[data-column="age"]').length).toBe(2);
  });

  it('hides a column (head + cells) when its key is in hbHiddenColumns', () => {
    const { fixture, host, cellsFor } = render();
    expect(cellsFor('age').every((el) => !el.hasAttribute('hidden'))).toBe(true);
    host.hidden.set(['age']);
    fixture.detectChanges();
    expect(cellsFor('age').every((el) => el.hasAttribute('hidden'))).toBe(true);
    expect(cellsFor('name').every((el) => !el.hasAttribute('hidden'))).toBe(true);
  });
});
