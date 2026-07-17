import { computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { tableCaptionClass } from './table.variants';

@Directive({
  selector: 'caption[hb-table-caption], [hb-table-caption]',
  host: { '[class]': 'classes()', '[attr.data-slot]': "'table-caption'" },
})
export class HbTableCaptionDirective {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(tableCaptionClass, this.class()));
}
