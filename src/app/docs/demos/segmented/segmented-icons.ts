import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSegmentedImports } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-segmented-icons',
  imports: [HbSegmentedImports],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag, phosphorBell })],
  template: `
    <hb-segmented [(hbValue)]="section" hbAriaLabel="Section">
      <hb-segmented-item value="specimens" label="Photos" hbIcon="phosphorLeaf" />
      <hb-segmented-item value="families" label="Forests" hbIcon="phosphorTag" />
      <hb-segmented-item value="alerts" label="Alerts" hbIcon="phosphorBell" hbDisabled />
    </hb-segmented>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSegmentedIconsComponent {
  protected readonly section = signal('specimens');
}
