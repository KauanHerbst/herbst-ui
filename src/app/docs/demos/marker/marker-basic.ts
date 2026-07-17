import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbMarkerImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight, phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-marker-basic',
  imports: [HbMarkerImports, NgIcon],
  viewProviders: [provideIcons({ phosphorLeaf, phosphorArrowRight })],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-marker>
        <hb-marker-icon><ng-icon name="phosphorLeaf" /></hb-marker-icon>
        <hb-marker-content>Oak leaves</hb-marker-content>
      </hb-marker>

      <a hb-marker href="#" (click)="$event.preventDefault()">
        <hb-marker-icon><ng-icon name="phosphorArrowRight" /></hb-marker-icon>
        View photo
      </a>

      <button hb-marker type="button">
        <hb-marker-icon><ng-icon name="phosphorLeaf" /></hb-marker-icon>
        Add to album
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMarkerBasicComponent {}
