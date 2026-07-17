import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { emptyContentVariants } from './empty.variants';

@Component({
  selector: 'hb-empty-content, [hb-empty-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'empty-content'" },
  exportAs: 'hbEmptyContent',
})
export class HbEmptyContentComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(emptyContentVariants(), this.class()));
}
