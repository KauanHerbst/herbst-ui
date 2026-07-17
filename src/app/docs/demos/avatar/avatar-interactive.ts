import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbAvatarImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-avatar-interactive',
  imports: [HbAvatarImports],
  template: `
    <div class="flex items-center gap-4">
      <hb-avatar
        hbFallback="KH"
        hbSize="lg"
        class="cursor-pointer"
        (hbClick)="taps.set(taps() + 1)"
      />
      <hb-avatar hbFallback="NA" hbSize="lg" hbDisabled />

      <p class="font-mono text-[12px] text-muted-foreground">Tapped {{ taps() }}×</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAvatarInteractiveComponent {
  protected readonly taps = signal(0);
}
