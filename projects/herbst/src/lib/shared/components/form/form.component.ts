import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'form[hb-form], hb-form',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'form'" },
  exportAs: 'hbForm',
})
export class HbFormComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn('flex flex-col gap-6', this.class()));
}
