import { HbMeterGroupEndDirective } from './meter-group-end.directive';
import { HbMeterGroupIconDirective } from './meter-group-icon.directive';
import { HbMeterGroupLabelDirective } from './meter-group-label.directive';
import { HbMeterGroupMeterDirective } from './meter-group-meter.directive';
import { HbMeterGroupStartDirective } from './meter-group-start.directive';
import { HbMeterGroupComponent } from './meter-group.component';

export const HbMeterGroupImports = [
  HbMeterGroupComponent,
  HbMeterGroupLabelDirective,
  HbMeterGroupMeterDirective,
  HbMeterGroupStartDirective,
  HbMeterGroupEndDirective,
  HbMeterGroupIconDirective,
] as const;
