import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { kbdVariants, type HbKbdSize } from './kbd.variants';

@Component({
  selector: 'hb-kbd, [hb-kbd]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'kbd'" },
  exportAs: 'hbKbd',
})
export class HbKbdComponent {
  readonly hbSize = input<HbKbdSize>('md');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(kbdVariants({ size: this.hbSize() }), this.class()),
  );
}
