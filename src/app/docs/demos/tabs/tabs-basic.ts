import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorLeaf, phosphorTag } from '@ng-icons/phosphor-icons/regular';

import { HbTabsImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tabs-basic',
  imports: [HbTabsImports],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorTag, phosphorBell })],
  template: `
    <hb-tabs class="w-full max-w-md" [(hbValue)]="tab" (hbChange)="last.set($event)">
      <hb-tab-list>
        <hb-tab hbValue="photos" hbIcon="phosphorLeaf">Photos</hb-tab>
        <hb-tab hbValue="forests" hbIcon="phosphorTag" [hbBadge]="12">Forests</hb-tab>
        <hb-tab hbValue="alerts" hbIcon="phosphorBell" [hbBadge]="3">Alerts</hb-tab>
        <hb-tab hbValue="archive" hbDisabled>Archive</hb-tab>
      </hb-tab-list>

      <hb-tab-panel hbValue="photos">
        <p class="text-sm text-muted-foreground">42 autumn photos from four forests.</p>
      </hb-tab-panel>
      <hb-tab-panel hbValue="forests">
        <p class="text-sm text-muted-foreground">Six forests around Freiburg.</p>
      </hb-tab-panel>
      <hb-tab-panel hbValue="alerts">
        <p class="text-sm text-muted-foreground">Three photos still need captions.</p>
      </hb-tab-panel>
    </hb-tabs>

    <p class="mt-3 font-mono text-[12px] text-muted-foreground">
      value: {{ tab() }} · last change: {{ last() }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTabsBasicComponent {
  protected readonly tab = signal<unknown>('photos');
  protected readonly last = signal<unknown>('—');
}
