import { HbBreadcrumbComponent, HbBreadcrumbSeparatorDirective } from './breadcrumb.component';
import { HbBreadcrumbEllipsisComponent } from './breadcrumb-ellipsis.component';
import { HbBreadcrumbItemComponent } from './breadcrumb-item.component';

export const HbBreadcrumbImports = [
  HbBreadcrumbComponent,
  HbBreadcrumbItemComponent,
  HbBreadcrumbEllipsisComponent,
  HbBreadcrumbSeparatorDirective,
] as const;
