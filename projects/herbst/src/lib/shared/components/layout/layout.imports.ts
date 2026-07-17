import { HbContentComponent } from './layout-content.component';
import { HbFooterComponent } from './layout-footer.component';
import { HbHeaderComponent } from './layout-header.component';
import { HbLayoutSidebarGroupComponent } from './layout-sidebar-group.component';
import { HbLayoutSidebarGroupLabelComponent } from './layout-sidebar-group-label.component';
import { HbLayoutSidebarComponent } from './layout-sidebar.component';
import { HbLayoutComponent } from './layout.component';

export const HbLayoutImports = [
  HbLayoutComponent,
  HbHeaderComponent,
  HbFooterComponent,
  HbContentComponent,
  HbLayoutSidebarComponent,
  HbLayoutSidebarGroupComponent,
  HbLayoutSidebarGroupLabelComponent,
] as const;
