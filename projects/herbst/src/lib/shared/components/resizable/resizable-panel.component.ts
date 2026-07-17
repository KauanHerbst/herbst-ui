import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { resizablePanelVariants } from './resizable.variants';

@Directive({
  selector: 'hb-resizable-panel, [hb-resizable-panel]',
  host: {
    '[class]': 'classes()',
    '[style.flex-grow]': 'size()',
    '[style.flex-shrink]': '1',
    '[style.flex-basis]': "'0%'",
    '[attr.data-slot]': "'resizable-panel'",
    '[attr.data-collapsed]': 'isCollapsed()',
  },
  exportAs: 'hbResizablePanel',
})
export class HbResizablePanelComponent {
  readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbDefaultSize = input<number | string | undefined>(undefined);
  readonly hbMin = input(0, { transform: numberAttribute });
  readonly hbMax = input(100, { transform: numberAttribute });
  readonly hbCollapsible = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly size = signal(0);
  setSize(value: number): void {
    this.size.set(value);
  }

  protected readonly isCollapsed = computed(() => this.size() <= 0.5);
  protected readonly classes = computed(() => cn(resizablePanelVariants(), this.class()));
}
