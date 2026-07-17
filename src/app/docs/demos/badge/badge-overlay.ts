import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorEnvelope } from '@ng-icons/phosphor-icons/regular';

import { HbBadgeImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-badge-overlay',
  imports: [HbBadgeImports, NgIcon],
  providers: [provideIcons({ phosphorBell, phosphorEnvelope })],
  template: `
    <div class="flex flex-wrap items-center gap-8">
      <hb-overlay-badge [hbValue]="5">
        <ng-icon name="phosphorBell" class="text-muted-foreground [&>svg]:size-6" />
      </hb-overlay-badge>
      <hb-overlay-badge [hbValue]="99" hbType="warning" hbPosition="top-left">
        <ng-icon name="phosphorEnvelope" class="text-muted-foreground [&>svg]:size-6" />
      </hb-overlay-badge>
      <hb-overlay-badge hbDot hbType="success" hbPosition="bottom-right">
        <ng-icon name="phosphorBell" class="text-muted-foreground [&>svg]:size-6" />
      </hb-overlay-badge>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBadgeOverlayComponent {}
