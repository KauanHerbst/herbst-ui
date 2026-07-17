import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { inputGroupTextVariants } from './input-group.variants';

@Component({
  selector: 'hb-input-group-text, [hb-input-group-text]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'input-group-text'" },
  exportAs: 'hbInputGroupText',
})
export class HbInputGroupTextComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(inputGroupTextVariants(), this.class()));
}
