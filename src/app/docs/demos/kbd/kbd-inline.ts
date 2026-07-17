import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbKbdImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-kbd-inline',
  imports: [HbKbdImports, HbButtonComponent],
  template: `
    <div class="flex max-w-md flex-col gap-4">
      <p class="text-sm text-muted-foreground">
        Press <kbd hb-kbd hbSize="sm">⌘</kbd> <kbd hb-kbd hbSize="sm">K</kbd> to open the command
        palette, or <kbd hb-kbd hbSize="sm">/</kbd> to focus search.
      </p>

      <button hb-button hbType="outline" class="justify-between gap-6">
        Search photos
        <hb-kbd-group>
          <hb-kbd hbSize="xs">⌘</hb-kbd>
          <hb-kbd hbSize="xs">K</hb-kbd>
        </hb-kbd-group>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoKbdInlineComponent {}
