import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbPanelImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-panel-toggler',
  imports: [HbPanelImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-3">
      <hb-panel
        hbHeader="Click anywhere on the header"
        hbToggleable
        hbToggler="header"
        hbIconPos="start"
        [(hbCollapsed)]="collapsed"
        (hbToggle)="log.set('collapsed = ' + $event)"
      >
        <p class="text-sm text-muted-foreground">
          The whole header is the toggle, and the caret sits at the start.
        </p>
      </hb-panel>

      <p class="font-mono text-[12px] text-muted-foreground">{{ log() }}</p>

      <hb-panel hbHeader="Disabled — cannot toggle" hbToggleable hbDisabled>
        <p class="text-sm text-muted-foreground">This panel is locked open.</p>
      </hb-panel>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPanelTogglerComponent {
  protected readonly collapsed = signal(true);
  protected readonly log = signal('collapsed = true');
}
