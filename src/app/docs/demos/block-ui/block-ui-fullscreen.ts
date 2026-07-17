import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbBlockUiComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-block-ui-fullscreen',
  imports: [HbBlockUiComponent, HbButtonComponent],
  template: `
    <button hb-button (click)="block()" [hbDisabled]="busy()">Block screen (1.5s)</button>

    <hb-block-ui [hbBlocked]="busy()" hbFullScreen hbSpinner>
      <span hbBlockUiContent class="text-sm font-medium text-foreground">Cataloguing…</span>
    </hb-block-ui>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBlockUiFullscreenComponent {
  protected readonly busy = signal(false);

  protected block(): void {
    this.busy.set(true);
    setTimeout(() => this.busy.set(false), 1500);
  }
}
