import { computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { tableFooterClass } from './table.variants';

@Directive({
  selector: 'tfoot[hb-table-footer], [hb-table-footer]',
  host: { '[class]': 'classes()', '[attr.data-slot]': "'table-footer'" },
})
export class HbTableFooterDirective {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(tableFooterClass, this.class()));
}
