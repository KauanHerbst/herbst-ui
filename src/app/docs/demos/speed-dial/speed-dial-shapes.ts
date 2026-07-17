import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSpeedDialImports, type HbSpeedDialItem } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorBell,
  phosphorEnvelope,
  phosphorLeaf,
  phosphorMagnifyingGlass,
  phosphorTag,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-speed-dial-shapes',
  imports: [HbSpeedDialImports],
  viewProviders: [
    provideIcons({
      phosphorLeaf,
      phosphorTag,
      phosphorBell,
      phosphorEnvelope,
      phosphorMagnifyingGlass,
    }),
  ],
  template: `
    <div class="flex h-72 w-full items-center justify-center">
      <hb-speed-dial
        [hbModel]="items"
        hbType="circle"
        [hbRadius]="110"
        hbMask
        hbButtonType="secondary"
        hbRotateIcon
      />
    </div>
  `,
  host: { class: 'block w-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSpeedDialShapesComponent {
  protected readonly items: HbSpeedDialItem[] = [
    { icon: 'phosphorLeaf', label: 'Photos' },
    { icon: 'phosphorTag', label: 'Forests' },
    { icon: 'phosphorBell', label: 'Alerts' },
    { icon: 'phosphorEnvelope', label: 'Messages' },
    { icon: 'phosphorMagnifyingGlass', label: 'Search' },
  ];
}
