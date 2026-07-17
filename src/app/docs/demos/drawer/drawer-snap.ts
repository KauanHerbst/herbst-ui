import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbDrawerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-drawer-snap',
  imports: [HbDrawerImports, HbButtonComponent],
  template: `
    <hb-drawer
      hbSide="bottom"
      hbHandle
      [hbSnapPoints]="[0.3, 0.6, 1]"
      hbTitle="Draggable sheet"
      hbDescription="Drag the handle between the snap points."
      [hbShowFooter]="false"
    >
      <button hb-button hbType="outline" hbDrawerTrigger>Open with snap points</button>

      <div hbDrawerContent class="flex flex-col gap-2 text-sm text-muted-foreground">
        <p>Snaps at 30%, 60%, and 100% of the screen height.</p>
        <p>The handle at the top can be dragged to move between them.</p>
        <p>Useful for progressively revealing content on touch devices.</p>
      </div>
    </hb-drawer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDrawerSnapComponent {}
