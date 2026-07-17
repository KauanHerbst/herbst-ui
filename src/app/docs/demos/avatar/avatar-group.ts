import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbAvatarImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-avatar-group',
  imports: [HbAvatarImports],
  template: `
    <div class="flex flex-col items-start gap-3">
      <hb-avatar-group [hbMax]="3" hbSpacing="md" hbSize="md" (hbOverflowClick)="expand()">
        <hb-avatar hbFallback="KH" />
        <hb-avatar hbFallback="NA" />
        <hb-avatar hbFallback="BS" />
        <hb-avatar hbFallback="LC" />
        <hb-avatar hbFallback="AM" />
      </hb-avatar-group>

      <p class="font-mono text-[12px] text-muted-foreground">Overflow clicks: {{ clicks() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAvatarGroupComponent {
  protected readonly clicks = signal(0);

  protected expand(): void {
    this.clicks.update((n) => n + 1);
  }
}
