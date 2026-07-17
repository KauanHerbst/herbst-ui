import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheckCircle } from '@ng-icons/phosphor-icons/regular';

import { HbBadgeImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-badge-types',
  imports: [HbBadgeImports, NgIcon],
  providers: [provideIcons({ phosphorCheckCircle })],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span hb-badge>Default</span>
      <span hb-badge hbType="secondary">Secondary</span>
      <span hb-badge hbType="success"><ng-icon name="phosphorCheckCircle" /> Live</span>
      <span hb-badge hbType="warning">Fading</span>
      <span hb-badge hbType="destructive">Discarded</span>
      <span hb-badge hbType="outline">Outline</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBadgeTypesComponent {}
