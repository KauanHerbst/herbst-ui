import { HbNavigationMenuContentComponent } from './navigation-menu-content.component';
import { HbNavigationMenuIndicatorComponent } from './navigation-menu-indicator.component';
import { HbNavigationMenuItemComponent } from './navigation-menu-item.component';
import { HbNavigationMenuLinkDirective } from './navigation-menu-link.directive';
import { HbNavigationMenuListComponent } from './navigation-menu-list.component';
import { HbNavigationMenuTriggerComponent } from './navigation-menu-trigger.component';
import { HbNavigationMenuViewportComponent } from './navigation-menu-viewport.component';
import { HbNavigationMenuComponent } from './navigation-menu.component';

export const HbNavigationMenuImports = [
  HbNavigationMenuComponent,
  HbNavigationMenuListComponent,
  HbNavigationMenuItemComponent,
  HbNavigationMenuTriggerComponent,
  HbNavigationMenuContentComponent,
  HbNavigationMenuLinkDirective,
  HbNavigationMenuIndicatorComponent,
  HbNavigationMenuViewportComponent,
] as const;
