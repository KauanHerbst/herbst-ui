import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbItemImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree, phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-item-basic',
  imports: [HbItemImports, HbButtonComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorDotsThree })],
  template: `
    <hb-item class="w-full max-w-md" hbVariant="outline">
      <hb-item-media hbVariant="icon">
        <ng-icon name="phosphorLeaf" />
      </hb-item-media>

      <hb-item-content>
        <hb-item-title>Oak leaves</hb-item-title>
        <hb-item-description>
          Taken along the trail in Freiburg, November 2026.
        </hb-item-description>
      </hb-item-content>

      <hb-item-actions>
        <button hb-button hbType="ghost" hbSize="icon" aria-label="More">
          <ng-icon name="phosphorDotsThree" />
        </button>
      </hb-item-actions>
    </hb-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoItemBasicComponent {}
