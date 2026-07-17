import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbSidebarImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-sidebar-submenus',
  imports: [HbSidebarImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag })],
  template: `
    <hb-sidebar-layout class="h-[28rem] w-full overflow-hidden rounded-md border border-border">
      <hb-sidebar hbId="docs-sub" hbCollapsible="icon">
        <hb-sidebar-content>
          <hb-sidebar-group>
            <hb-sidebar-group-label>Library</hb-sidebar-group-label>
            <hb-sidebar-group-content>
              <hb-sidebar-menu>
                <hb-sidebar-menu-item [hbCollapsible]="true" [hbDefaultOpen]="true">
                  <a hbSidebarMenuButton href="#" (click)="$event.preventDefault()">
                    <ng-icon name="phosphorLeaf" />
                    <span>Trees</span>
                  </a>
                  <hb-sidebar-menu-sub>
                    <hb-sidebar-menu-sub-item>
                      <a hbSidebarMenuSubButton href="#" (click)="$event.preventDefault()">Oak</a>
                    </hb-sidebar-menu-sub-item>
                    <hb-sidebar-menu-sub-item>
                      <a hbSidebarMenuSubButton href="#" (click)="$event.preventDefault()">
                        Beech
                      </a>
                    </hb-sidebar-menu-sub-item>
                  </hb-sidebar-menu-sub>
                </hb-sidebar-menu-item>

                <hb-sidebar-menu-item [hbCollapsible]="true">
                  <a hbSidebarMenuButton href="#" (click)="$event.preventDefault()">
                    <ng-icon name="phosphorTag" />
                    <span>Shrubs</span>
                  </a>
                  <hb-sidebar-menu-sub>
                    <hb-sidebar-menu-sub-item>
                      <a hbSidebarMenuSubButton href="#" (click)="$event.preventDefault()">Hazel</a>
                    </hb-sidebar-menu-sub-item>
                    <hb-sidebar-menu-sub-item>
                      <a hbSidebarMenuSubButton href="#" (click)="$event.preventDefault()">
                        Elder
                      </a>
                    </hb-sidebar-menu-sub-item>
                  </hb-sidebar-menu-sub>
                </hb-sidebar-menu-item>
              </hb-sidebar-menu>
            </hb-sidebar-group-content>
          </hb-sidebar-group>
        </hb-sidebar-content>
      </hb-sidebar>

      <hb-sidebar-main>
        <div class="border-b border-border p-3">
          <button hbSidebarTrigger target="docs-sub" hb-button hbType="outline" hbSize="sm">
            Toggle
          </button>
        </div>
        <div class="p-4 text-sm text-muted-foreground">
          Expand the parent items to reveal their sub-menus.
        </div>
      </hb-sidebar-main>
    </hb-sidebar-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSidebarSubmenusComponent {}
