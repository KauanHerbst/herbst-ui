import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { buttonGroupTextVariants } from './button-group.variants';

@Component({
  selector: 'hb-button-group-text, [hb-button-group-text]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'button-group-text'",
  },
  exportAs: 'hbButtonGroupText',
})
export class HbButtonGroupTextComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(buttonGroupTextVariants(), this.class()));
}
