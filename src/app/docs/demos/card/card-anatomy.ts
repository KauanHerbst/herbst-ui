import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent, HbCardImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-card-anatomy',
  imports: [HbCardImports, HbButtonComponent, NgIcon],
  providers: [provideIcons({ phosphorDotsThree })],
  template: `
    <div class="flex flex-col gap-2">
      <hb-card class="max-w-sm">
        <hb-card-header hbBorder>
          <hb-card-title>Black Forest</hb-card-title>
          <hb-card-description>Freiburg · Autumn 2026</hb-card-description>
          <button
            hb-button
            hbType="ghost"
            hbSize="icon"
            hb-card-action
            aria-label="Options"
            (hbActionClick)="opened.set(opened() + 1)"
          >
            <ng-icon name="phosphorDotsThree" />
          </button>
        </hb-card-header>

        <hb-card-content>
          Taken Nov 3, 2026. Oak and beech leaves turning amber along the trail.
        </hb-card-content>

        <hb-card-footer hbBorder class="justify-end gap-2">
          <button hb-button hbType="ghost" hbSize="sm">Discard</button>
          <button hb-button hbSize="sm">Save</button>
        </hb-card-footer>
      </hb-card>

      <p class="font-mono text-[12px] text-muted-foreground">Options opened {{ opened() }}×</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCardAnatomyComponent {
  protected readonly opened = signal(0);
}
