import { HbItemActionsComponent } from './item-actions.component';
import { HbItemComponent } from './item.component';
import { HbItemContentComponent } from './item-content.component';
import { HbItemDescriptionComponent } from './item-description.component';
import { HbItemFooterComponent } from './item-footer.component';
import { HbItemGroupComponent } from './item-group.component';
import { HbItemHeaderComponent } from './item-header.component';
import { HbItemMediaComponent } from './item-media.component';
import { HbItemSeparatorComponent } from './item-separator.component';
import { HbItemTitleComponent } from './item-title.component';

export const HbItemImports = [
  HbItemComponent,
  HbItemGroupComponent,
  HbItemSeparatorComponent,
  HbItemMediaComponent,
  HbItemContentComponent,
  HbItemTitleComponent,
  HbItemDescriptionComponent,
  HbItemActionsComponent,
  HbItemHeaderComponent,
  HbItemFooterComponent,
] as const;
