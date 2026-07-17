import { HbPanelFooterDirective } from './panel-footer.directive';
import { HbPanelHeaderDirective } from './panel-header.directive';
import { HbPanelIconsDirective } from './panel-icons.directive';
import { HbPanelIndicatorDirective } from './panel-indicator.directive';
import { HbPanelComponent } from './panel.component';

export const HbPanelImports = [
  HbPanelComponent,
  HbPanelHeaderDirective,
  HbPanelIconsDirective,
  HbPanelFooterDirective,
  HbPanelIndicatorDirective,
] as const;
