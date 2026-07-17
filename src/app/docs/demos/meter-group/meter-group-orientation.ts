import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMeterGroupImports, type HbMeterItem } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-meter-group-orientation',
  imports: [HbMeterGroupImports],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag, phosphorBell })],
  template: `
    <hb-meter-group
      [hbValue]="items"
      hbOrientation="vertical"
      hbLabelPosition="start"
      hbLabelOrientation="vertical"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMeterGroupOrientationComponent {
  protected readonly items: HbMeterItem[] = [
    { label: 'Oak', value: 38, color: '#6B7A55', icon: 'phosphorLeaf' },
    { label: 'Beech', value: 30, color: '#A64B2A', icon: 'phosphorTag' },
    { label: 'Maple', value: 18, color: '#B98A3E', icon: 'phosphorBell' },
  ];
}
