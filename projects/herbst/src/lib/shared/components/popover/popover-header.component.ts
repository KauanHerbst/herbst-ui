import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { popoverHeaderVariants } from './popover.variants';

@Component({
  selector: 'hb-popover-header, [hb-popover-header]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'popover-header'" },
  exportAs: 'hbPopoverHeader',
})
export class HbPopoverHeaderComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(popoverHeaderVariants(), this.class()));
}
