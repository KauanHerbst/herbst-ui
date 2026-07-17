import { HbSelectGroupComponent } from './select-group.component';
import { HbSelectItemComponent } from './select-item.component';
import { HbSelectLabelComponent } from './select-label.component';
import { HbSelectSeparatorComponent } from './select-separator.component';
import { HbSelectValueDirective } from './select-value.directive';
import { HbSelectComponent } from './select.component';

export const HbSelectImports = [
  HbSelectComponent,
  HbSelectItemComponent,
  HbSelectGroupComponent,
  HbSelectLabelComponent,
  HbSelectSeparatorComponent,
  HbSelectValueDirective,
] as const;
