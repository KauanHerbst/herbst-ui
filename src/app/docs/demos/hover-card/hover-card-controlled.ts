import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbHoverCardImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-hover-card-controlled',
  imports: [HbHoverCardImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <button hb-button hbType="secondary" (click)="open.set(!open())">
        {{ open() ? 'Close' : 'Open' }} card
      </button>

      <hb-hover-card
        [hbOpen]="open()"
        [hbOpenDelay]="150"
        [hbCloseDelay]="600"
        (hbOpenChange)="open.set($event)"
      >
        <button hbHoverCardTrigger hb-button hbType="outline">Hover or use the button</button>
        <hb-hover-card-content [hbWidth]="240">
          <p class="text-sm">
            Fast to open (150ms), slow to close (600ms), and driven by the external button through
            <code class="font-mono text-xs">hbOpen</code>.
          </p>
        </hb-hover-card-content>
      </hb-hover-card>

      <hb-hover-card hbDisabled>
        <button hbHoverCardTrigger hb-button hbType="ghost">Disabled</button>
        <hb-hover-card-content>
          <p class="text-sm">You will never see this.</p>
        </hb-hover-card-content>
      </hb-hover-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoHoverCardControlledComponent {
  protected readonly open = signal(false);
}
