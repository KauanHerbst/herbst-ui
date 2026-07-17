import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { markerContentVariants } from './marker.variants';

@Component({
  selector: 'hb-marker-content, [hb-marker-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'marker-content'",
  },
  exportAs: 'hbMarkerContent',
})
export class HbMarkerContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(markerContentVariants(), this.class()));
}
