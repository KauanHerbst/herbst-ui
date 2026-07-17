import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbBubbleImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-bubble-variants',
  imports: [HbBubbleImports],
  template: `
    <div class="flex flex-col items-start gap-2">
      <hb-bubble hbVariant="default">Default — the primary bubble.</hb-bubble>
      <hb-bubble hbVariant="secondary">Secondary — the neutral default.</hb-bubble>
      <hb-bubble hbVariant="muted">Muted — a quiet aside.</hb-bubble>
      <hb-bubble hbVariant="tinted">Tinted — a faint oxide wash.</hb-bubble>
      <hb-bubble hbVariant="outline">Outline — hairline only.</hb-bubble>
      <hb-bubble hbVariant="ghost">Ghost — no surface at all.</hb-bubble>
      <hb-bubble hbVariant="destructive">Destructive — something went wrong.</hb-bubble>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBubbleVariantsComponent {}
