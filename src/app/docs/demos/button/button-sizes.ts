import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorPlus } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-button-sizes',
  imports: [HbButtonComponent, NgIcon],
  providers: [provideIcons({ phosphorPlus })],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <button hb-button hbSize="xs">Extra small</button>
      <button hb-button hbSize="sm">Small</button>
      <button hb-button hbSize="default">Default</button>
      <button hb-button hbSize="lg">Large</button>
      <button hb-button hbSize="xl">Extra large</button>
      <button hb-button hbSize="icon" aria-label="Add">
        <ng-icon name="phosphorPlus" />
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoButtonSizesComponent {}
