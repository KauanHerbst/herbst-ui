import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbDrawerImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-drawer-sides',
  imports: [HbDrawerImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <hb-drawer hbSide="left" hbSize="sm" hbTitle="Left drawer" [hbShowFooter]="false">
        <button hb-button hbType="outline" hbDrawerTrigger>Left</button>
        <div hbDrawerContent class="text-sm text-muted-foreground">Slides in from the left.</div>
      </hb-drawer>

      <hb-drawer hbSide="right" hbSize="sm" hbTitle="Right drawer" [hbShowFooter]="false">
        <button hb-button hbType="outline" hbDrawerTrigger>Right</button>
        <div hbDrawerContent class="text-sm text-muted-foreground">Slides in from the right.</div>
      </hb-drawer>

      <hb-drawer hbSide="top" hbSize="sm" hbTitle="Top drawer" [hbShowFooter]="false">
        <button hb-button hbType="outline" hbDrawerTrigger>Top</button>
        <div hbDrawerContent class="text-sm text-muted-foreground">Drops down from the top.</div>
      </hb-drawer>

      <hb-drawer hbSide="bottom" hbSize="md" hbTitle="Bottom drawer" [hbShowFooter]="false">
        <button hb-button hbType="outline" hbDrawerTrigger>Bottom</button>
        <div hbDrawerContent class="text-sm text-muted-foreground">Rises from the bottom.</div>
      </hb-drawer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoDrawerSidesComponent {}
