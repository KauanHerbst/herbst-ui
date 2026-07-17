import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbNavigationMenuImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-navigation-menu-vertical',
  imports: [HbNavigationMenuImports],
  template: `
    <div class="flex min-h-64 w-full items-start pt-2">
      <hb-navigation-menu hbOrientation="vertical" [hbViewport]="false" hbSide="right">
        <hb-navigation-menu-list class="flex-col items-stretch">
          <hb-navigation-menu-item hbValue="specimens">
            <hb-navigation-menu-trigger>Photos</hb-navigation-menu-trigger>
            <hb-navigation-menu-content>
              <ul class="grid min-w-48 gap-1">
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">All photos</a>
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()"
                    >Recently added</a
                  >
                </li>
              </ul>
            </hb-navigation-menu-content>
          </hb-navigation-menu-item>

          <hb-navigation-menu-item hbValue="admin">
            <hb-navigation-menu-trigger>Admin</hb-navigation-menu-trigger>
            <hb-navigation-menu-content>
              <ul class="grid min-w-48 gap-1">
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Members</a>
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Settings</a>
                </li>
              </ul>
            </hb-navigation-menu-content>
          </hb-navigation-menu-item>

          <hb-navigation-menu-item>
            <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Help</a>
          </hb-navigation-menu-item>
        </hb-navigation-menu-list>
      </hb-navigation-menu>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoNavigationMenuVerticalComponent {}
