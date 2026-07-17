import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { markerIconVariants } from './marker.variants';

@Component({
  selector: 'hb-marker-icon, [hb-marker-icon]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'marker-icon'",
    'aria-hidden': 'true',
  },
  exportAs: 'hbMarkerIcon',
})
export class HbMarkerIconComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(markerIconVariants(), this.class()));
}
