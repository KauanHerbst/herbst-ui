import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbLayoutImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-layout-sidebar',
  imports: [HbLayoutImports],
  template: `
    <hb-layout class="h-80 w-full max-w-2xl overflow-hidden rounded-md border border-border">
      <hb-layout-sidebar [hbWidth]="180">
        <hb-layout-sidebar-group>
          <hb-layout-sidebar-group-label>Photos</hb-layout-sidebar-group-label>
          <a
            href="#"
            class="rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            (click)="$event.preventDefault()"
            >All photos</a
          >
          <a
            href="#"
            class="rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            (click)="$event.preventDefault()"
            >Forests</a
          >
          <a
            href="#"
            class="rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            (click)="$event.preventDefault()"
            >Cities</a
          >
        </hb-layout-sidebar-group>

        <hb-layout-sidebar-group>
          <hb-layout-sidebar-group-label>Admin</hb-layout-sidebar-group-label>
          <a
            href="#"
            class="rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            (click)="$event.preventDefault()"
            >Members</a
          >
          <a
            href="#"
            class="rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
            (click)="$event.preventDefault()"
            >Settings</a
          >
        </hb-layout-sidebar-group>
      </hb-layout-sidebar>

      <hb-layout hbDirection="vertical">
        <hb-header [hbHeight]="52"><span class="font-medium">Photos</span></hb-header>
        <hb-content>
          <p class="text-sm text-muted-foreground">
            A sidebar makes the outer layout horizontal automatically (hbDirection="auto").
          </p>
        </hb-content>
        <hb-footer [hbHeight]="36">248 photos</hb-footer>
      </hb-layout>
    </hb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoLayoutSidebarComponent {}
