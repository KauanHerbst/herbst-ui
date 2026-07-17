import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbInputDirective, HbInputGroupImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-input-group-inline',
  imports: [HbInputGroupImports, HbInputDirective, NgIcon],
  viewProviders: [provideIcons({ phosphorMagnifyingGlass })],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <hb-input-group>
        <hb-input-group-addon>
          <ng-icon name="phosphorMagnifyingGlass" />
        </hb-input-group-addon>
        <input hb-input placeholder="Search photos" />
      </hb-input-group>

      <hb-input-group>
        <hb-input-group-addon>
          <hb-input-group-text>https://</hb-input-group-text>
        </hb-input-group-addon>
        <input hb-input placeholder="herbst" />
        <hb-input-group-addon hbAlign="inline-end">
          <hb-input-group-text>.org</hb-input-group-text>
        </hb-input-group-addon>
      </hb-input-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputGroupInlineComponent {}
