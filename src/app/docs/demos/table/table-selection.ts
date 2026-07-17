import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbTableImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-table-selection',
  imports: [HbTableImports],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-2">
      <hb-table
        hbSelectionMode="multiple"
        [(hbSelection)]="selected"
        hbDataKey="id"
        hbGridlines
        hbHoverable
      >
        <thead hb-table-header>
          <tr hb-table-row>
            <th hb-table-head><hb-table-select-all /></th>
            <th hb-table-head>Title</th>
            <th hb-table-head>City</th>
          </tr>
        </thead>
        <tbody hb-table-body>
          @for (r of rows; track r.id) {
            <tr hb-table-row [hbRowValue]="r">
              <td hb-table-cell><hb-table-checkbox /></td>
              <td hb-table-cell>{{ r.species }}</td>
              <td hb-table-cell>{{ r.shelf }}</td>
            </tr>
          }
        </tbody>
      </hb-table>

      <p class="font-mono text-[12px] text-muted-foreground">
        {{ $any(selected()).length }} selected
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTableSelectionComponent {
  protected readonly selected = signal<unknown>([]);
  protected readonly rows = [
    { id: 1, species: 'Oak leaves', shelf: 'Freiburg' },
    { id: 2, species: 'Foggy morning', shelf: 'Munich' },
    { id: 3, species: 'Forest path', shelf: 'Berlin' },
    { id: 4, species: 'Chestnuts', shelf: 'Hamburg' },
  ];
}
