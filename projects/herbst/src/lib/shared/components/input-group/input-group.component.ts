import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { inputGroupVariants } from './input-group.variants';

@Component({
  selector: 'hb-input-group, [hb-input-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'group', '[attr.data-slot]': "'input-group'" },
  exportAs: 'hbInputGroup',
})
export class HbInputGroupComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(inputGroupVariants(), this.class()));
}
