import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbInputDirective, HbInputGroupImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-group-blocks',
  imports: [HbInputGroupImports, HbInputDirective, HbButtonComponent],
  template: `
    <hb-input-group class="w-full max-w-sm">
      <hb-input-group-addon hbAlign="block-start">
        <hb-input-group-text class="font-medium text-foreground">Field notes</hb-input-group-text>
      </hb-input-group-addon>

      <textarea hb-input placeholder="Oak leaves turning amber along the trail…"></textarea>

      <hb-input-group-addon hbAlign="block-end" class="justify-between">
        <hb-input-group-text>Markdown supported</hb-input-group-text>
        <button hb-button hbType="secondary" hbSize="sm">Save</button>
      </hb-input-group-addon>
    </hb-input-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputGroupBlocksComponent {}
