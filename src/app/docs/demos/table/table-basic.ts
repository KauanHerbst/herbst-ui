import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbTableImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-table-basic',
  imports: [HbTableImports],
  template: `
    <hb-table hbStriped hbGridlines hbSize="sm" class="w-full max-w-lg">
      <caption hb-table-caption>
        Autumn photos
      </caption>
      <thead hb-table-header>
        <tr hb-table-row>
          <th hb-table-head>Index</th>
          <th hb-table-head>Title</th>
          <th hb-table-head>City</th>
          <th hb-table-head>Taken</th>
        </tr>
      </thead>
      <tbody hb-table-body>
        @for (r of rows; track r.id) {
          <tr hb-table-row>
            <td hb-table-cell>IMG·{{ r.id }}</td>
            <td hb-table-cell>{{ r.species }}</td>
            <td hb-table-cell>{{ r.family }}</td>
            <td hb-table-cell>{{ r.shelf }}</td>
          </tr>
        }
      </tbody>
    </hb-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTableBasicComponent {
  protected readonly rows = [
    { id: '019', species: 'Oak leaves', family: 'Freiburg', shelf: '2026·11·03' },
    { id: '020', species: 'Foggy morning', family: 'Munich', shelf: '2026·11·08' },
    { id: '021', species: 'Chestnuts', family: 'Berlin', shelf: '2026·11·15' },
  ];
}
