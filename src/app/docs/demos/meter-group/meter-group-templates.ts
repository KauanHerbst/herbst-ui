import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMeterGroupImports, type HbMeterItem } from '@herbst/ui';

@Component({
  selector: 'hb-demo-meter-group-templates',
  imports: [HbMeterGroupImports],
  template: `
    <hb-meter-group class="w-full max-w-md" [hbValue]="items" [hbMin]="0" [hbMax]="60">
      <ng-template hbMeterGroupMeter let-item let-size="size">
        <span
          class="h-full border-r-2 border-background last:border-r-0"
          [style.width.%]="size"
          [style.background]="item.color"
        ></span>
      </ng-template>

      <ng-template hbMeterGroupEnd let-items let-total="totalPercent">
        <p class="text-sm text-muted-foreground">
          {{ items.length }} categories · {{ round(total) }}% of quota used
        </p>
      </ng-template>
    </hb-meter-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMeterGroupTemplatesComponent {
  protected readonly items: HbMeterItem[] = [
    { label: 'Oak', value: 22, color: '#6B7A55' },
    { label: 'Beech', value: 16, color: '#A64B2A' },
    { label: 'Maple', value: 9, color: '#B98A3E' },
  ];

  protected round(value: number): number {
    return Math.round(value);
  }
}
