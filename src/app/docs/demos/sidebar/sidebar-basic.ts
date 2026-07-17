import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbSidebarImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-sidebar-basic',
  imports: [HbSidebarImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag, phosphorBell })],
  template: `
    <hb-sidebar-layout class="h-[28rem] w-full overflow-hidden rounded-md border border-border">
      <hb-sidebar hbId="docs-basic" hbCollapsible="icon">
        <hb-sidebar-header>
          <div class="flex items-center gap-2 px-1 py-1.5">
            <ng-icon name="phosphorLeaf" class="text-primary [&>svg]:size-5" />
            <span class="font-medium group-data-[collapsed]/sb:hidden">Herbst</span>
          </div>
        </hb-sidebar-header>

        <hb-sidebar-content>
          <hb-sidebar-group>
            <hb-sidebar-group-label>Photos</hb-sidebar-group-label>
            <hb-sidebar-group-content>
              <hb-sidebar-menu>
                <hb-sidebar-menu-item>
                  <a
                    hbSidebarMenuButton
                    href="#"
                    [hbActive]="true"
                    (click)="$event.preventDefault()"
                  >
                    <ng-icon name="phosphorLeaf" />
                    <span>Photos</span>
                  </a>
                </hb-sidebar-menu-item>
                <hb-sidebar-menu-item>
                  <a hbSidebarMenuButton href="#" (click)="$event.preventDefault()">
                    <ng-icon name="phosphorTag" />
                    <span>Forests</span>
                  </a>
                </hb-sidebar-menu-item>
                <hb-sidebar-menu-item>
                  <a hbSidebarMenuButton href="#" (click)="$event.preventDefault()">
                    <ng-icon name="phosphorBell" />
                    <span>Alerts</span>
                  </a>
                </hb-sidebar-menu-item>
              </hb-sidebar-menu>
            </hb-sidebar-group-content>
          </hb-sidebar-group>
        </hb-sidebar-content>

        <hb-sidebar-footer>
          <div class="px-1 text-xs text-muted-foreground group-data-[collapsed]/sb:hidden">
            Signed in as A. Herbst
          </div>
        </hb-sidebar-footer>
      </hb-sidebar>

      <hb-sidebar-main>
        <div class="flex items-center gap-2 border-b border-border p-3">
          <button hbSidebarTrigger target="docs-basic" hb-button hbType="outline" hbSize="sm">
            Toggle
          </button>
          <span class="text-sm font-medium">Photos</span>
        </div>
        <div class="p-4 text-sm text-muted-foreground">
          Toggle collapses the sidebar to an icon rail.
        </div>
      </hb-sidebar-main>
    </hb-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSidebarBasicComponent {}
