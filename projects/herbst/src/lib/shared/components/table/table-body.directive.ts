import { computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { tableBodyClass } from './table.variants';

@Directive({
  selector: 'tbody[hb-table-body], [hb-table-body]',
  host: { '[class]': 'classes()', '[attr.data-slot]': "'table-body'" },
})
export class HbTableBodyDirective {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(tableBodyClass, this.class()));
}
