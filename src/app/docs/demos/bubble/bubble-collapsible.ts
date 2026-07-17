import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBubbleImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-bubble-collapsible',
  imports: [HbBubbleImports],
  template: `
    <hb-bubble
      class="max-w-md"
      hbVariant="secondary"
      hbCollapsible
      [hbClampLines]="2"
      hbTooltip="Field note — Nov 3, 2026"
    >
      {{ note }}
    </hb-bubble>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBubbleCollapsibleComponent {
  protected readonly note =
    'Walked through the Black Forest as the oaks and beeches turned. ' +
    'Leaves drifting down in amber and rust, a cool wind off the hills, ' +
    'the smell of damp earth and woodsmoke from the village below. ' +
    'Stopped for tea and watched the mist settle over the valley.';
}
