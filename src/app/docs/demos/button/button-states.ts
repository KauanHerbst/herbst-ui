import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-states',
  imports: [HbButtonComponent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <button hb-button hbDisabled>Disabled</button>
        <button hb-button hbLoading>Loading</button>
        <button hb-button hbType="outline" hbLoading>Saving</button>
        <a hb-button hbType="link" href="#" (click)="$event.preventDefault()">Anchor button</a>
      </div>

      <button hb-button hbFull>Full width</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonStatesComponent {}
