import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { popoverTitleVariants } from './popover.variants';

@Component({
  selector: 'hb-popover-title, [hb-popover-title]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'popover-title'" },
  exportAs: 'hbPopoverTitle',
})
export class HbPopoverTitleComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(popoverTitleVariants(), this.class()));
}
