import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { HbBreadcrumbImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-breadcrumb-separators',
  imports: [HbBreadcrumbImports, NgIcon],
  providers: [provideIcons({ phosphorCaretRight })],
  template: `
    <div class="flex flex-col gap-4">
      <hb-breadcrumb hbSeparator="/">
        <hb-breadcrumb-item hbHref="#">Herbst</hb-breadcrumb-item>
        <hb-breadcrumb-item hbHref="#">Autumn</hb-breadcrumb-item>
        <hb-breadcrumb-item hbCurrent>Black Forest</hb-breadcrumb-item>
      </hb-breadcrumb>

      <hb-breadcrumb>
        <ng-template hbBreadcrumbSeparator>
          <ng-icon name="phosphorCaretRight" class="text-muted-foreground [&>svg]:size-3.5" />
        </ng-template>
        <hb-breadcrumb-item hbHref="#">Herbst</hb-breadcrumb-item>
        <hb-breadcrumb-item hbHref="#">Autumn</hb-breadcrumb-item>
        <hb-breadcrumb-item hbCurrent>Black Forest</hb-breadcrumb-item>
      </hb-breadcrumb>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBreadcrumbSeparatorsComponent {}
