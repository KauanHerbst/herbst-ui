import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbMenuImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-menu-context',
  imports: [HbMenuImports, HbButtonComponent],
  template: `
    <div class="flex flex-col items-start gap-4">
      <button hb-button hbType="secondary" [hbMenuTriggerFor]="hoverMenu" hbTrigger="hover">
        Hover to open
      </button>

      <div
        [hbContextMenuTriggerFor]="ctxMenu"
        class="flex h-24 w-64 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground"
      >
        Right-click this area
      </div>
    </div>

    <ng-template #hoverMenu>
      <hb-menu>
        <hb-menu-item>Recently viewed</hb-menu-item>
        <hb-menu-item>Pinned forests</hb-menu-item>
      </hb-menu>
    </ng-template>

    <ng-template #ctxMenu>
      <hb-menu>
        <hb-menu-label>Photo</hb-menu-label>
        <hb-menu-item>Open</hb-menu-item>
        <hb-menu-item>Rename</hb-menu-item>
        <hb-menu-separator />
        <hb-menu-item hbVariant="destructive">Discard</hb-menu-item>
      </hb-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMenuContextComponent {}
