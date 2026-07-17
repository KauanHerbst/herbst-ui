import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbInputDirective, HbTableImports, type HbSortMeta } from '@herbst/ui';

@Component({
  selector: 'hb-demo-table-sortable',
  imports: [HbTableImports, HbInputDirective],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-2">
      <input hb-input hbFluid placeholder="Filter title or city…" #q (input)="query.set(q.value)" />

      <hb-table [(hbSort)]="sort" hbRemovableSort>
        <thead hb-table-header>
          <tr hb-table-row>
            <th hb-table-head hbSortField="species">Title</th>
            <th hb-table-head hbSortField="family">City</th>
            <th hb-table-head hbSortField="year">Year</th>
          </tr>
        </thead>
        <tbody hb-table-body>
          @for (
            r of rows | hbTableFilter: query() : ['species', 'family'] | hbTableSort: sort();
            track r.id
          ) {
            <tr hb-table-row>
              <td hb-table-cell>{{ r.species }}</td>
              <td hb-table-cell>{{ r.family }}</td>
              <td hb-table-cell>{{ r.year }}</td>
            </tr>
          }
        </tbody>
      </hb-table>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTableSortableComponent {
  protected readonly query = signal('');
  protected readonly sort = signal<HbSortMeta | HbSortMeta[] | null>({
    field: 'species',
    order: 1,
  });
  protected readonly rows = [
    { id: 1, species: 'Oak leaves', family: 'Freiburg', year: 2024 },
    { id: 2, species: 'Foggy morning', family: 'Munich', year: 2025 },
    { id: 3, species: 'Forest path', family: 'Berlin', year: 2023 },
    { id: 4, species: 'Chestnuts', family: 'Hamburg', year: 2026 },
  ];
}
