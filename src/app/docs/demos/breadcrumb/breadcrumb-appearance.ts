import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBreadcrumbImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-breadcrumb-appearance',
  imports: [HbBreadcrumbImports],
  template: `
    <div class="flex w-full flex-col gap-3">
      <hb-breadcrumb hbSize="sm">
        <hb-breadcrumb-item hbHref="#">Herbst</hb-breadcrumb-item>
        <hb-breadcrumb-item hbHref="#">Autumn</hb-breadcrumb-item>
        <hb-breadcrumb-item hbCurrent>Black Forest · sm</hb-breadcrumb-item>
      </hb-breadcrumb>

      <hb-breadcrumb hbSize="lg">
        <hb-breadcrumb-item hbHref="#">Herbst</hb-breadcrumb-item>
        <hb-breadcrumb-item hbHref="#">Autumn</hb-breadcrumb-item>
        <hb-breadcrumb-item hbCurrent>Black Forest · lg</hb-breadcrumb-item>
      </hb-breadcrumb>

      <hb-breadcrumb hbAlign="center">
        <hb-breadcrumb-item hbHref="#">Herbst</hb-breadcrumb-item>
        <hb-breadcrumb-item hbHref="#">Autumn</hb-breadcrumb-item>
        <hb-breadcrumb-item hbCurrent>Black Forest · centered</hb-breadcrumb-item>
      </hb-breadcrumb>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBreadcrumbAppearanceComponent {}
