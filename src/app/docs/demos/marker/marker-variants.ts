import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMarkerImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-marker-variants',
  imports: [HbMarkerImports, NgIcon],
  viewProviders: [provideIcons({ phosphorTag })],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-5">
      <hb-marker hbVariant="border">
        <hb-marker-icon><ng-icon name="phosphorTag" /></hb-marker-icon>
        <hb-marker-content class="font-medium text-foreground">Black Forest</hb-marker-content>
      </hb-marker>

      <hb-marker hbVariant="separator">Chapter II</hb-marker>

      <hb-marker hbVariant="separator" hbRole="separator">
        <hb-marker-icon><ng-icon name="phosphorTag" /></hb-marker-icon>
        Field notes
      </hb-marker>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMarkerVariantsComponent {}
