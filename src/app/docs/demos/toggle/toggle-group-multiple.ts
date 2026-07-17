import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorTextB,
  phosphorTextItalic,
  phosphorTextStrikethrough,
  phosphorTextUnderline,
} from '@ng-icons/phosphor-icons/regular';

import { HbToggleImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-toggle-group-multiple',
  imports: [HbToggleImports],
  viewProviders: [
    provideIcons({
      phosphorTextB,
      phosphorTextItalic,
      phosphorTextUnderline,
      phosphorTextStrikethrough,
    }),
  ],
  template: `
    <div class="flex flex-col gap-4">
      <hb-toggle-group
        hbType="multiple"
        hbVariant="outline"
        hbSize="lg"
        hbAriaLabel="Text formatting"
        [(hbValue)]="marks"
      >
        <hb-toggle hbValue="bold" hbIcon="phosphorTextB" />
        <hb-toggle hbValue="italic" hbIcon="phosphorTextItalic" />
        <hb-toggle hbValue="underline" hbIcon="phosphorTextUnderline" />
        <hb-toggle hbValue="strike" hbIcon="phosphorTextStrikethrough" hbDisabled />
      </hb-toggle-group>

      <p class="font-mono text-[12px] text-muted-foreground">
        marks: [{{ $any(marks()).join(', ') }}]
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoToggleGroupMultipleComponent {
  protected readonly marks = signal<unknown>(['bold', 'italic']);
}
