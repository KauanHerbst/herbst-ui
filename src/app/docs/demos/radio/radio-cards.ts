import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbRadioImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-radio-cards',
  imports: [HbRadioImports],
  template: `
    <hb-radio-group [(hbValue)]="tier" hbName="tier" class="w-full max-w-md">
      <hb-radio-card [hbValue]="'curator'">
        <p class="font-medium">Curator</p>
        <p class="text-sm text-muted-foreground">Full catalogue access and editing rights.</p>
      </hb-radio-card>

      <hb-radio-card [hbValue]="'viewer'">
        <p class="font-medium">Viewer</p>
        <p class="text-sm text-muted-foreground">Read-only browsing of the collection.</p>
      </hb-radio-card>

      <hb-radio-card [hbValue]="'none'" [hbIndicator]="false" hbDisabled>
        <p class="font-medium">No access</p>
        <p class="text-sm text-muted-foreground">Disabled, and without the indicator.</p>
      </hb-radio-card>
    </hb-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoRadioCardsComponent {
  protected readonly tier = signal('curator');
}
