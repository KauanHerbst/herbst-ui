import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBadgeImports, HbButtonComponent, HbPanelImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLeaf, phosphorTag, phosphorTrash } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-panel-templates',
  imports: [HbPanelImports, HbBadgeImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag, phosphorTrash })],
  template: `
    <hb-panel class="w-full max-w-md" hbToggleable>
      <ng-template hbPanelHeader>
        <ng-icon name="phosphorLeaf" class="text-muted-foreground" />
        <span class="font-medium">Black Forest</span>
        <span hb-badge hbType="secondary">IMG·019</span>
      </ng-template>

      <ng-template hbPanelIcons>
        <button hb-button hbType="ghost" hbSize="icon" aria-label="Tag">
          <ng-icon name="phosphorTag" />
        </button>
        <button hb-button hbType="ghost" hbSize="icon" aria-label="Delete">
          <ng-icon name="phosphorTrash" />
        </button>
      </ng-template>

      <ng-template hbPanelIndicator let-collapsed>
        <span class="text-sm font-medium">{{ collapsed ? '+' : '−' }}</span>
      </ng-template>

      <p class="text-sm text-muted-foreground">
        Oak leaves along the trail. A cool, misty morning near Freiburg on 3 November.
      </p>

      <ng-template hbPanelFooter>
        <span class="text-xs text-muted-foreground">Updated November 2026</span>
        <button hb-button hbType="secondary" hbSize="sm">Edit</button>
      </ng-template>
    </hb-panel>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPanelTemplatesComponent {}
