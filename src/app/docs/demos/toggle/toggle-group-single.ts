import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorTextAlignCenter,
  phosphorTextAlignJustify,
  phosphorTextAlignLeft,
  phosphorTextAlignRight,
} from '@ng-icons/phosphor-icons/regular';

import { HbToggleImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-toggle-group-single',
  imports: [HbToggleImports],
  viewProviders: [
    provideIcons({
      phosphorTextAlignLeft,
      phosphorTextAlignCenter,
      phosphorTextAlignRight,
      phosphorTextAlignJustify,
    }),
  ],
  template: `
    <div class="flex flex-col gap-4">
      <hb-toggle-group hbVariant="outline" hbAriaLabel="Text alignment" [(hbValue)]="align">
        <hb-toggle hbValue="left" hbIcon="phosphorTextAlignLeft" />
        <hb-toggle hbValue="center" hbIcon="phosphorTextAlignCenter" />
        <hb-toggle hbValue="right" hbIcon="phosphorTextAlignRight" />
        <hb-toggle hbValue="justify" hbIcon="phosphorTextAlignJustify" hbDisabled />
      </hb-toggle-group>

      <hb-toggle-group hbSize="sm" [hbConnected]="false" [hbRollable]="false" [(hbValue)]="view">
        <hb-toggle hbValue="grid">Grid</hb-toggle>
        <hb-toggle hbValue="list">List</hb-toggle>
        <hb-toggle hbValue="table">Table</hb-toggle>
      </hb-toggle-group>

      <p class="font-mono text-[12px] text-muted-foreground">
        align: {{ align() }} · view: {{ view() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoToggleGroupSingleComponent {
  protected readonly align = signal<unknown>('left');
  protected readonly view = signal<unknown>('grid');
}
