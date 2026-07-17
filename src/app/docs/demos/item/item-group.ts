import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBadgeImports, HbItemImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight, phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-item-group',
  imports: [HbItemImports, HbBadgeImports, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorCaretRight })],
  template: `
    <hb-item-group class="w-full max-w-md rounded-md border border-border">
      <hb-item hbVariant="muted" hbSize="sm">
        <hb-item-header>
          <span class="text-sm font-medium">Black Forest</span>
          <span hb-badge hbType="secondary">3</span>
        </hb-item-header>
      </hb-item>

      @for (row of species; track row.name) {
        <hb-item-separator />
        <a hb-item href="#" hbSize="sm" (click)="$event.preventDefault()">
          <hb-item-media hbVariant="icon">
            <ng-icon name="phosphorLeaf" />
          </hb-item-media>
          <hb-item-content>
            <hb-item-title>{{ row.name }}</hb-item-title>
            <hb-item-description>{{ row.city }}</hb-item-description>
          </hb-item-content>
          <hb-item-actions>
            <ng-icon name="phosphorCaretRight" class="text-muted-foreground" />
          </hb-item-actions>
        </a>
      }

      <hb-item-separator />
      <hb-item hbSize="sm">
        <hb-item-footer>
          <span class="text-xs text-muted-foreground">Updated November 2026</span>
          <a href="#" class="text-xs underline" (click)="$event.preventDefault()">View all</a>
        </hb-item-footer>
      </hb-item>
    </hb-item-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoItemGroupComponent {
  protected readonly species = [
    { name: 'Oak leaves', city: 'Freiburg' },
    { name: 'Foggy morning', city: 'Munich' },
    { name: 'Chestnuts', city: 'Berlin' },
  ];
}
