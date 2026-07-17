import { HbTabListComponent } from './tab-list.component';
import { HbTabMenuComponent } from './tab-menu.component';
import { HbTabPanelComponent } from './tab-panel.component';
import { HbTabComponent } from './tab.component';
import { HbTabsComponent } from './tabs.component';
import { HbTabsIndicatorDirective } from './tabs-indicator.directive';

export const HbTabsImports = [
  HbTabsComponent,
  HbTabListComponent,
  HbTabComponent,
  HbTabPanelComponent,
  HbTabMenuComponent,
  HbTabsIndicatorDirective,
] as const;
