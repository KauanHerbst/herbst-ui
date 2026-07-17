import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbResizableImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-resizable-vertical',
  imports: [HbResizableImports],
  template: `
    <hb-resizable-group
      hbOrientation="vertical"
      class="h-72 w-full max-w-md overflow-hidden rounded-md border border-border"
    >
      <hb-resizable-panel
        [hbDefaultSize]="35"
        class="flex items-center justify-center bg-muted/40 p-4 text-sm"
      >
        Header
      </hb-resizable-panel>

      <hb-resizable-handle hbWithHandle />

      <hb-resizable-panel [hbDefaultSize]="65" class="flex items-center justify-center p-4 text-sm">
        Body — drag the grip ↕
      </hb-resizable-panel>
    </hb-resizable-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoResizableVerticalComponent {}
