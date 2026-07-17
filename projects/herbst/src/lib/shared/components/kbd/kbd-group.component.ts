import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { kbdGroupVariants } from './kbd.variants';

@Component({
  selector: 'hb-kbd-group, [hb-kbd-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'kbd-group'" },
  exportAs: 'hbKbdGroup',
})
export class HbKbdGroupComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(kbdGroupVariants(), this.class()));
}
