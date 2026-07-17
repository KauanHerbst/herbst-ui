import { computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { sidebarGroupActionClass } from './sidebar.variants';

@Directive({
  selector: '[hbSidebarGroupAction]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-group-action'",
  },
  exportAs: 'hbSidebarGroupAction',
})
export class HbSidebarGroupActionDirective {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(sidebarGroupActionClass, this.class()));
}
