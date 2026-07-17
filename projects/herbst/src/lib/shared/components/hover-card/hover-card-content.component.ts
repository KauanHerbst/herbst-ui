import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbHoverCardComponent } from './hover-card.component';
import { hoverCardContentVariants } from './hover-card.variants';

@Component({
  selector: 'hb-hover-card-content, [hb-hover-card-content]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.width]': 'widthStyle()',
    '[attr.data-slot]': "'hover-card-content'",
    '[attr.data-side]': 'card.resolvedSide()',
    '[attr.data-state]': "card.isOpen() ? 'open' : 'closed'",
  },
  exportAs: 'hbHoverCardContent',
})
export class HbHoverCardContentComponent {
  protected readonly card = inject(HbHoverCardComponent);

  readonly hbWidth = input<number | string | null>(null);
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn(hoverCardContentVariants(), this.class()));
  protected readonly widthStyle = computed(() => {
    const w = this.hbWidth();
    if (w === null || w === '') return null;
    return typeof w === 'number' ? `${w}px` : w;
  });
}
