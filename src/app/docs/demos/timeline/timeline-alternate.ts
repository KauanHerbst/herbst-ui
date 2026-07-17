import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbTimelineImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-timeline-alternate',
  imports: [HbTimelineImports],
  template: `
    <hb-timeline class="w-full max-w-md" hbAlign="alternate">
      <hb-timeline-item>
        <hb-timeline-opposite>08:00</hb-timeline-opposite>
        <hb-timeline-marker hbColor="primary" hbVariant="solid" />
        <hb-timeline-content>Set out into the Black Forest.</hb-timeline-content>
      </hb-timeline-item>

      <hb-timeline-item>
        <hb-timeline-opposite>10:30</hb-timeline-opposite>
        <hb-timeline-marker hbColor="success" hbVariant="soft" />
        <hb-timeline-connector class="bg-success" />
        <hb-timeline-content>Photographed the first oak leaves.</hb-timeline-content>
      </hb-timeline-item>

      <hb-timeline-item>
        <hb-timeline-opposite>13:00</hb-timeline-opposite>
        <hb-timeline-marker hbColor="warning" hbVariant="outline" />
        <hb-timeline-content>Stopped for tea in the mist.</hb-timeline-content>
      </hb-timeline-item>

      <hb-timeline-item>
        <hb-timeline-opposite>16:00</hb-timeline-opposite>
        <hb-timeline-marker hbColor="destructive" hbVariant="solid" />
        <hb-timeline-content>Headed home as the light faded.</hb-timeline-content>
      </hb-timeline-item>
    </hb-timeline>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTimelineAlternateComponent {}
