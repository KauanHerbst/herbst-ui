import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbLayoutImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-layout-collapsible',
  imports: [HbLayoutImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorBell, phosphorTag })],
  template: `
    <div class="flex w-full max-w-2xl flex-col gap-2">
      <div class="flex items-center gap-2">
        <button hb-button hbType="secondary" hbSize="sm" (click)="collapsed.set(!collapsed())">
          {{ collapsed() ? 'Expand' : 'Collapse' }}
        </button>
        <span class="font-mono text-[12px] text-muted-foreground">{{ log() }}</span>
      </div>

      <hb-layout class="h-72 overflow-hidden rounded-md border border-border">
        <hb-layout-sidebar
          hbCollapsible
          hbReverseArrow
          [(hbCollapsed)]="collapsed"
          [hbWidth]="200"
          [hbCollapsedWidth]="56"
          (hbOnCollapsedChange)="log.set('collapsed = ' + $event)"
        >
          <hb-layout-sidebar-group>
            <a
              href="#"
              class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              (click)="$event.preventDefault()"
            >
              <ng-icon name="phosphorLeaf" />
              <span>Photos</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              (click)="$event.preventDefault()"
            >
              <ng-icon name="phosphorTag" />
              <span>Forests</span>
            </a>
            <a
              href="#"
              class="flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
              (click)="$event.preventDefault()"
            >
              <ng-icon name="phosphorBell" />
              <span>Alerts</span>
            </a>
          </hb-layout-sidebar-group>
        </hb-layout-sidebar>

        <hb-layout hbDirection="vertical">
          <hb-header [hbHeight]="52"><span class="font-medium">Dashboard</span></hb-header>
          <hb-content>
            <p class="text-sm text-muted-foreground">
              The sidebar collapses to {{ collapsed() ? '56px' : '200px' }}. The trigger arrow is
              reversed, and the collapsed state is two-way bound.
            </p>
          </hb-content>
        </hb-layout>
      </hb-layout>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoLayoutCollapsibleComponent {
  protected readonly collapsed = signal(false);
  protected readonly log = signal('expanded');
}
