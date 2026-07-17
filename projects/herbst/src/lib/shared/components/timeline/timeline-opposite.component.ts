import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-timeline-opposite',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'timeline-opposite'",
  },
  exportAs: 'hbTimelineOpposite',
})
export class HbTimelineOppositeComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn('block text-sm text-muted-foreground', this.class()));
}
