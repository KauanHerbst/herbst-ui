import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

import { HbLayoutImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-layout-basic',
  imports: [HbLayoutImports, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf })],
  template: `
    <hb-layout
      hbDirection="vertical"
      class="h-72 w-full max-w-xl overflow-hidden rounded-md border border-border"
    >
      <hb-header [hbHeight]="56">
        <span class="flex items-center gap-2 font-medium">
          <ng-icon name="phosphorLeaf" class="text-primary" />
          Herbst
        </span>
      </hb-header>

      <hb-content>
        <p class="text-sm text-muted-foreground">
          Content area. It scrolls independently while the header and footer stay pinned.
        </p>
      </hb-content>

      <hb-footer [hbHeight]="40">© 2026 — Herbst</hb-footer>
    </hb-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoLayoutBasicComponent {}
