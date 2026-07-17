import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight, phosphorPlus, phosphorTrash } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-icons',
  imports: [HbButtonComponent, NgIcon],
  providers: [provideIcons({ phosphorPlus, phosphorArrowRight, phosphorTrash })],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button hb-button>
        <ng-icon name="phosphorPlus" />
        New photo
      </button>
      <button hb-button hbType="outline">
        Continue
        <ng-icon name="phosphorArrowRight" />
      </button>
      <button hb-button hbType="destructive" hbSize="icon" aria-label="Delete">
        <ng-icon name="phosphorTrash" />
      </button>
      <button hb-button hbType="outline" hbShape="circle" hbSize="icon" aria-label="Add">
        <ng-icon name="phosphorPlus" />
      </button>
      <button hb-button hbType="secondary" hbShape="square">Square</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonIconsComponent {}
