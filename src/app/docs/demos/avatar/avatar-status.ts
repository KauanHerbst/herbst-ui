import { ChangeDetectionStrategy, Component } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';

import { HbAvatarImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-avatar-status',
  imports: [HbAvatarImports],
  providers: [provideIcons({ phosphorCheck })],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <hb-avatar hbFallback="ON" hbSize="lg" hbStatus="online" />
      <hb-avatar hbFallback="AW" hbSize="lg" hbStatus="away" />
      <hb-avatar hbFallback="BS" hbSize="lg" hbStatus="busy" hbBadgePosition="top-right" />
      <hb-avatar hbFallback="OF" hbSize="lg" hbStatus="offline" />
      <hb-avatar hbFallback="OK" hbSize="lg" hbBadgeIcon="phosphorCheck" />
      <hb-avatar hbFallback="99" hbSize="lg">
        <span
          hbAvatarBadge
          class="min-w-4 rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground"
        >
          9+
        </span>
      </hb-avatar>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAvatarStatusComponent {}
