import { computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { tableHeaderGroupClass } from './table.variants';

@Directive({
  selector: 'thead[hb-table-header], [hb-table-header]',
  host: { '[class]': 'classes()', '[attr.data-slot]': "'table-header'" },
})
export class HbTableHeaderDirective {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(tableHeaderGroupClass, this.class()));
}
