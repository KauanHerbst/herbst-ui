import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbMenuImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-menu-selection',
  imports: [HbMenuImports, HbButtonComponent],
  template: `
    <div class="flex flex-col items-start gap-2">
      <button hb-button hbType="outline" [hbMenuTriggerFor]="menu">View options</button>
      <span class="font-mono text-[12px] text-muted-foreground">
        notes: {{ notes() }} · sort: {{ sort() }}
      </span>
    </div>

    <ng-template #menu>
      <hb-menu>
        <hb-menu-label hbInset>Columns</hb-menu-label>
        <hb-menu-checkbox-item [(hbChecked)]="notes">Caption</hb-menu-checkbox-item>
        <hb-menu-checkbox-item [hbChecked]="true">City</hb-menu-checkbox-item>
        <hb-menu-separator />

        <hb-menu-label hbInset>Sort by</hb-menu-label>
        <hb-menu-radio-group [(hbValue)]="sort">
          <hb-menu-radio-item [hbValue]="'name'">Title</hb-menu-radio-item>
          <hb-menu-radio-item [hbValue]="'date'">Date taken</hb-menu-radio-item>
          <hb-menu-radio-item [hbValue]="'city'">City</hb-menu-radio-item>
        </hb-menu-radio-group>
        <hb-menu-separator />

        <hb-menu-item [hbMenuTriggerFor]="more">More</hb-menu-item>
      </hb-menu>
    </ng-template>

    <ng-template #more>
      <hb-menu>
        <hb-menu-item>Export CSV</hb-menu-item>
        <hb-menu-item>Print</hb-menu-item>
      </hb-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMenuSelectionComponent {
  protected readonly notes = signal(true);
  protected readonly sort = signal<unknown>('name');
}
