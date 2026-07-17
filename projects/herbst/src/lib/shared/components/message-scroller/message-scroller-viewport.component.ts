import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_MESSAGE_SCROLLER, type HbMessageScrollerContext } from './message-scroller.token';

@Component({
  selector: 'hb-message-scroller-viewport',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-scroller-viewport'",
    '[attr.data-autoscrolling]': 'ctx.autoScrolling() ? "" : null',
    '[attr.data-scrollable]': 'scrollable()',
    '(scroll)': 'ctx.onViewportScroll()',
  },
  exportAs: 'hbMessageScrollerViewport',
})
export class HbMessageScrollerViewportComponent {
  protected readonly ctx = inject<HbMessageScrollerContext>(HB_MESSAGE_SCROLLER);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn('min-h-0 flex-1 overflow-y-auto overscroll-contain', this.class()),
  );
  protected readonly scrollable = computed(() => {
    const start = this.ctx.scrollableStart();
    const end = this.ctx.scrollableEnd();
    if (start && end) return 'both';
    if (start) return 'start';
    if (end) return 'end';
    return null;
  });

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      this.ctx.registerViewport(el);
      const RO = (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
      const ro = RO ? new RO(() => this.ctx.onContentResize()) : null;
      const target = el.firstElementChild ?? el;
      ro?.observe(target);
      this.destroyRef.onDestroy(() => ro?.disconnect());
    });
  }
}
