import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbRadioImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-radio-basic',
  imports: [HbRadioImports],
  template: `
    <div class="flex flex-col gap-3">
      <hb-radio-group [(hbValue)]="plan" hbName="plan" (hbChange)="last.set($any($event))">
        <hb-radio [hbValue]="'press'">Press &amp; mount</hb-radio>
        <hb-radio [hbValue]="'scan'">Digitise only</hb-radio>
        <hb-radio [hbValue]="'both'">Press &amp; digitise</hb-radio>
      </hb-radio-group>

      <p class="font-mono text-[12px] text-muted-foreground">
        Selected: {{ plan() }} · last change: {{ last() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoRadioBasicComponent {
  protected readonly plan = signal('scan');
  protected readonly last = signal('—');
}
