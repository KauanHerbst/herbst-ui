import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorCheck,
  phosphorLeaf,
  phosphorTag,
  phosphorWarning,
} from '@ng-icons/phosphor-icons/regular';

import { HbTimelineImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-timeline-basic',
  imports: [HbTimelineImports],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag, phosphorCheck, phosphorWarning })],
  template: `
    <hb-timeline class="w-full max-w-sm">
      <hb-timeline-item>
        <hb-timeline-marker hbColor="success" hbIcon="phosphorCheck" />
        <hb-timeline-content>
          <p class="font-medium">Taken</p>
          <p class="text-muted-foreground">Oak leaves photographed in Freiburg.</p>
        </hb-timeline-content>
      </hb-timeline-item>

      <hb-timeline-item>
        <hb-timeline-marker hbColor="primary" hbIcon="phosphorLeaf" />
        <hb-timeline-content>
          <p class="font-medium">Edited</p>
          <p class="text-muted-foreground">Cropped and colour-corrected.</p>
        </hb-timeline-content>
      </hb-timeline-item>

      <hb-timeline-item>
        <hb-timeline-marker hbColor="warning" hbVariant="soft" hbIcon="phosphorWarning" />
        <hb-timeline-content>
          <p class="font-medium">Needs caption</p>
          <p class="text-muted-foreground">Still waiting for a title.</p>
        </hb-timeline-content>
      </hb-timeline-item>

      <hb-timeline-item>
        <hb-timeline-marker hbColor="muted" hbVariant="outline" hbIcon="phosphorTag" />
        <hb-timeline-content>
          <p class="font-medium">Archived</p>
          <p class="text-muted-foreground">Saved to the Herbst album.</p>
        </hb-timeline-content>
      </hb-timeline-item>
    </hb-timeline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTimelineBasicComponent {}
