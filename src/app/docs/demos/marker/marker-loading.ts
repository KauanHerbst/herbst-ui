import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMarkerImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-marker-loading',
  imports: [HbMarkerImports, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf })],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-marker hbLoading hbLoadingLabel="Uploading photos"> Uploading photos… </hb-marker>

      <hb-marker hbShimmer>
        <hb-marker-icon><ng-icon name="phosphorLeaf" /></hb-marker-icon>
        Syncing Herbst
      </hb-marker>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMarkerLoadingComponent {}
