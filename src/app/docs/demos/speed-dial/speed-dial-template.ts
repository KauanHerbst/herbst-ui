import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSpeedDialImports, type HbSpeedDialItem } from '@herbst/ui';

@Component({
  selector: 'hb-demo-speed-dial-template',
  imports: [HbSpeedDialImports],
  template: `
    <div class="flex h-64 w-full items-end justify-end pr-2 pb-2">
      <hb-speed-dial
        [hbModel]="items"
        hbType="quarter-circle"
        hbDirection="up-left"
        [hbRadius]="110"
        hbButtonType="outline"
      >
        <ng-template hbSpeedDialItem let-item let-i="index">
          <span class="text-xs font-semibold">{{ i + 1 }}</span>
        </ng-template>
      </hb-speed-dial>
    </div>
  `,
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSpeedDialTemplateComponent {
  protected readonly items: HbSpeedDialItem[] = [
    { label: 'First' },
    { label: 'Second' },
    { label: 'Third' },
  ];
}
