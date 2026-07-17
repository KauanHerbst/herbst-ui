import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-timeline-content',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'timeline-content'",
  },
  exportAs: 'hbTimelineContent',
})
export class HbTimelineContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn('block text-sm', this.class()));
}
