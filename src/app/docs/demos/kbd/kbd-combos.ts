import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbKbdImports } from '@herbst/ui';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorArrowRight } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-kbd-combos',
  imports: [HbKbdImports, NgIcon],
  viewProviders: [provideIcons({ phosphorArrowRight })],
  template: `
    <div class="flex flex-col gap-3">
      <hb-kbd-group>
        <hb-kbd>⌘</hb-kbd>
        <hb-kbd>K</hb-kbd>
      </hb-kbd-group>

      <hb-kbd-group>
        <hb-kbd>Ctrl</hb-kbd>
        <span class="text-xs text-muted-foreground">+</span>
        <hb-kbd>Alt</hb-kbd>
        <span class="text-xs text-muted-foreground">+</span>
        <hb-kbd>Del</hb-kbd>
      </hb-kbd-group>

      <hb-kbd-group>
        <hb-kbd hbSize="lg">⌘</hb-kbd>
        <hb-kbd hbSize="lg">
          <ng-icon name="phosphorArrowRight" />
        </hb-kbd>
      </hb-kbd-group>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoKbdCombosComponent {}
