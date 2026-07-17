import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbResizableImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-resizable-basic',
  imports: [HbResizableImports],
  template: `
    <hb-resizable-group
      class="h-56 w-full max-w-xl overflow-hidden rounded-md border border-border"
    >
      <hb-resizable-panel
        [hbDefaultSize]="35"
        class="flex items-center justify-center bg-muted/40 p-4 text-sm"
      >
        Sidebar
      </hb-resizable-panel>

      <hb-resizable-handle />

      <hb-resizable-panel [hbDefaultSize]="65" class="flex items-center justify-center p-4 text-sm">
        Drag the divider →
      </hb-resizable-panel>
    </hb-resizable-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoResizableBasicComponent {}
