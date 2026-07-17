import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { type HbTimelineAlign, type HbTimelineLayout } from './timeline.variants';

@Component({
  selector: 'hb-timeline',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'list',
    '[class]': 'classes()',
    '[attr.data-slot]': "'timeline'",
    '[attr.data-layout]': 'hbLayout()',
    '[attr.data-align]': 'hbAlign()',
  },
  exportAs: 'hbTimeline',
})
export class HbTimelineComponent {
  readonly hbLayout = input<HbTimelineLayout>('vertical');
  readonly hbAlign = input<HbTimelineAlign>('left');
  readonly class = input<ClassValue>('');

  readonly layout = this.hbLayout;
  readonly align = this.hbAlign;

  protected readonly classes = computed(() =>
    cn(
      'group/timeline flex',
      this.hbLayout() === 'vertical' ? 'flex-col' : 'flex-row overflow-x-auto',
      '[&>[data-slot=timeline-item]:last-child_[data-slot=timeline-connector]]:hidden',
      this.class(),
    ),
  );
}
