import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbSidebarImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-sidebar-variants',
  imports: [HbSidebarImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag })],
  template: `
    <hb-sidebar-layout class="h-[28rem] w-full overflow-hidden rounded-md border border-border">
      <hb-sidebar-main>
        <div class="border-b border-border p-3">
          <button hbSidebarTrigger target="docs-var" hb-button hbType="outline" hbSize="sm">
            Toggle panel
          </button>
        </div>
        <div class="p-4 text-sm text-muted-foreground">
          A floating sidebar on the right that slides off-canvas when closed.
        </div>
      </hb-sidebar-main>

      <hb-sidebar
        hbId="docs-var"
        hbSide="right"
        hbVariant="floating"
        hbCollapsible="offcanvas"
        hbWidth="15rem"
      >
        <hb-sidebar-header>
          <span class="px-1 font-medium">Filters</span>
        </hb-sidebar-header>
        <hb-sidebar-content>
          <hb-sidebar-group>
            <hb-sidebar-group-content>
              <hb-sidebar-menu>
                <hb-sidebar-menu-item>
                  <a hbSidebarMenuButton href="#" (click)="$event.preventDefault()">
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
              </hb-sidebar-menu>
            </hb-sidebar-group-content>
          </hb-sidebar-group>
        </hb-sidebar-content>
      </hb-sidebar>
    </hb-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSidebarVariantsComponent {}
