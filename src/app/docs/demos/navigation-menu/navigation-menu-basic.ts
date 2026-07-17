import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbNavigationMenuImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-navigation-menu-basic',
  imports: [HbNavigationMenuImports],
  template: `
    <div class="flex min-h-72 w-full items-start justify-center pt-2">
      <hb-navigation-menu>
        <hb-navigation-menu-list>
          <hb-navigation-menu-item hbValue="collection">
            <hb-navigation-menu-trigger>Photos</hb-navigation-menu-trigger>
            <hb-navigation-menu-content>
              <ul class="grid min-w-56 gap-1">
                <li>
                  <a hbNavigationMenuLink hbActive href="#" (click)="$event.preventDefault()"
                    >All photos</a
                  >
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Forests</a>
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Cities</a>
                </li>
              </ul>
            </hb-navigation-menu-content>
          </hb-navigation-menu-item>

          <hb-navigation-menu-item hbValue="resources">
            <hb-navigation-menu-trigger>Resources</hb-navigation-menu-trigger>
            <hb-navigation-menu-content>
              <ul class="grid min-w-56 gap-1">
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()"
                    >Autumn guide</a
                  >
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Camera tips</a>
                </li>
              </ul>
            </hb-navigation-menu-content>
          </hb-navigation-menu-item>

          <hb-navigation-menu-item>
            <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">About</a>
          </hb-navigation-menu-item>

          <hb-navigation-menu-indicator />
        </hb-navigation-menu-list>
      </hb-navigation-menu>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoNavigationMenuBasicComponent {}
