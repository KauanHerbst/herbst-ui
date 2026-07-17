import { HbMenuTriggerDirective } from './menu-trigger.directive';
import { HbContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { HbMenuCheckboxItemComponent } from './menu-checkbox-item.component';
import { HbMenuComponent } from './menu.component';
import { HbMenuGroupComponent } from './menu-group.component';
import { HbMenuItemComponent } from './menu-item.component';
import { HbMenuLabelComponent } from './menu-label.component';
import { HbMenuRadioGroupComponent } from './menu-radio-group.component';
import { HbMenuRadioItemComponent } from './menu-radio-item.component';
import { HbMenuSeparatorComponent } from './menu-separator.component';
import { HbMenuShortcutComponent } from './menu-shortcut.component';

export const HbMenuImports = [
  HbMenuTriggerDirective,
  HbContextMenuTriggerDirective,
  HbMenuComponent,
  HbMenuItemComponent,
  HbMenuCheckboxItemComponent,
  HbMenuRadioGroupComponent,
  HbMenuRadioItemComponent,
  HbMenuLabelComponent,
  HbMenuSeparatorComponent,
  HbMenuGroupComponent,
  HbMenuShortcutComponent,
] as const;
