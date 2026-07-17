import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';

import { HbPopoverImports } from '../popover';

@Component({
  selector: 'hb-bubble-menu',
  imports: [NgIcon, HbPopoverImports],
  viewProviders: [provideIcons({ phosphorDotsThree })],
  template: `
    <hb-popover hbTrigger="click" hbSide="top" hbAlign="end">
      <button
        hbPopoverTrigger
        type="button"
        class="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        [attr.aria-label]="hbAriaLabel()"
      >
        <ng-icon name="phosphorDotsThree" />
      </button>
      <div hbPopoverContent class="flex min-w-32 flex-col gap-0.5 p-1">
        <ng-content />
      </div>
    </hb-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'inline-flex', '[attr.data-slot]': "'bubble-menu'" },
  exportAs: 'hbBubbleMenu',
})
export class HbBubbleMenuComponent {
  readonly hbAriaLabel = input('More actions');
}
