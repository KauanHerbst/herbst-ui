import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { popoverDescriptionVariants } from './popover.variants';

@Component({
  selector: 'hb-popover-description, [hb-popover-description]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'popover-description'" },
  exportAs: 'hbPopoverDescription',
})
export class HbPopoverDescriptionComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(popoverDescriptionVariants(), this.class()));
}
