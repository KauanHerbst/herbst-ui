import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { emptyDescriptionVariants } from './empty.variants';

@Component({
  selector: 'hb-empty-description, [hb-empty-description]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'empty-description'" },
  exportAs: 'hbEmptyDescription',
})
export class HbEmptyDescriptionComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(emptyDescriptionVariants(), this.class()));
}
