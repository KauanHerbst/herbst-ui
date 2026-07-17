import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbTimelineImports, type HbTimelineColor } from '@herbst/ui';

@Component({
  selector: 'hb-demo-timeline-horizontal',
  imports: [HbTimelineImports],
  template: `
    <div class="flex w-full flex-col gap-3">
      <hb-timeline class="w-full" hbLayout="horizontal" hbAlign="top">
        @for (s of steps; track s.n) {
          <hb-timeline-item hbInteractive (hbSelect)="picked.set(s.label)">
            <hb-timeline-marker [hbColor]="s.color" hbVariant="soft">{{ s.n }}</hb-timeline-marker>
            <hb-timeline-content>
              <p class="font-medium">{{ s.label }}</p>
            </hb-timeline-content>
          </hb-timeline-item>
        }
      </hb-timeline>

      <p class="font-mono text-[12px] text-muted-foreground">picked: {{ picked() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTimelineHorizontalComponent {
  protected readonly picked = signal('—');
  protected readonly steps: { n: number; label: string; color: HbTimelineColor }[] = [
    { n: 1, label: 'Collect', color: 'success' },
    { n: 2, label: 'Press', color: 'primary' },
    { n: 3, label: 'Mount', color: 'primary' },
    { n: 4, label: 'Label', color: 'warning' },
    { n: 5, label: 'Archive', color: 'muted' },
  ];
}
