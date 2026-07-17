import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbPopoverImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-popover-behaviour',
  imports: [HbPopoverImports, HbButtonComponent],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <hb-popover hbTrigger="hover" [hbOpenDelay]="120" [hbCloseDelay]="240">
        <button hbPopoverTrigger hb-button hbType="secondary">Hover me</button>
        <hb-popover-content [hbWidth]="220">
          <p class="text-sm">Opens on hover after 120ms, closes 240ms after leaving.</p>
        </hb-popover-content>
      </hb-popover>

      <hb-popover
        [hbOpen]="open()"
        [hbCloseOnOutsideClick]="false"
        (hbOpenChange)="open.set($event)"
      >
        <button hbPopoverTrigger hb-button>Controlled</button>
        <hb-popover-content [hbWidth]="240">
          <p class="text-sm">Outside clicks are ignored — close it explicitly.</p>
          <button hb-button hbType="outline" hbSize="sm" class="mt-3" hbPopoverClose>Done</button>
        </hb-popover-content>
      </hb-popover>

      <hb-popover hbDisabled>
        <button hbPopoverTrigger hb-button hbType="ghost">Disabled</button>
        <hb-popover-content>
          <p class="text-sm">You will never see this.</p>
        </hb-popover-content>
      </hb-popover>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoPopoverBehaviourComponent {
  protected readonly open = signal(false);
}
