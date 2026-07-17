import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbBreadcrumbImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-breadcrumb-basic',
  imports: [HbBreadcrumbImports],
  template: `
    <div class="flex flex-col gap-2">
      <hb-breadcrumb>
        <hb-breadcrumb-item (hbClick)="go('Herbst')">Herbst</hb-breadcrumb-item>
        <hb-breadcrumb-item (hbClick)="go('Autumn')">Autumn</hb-breadcrumb-item>
        <hb-breadcrumb-item hbCurrent>Black Forest</hb-breadcrumb-item>
      </hb-breadcrumb>

      <p class="font-mono text-[12px] text-muted-foreground">At: {{ at() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBreadcrumbBasicComponent {
  protected readonly at = signal('Black Forest');

  protected go(label: string): void {
    this.at.set(label);
  }
}
