import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbTimelineComponent } from './timeline.component';

@Component({
  selector: 'hb-timeline-connector',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'timeline-connector-custom'",
  },
  exportAs: 'hbTimelineConnector',
})
export class HbTimelineConnectorComponent {
  private readonly timeline = inject(HbTimelineComponent);
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'block bg-border',
      this.timeline.layout() === 'vertical' ? 'w-0.5 flex-1' : 'h-0.5 flex-1',
      this.class(),
    ),
  );
}
