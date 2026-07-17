import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBreadcrumbImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-breadcrumb-collapsed',
  imports: [HbBreadcrumbImports],
  template: `
    <hb-breadcrumb [hbMaxItems]="3">
      <hb-breadcrumb-item hbHref="#">Herbst</hb-breadcrumb-item>
      <hb-breadcrumb-item hbHref="#">Germany</hb-breadcrumb-item>
      <hb-breadcrumb-item hbHref="#">Baden-Württemberg</hb-breadcrumb-item>
      <hb-breadcrumb-item hbHref="#">Freiburg</hb-breadcrumb-item>
      <hb-breadcrumb-item hbCurrent>Black Forest</hb-breadcrumb-item>
    </hb-breadcrumb>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBreadcrumbCollapsedComponent {}
