import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { emptyTitleVariants } from './empty.variants';

@Component({
  selector: 'hb-empty-title, [hb-empty-title]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'empty-title'" },
  exportAs: 'hbEmptyTitle',
})
export class HbEmptyTitleComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(emptyTitleVariants(), this.class()));
}
