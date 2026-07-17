import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbPopoverComponent } from './popover.component';
import { popoverContentVariants } from './popover.variants';

@Component({
  selector: 'hb-popover-content, [hb-popover-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.width]': 'widthStyle()',
    tabindex: '-1',
    '[attr.data-slot]': "'popover-content'",
    '[attr.data-side]': 'popover.resolvedSide()',
    '[attr.data-state]': "popover.isOpen() ? 'open' : 'closed'",
  },
  exportAs: 'hbPopoverContent',
})
export class HbPopoverContentComponent {
  protected readonly popover = inject(HbPopoverComponent);

  readonly hbWidth = input<number | string | null>(null);
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn(popoverContentVariants(), this.class()));
  protected readonly widthStyle = computed(() => {
    const w = this.hbWidth();
    if (w === null || w === '') return null;
    return typeof w === 'number' ? `${w}px` : w;
  });
}
