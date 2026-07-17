import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbNavigationMenuImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-navigation-menu-controlled',
  imports: [HbNavigationMenuImports, HbButtonComponent],
  template: `
    <div class="flex min-h-72 w-full flex-col items-start gap-3 pt-2">
      <div class="flex items-center gap-2">
        <button hb-button hbType="outline" hbSize="sm" (click)="active.set('a')">Open A</button>
        <button hb-button hbType="outline" hbSize="sm" (click)="active.set('b')">Open B</button>
        <button hb-button hbType="ghost" hbSize="sm" (click)="active.set(null)">Close</button>
        <span class="font-mono text-[12px] text-muted-foreground"
          >active: {{ active() ?? '—' }}</span
        >
      </div>

      <hb-navigation-menu
        class="flex-none"
        [(hbValue)]="active"
        [hbDelayDuration]="80"
        [hbSkipDelayDuration]="200"
      >
        <hb-navigation-menu-list>
          <hb-navigation-menu-item hbValue="a">
            <hb-navigation-menu-trigger>Panel A</hb-navigation-menu-trigger>
            <hb-navigation-menu-content>
              <ul class="grid min-w-56 gap-1">
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Overview</a>
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Recent</a>
                </li>
              </ul>
            </hb-navigation-menu-content>
          </hb-navigation-menu-item>

          <hb-navigation-menu-item hbValue="b">
            <hb-navigation-menu-trigger>Panel B</hb-navigation-menu-trigger>
            <hb-navigation-menu-content>
              <ul class="grid min-w-56 gap-1">
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Settings</a>
                </li>
                <li>
                  <a hbNavigationMenuLink href="#" (click)="$event.preventDefault()">Members</a>
                </li>
              </ul>
            </hb-navigation-menu-content>
          </hb-navigation-menu-item>

          <hb-navigation-menu-indicator />
        </hb-navigation-menu-list>
      </hb-navigation-menu>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoNavigationMenuControlledComponent {
  protected readonly active = signal<string | null>(null);
}
