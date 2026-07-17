import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbSheetImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-sheet-sides',
  imports: [HbSheetImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <hb-sheet hbSide="right" hbSize="22rem" hbTitle="Right" [hbShowFooter]="false">
        <button hbSheetTrigger hb-button hbType="outline">Right</button>
        <div hbSheetContent>
          <p class="text-sm text-muted-foreground">Slides from the right.</p>
        </div>
      </hb-sheet>

      <hb-sheet hbSide="left" hbSize="22rem" hbTitle="Left" [hbShowFooter]="false">
        <button hbSheetTrigger hb-button hbType="outline">Left</button>
        <div hbSheetContent><p class="text-sm text-muted-foreground">Slides from the left.</p></div>
      </hb-sheet>

      <hb-sheet hbSide="top" hbSize="14rem" hbTitle="Top" [hbShowFooter]="false">
        <button hbSheetTrigger hb-button hbType="outline">Top</button>
        <div hbSheetContent><p class="text-sm text-muted-foreground">Drops from the top.</p></div>
      </hb-sheet>

      <hb-sheet hbSide="bottom" hbSize="14rem" hbTitle="Bottom" [hbShowFooter]="false">
        <button hbSheetTrigger hb-button hbType="outline">Bottom</button>
        <div hbSheetContent>
          <p class="text-sm text-muted-foreground">Rises from the bottom.</p>
        </div>
      </hb-sheet>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSheetSidesComponent {}
