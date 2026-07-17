import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  numberAttribute,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  HB_MESSAGE_SCROLLER,
  type HbMessageScrollerContext,
  type HbMessageScrollerItemRef,
  type HbScrollPosition,
} from './message-scroller.token';

const AT_BOTTOM_THRESHOLD = 24;

@Component({
  selector: 'hb-message-scroller',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: HB_MESSAGE_SCROLLER, useExisting: forwardRef(() => HbMessageScrollerComponent) },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'message-scroller'",
  },
  exportAs: 'hbMessageScroller',
})
export class HbMessageScrollerComponent implements HbMessageScrollerContext {
  readonly hbAutoScroll = input(true, { transform: booleanAttribute });
  readonly hbDefaultScrollPosition = input<HbScrollPosition>('end');
  readonly hbScrollPreviousItemPeek = input(0, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  private readonly viewportEl = signal<HTMLElement | null>(null);
  private readonly items = signal<HbMessageScrollerItemRef[]>([]);
  private readonly engaged = signal(true);
  private readonly programmatic = signal(false);
  private readonly atBottomSig = signal(true);
  private readonly scrollStartSig = signal(false);
  private readonly scrollEndSig = signal(false);

  protected readonly classes = computed(() =>
    cn('relative flex min-h-0 flex-col overflow-hidden', this.class()),
  );

  readonly autoScroll = this.hbAutoScroll;
  readonly atBottom = this.atBottomSig.asReadonly();
  readonly scrollableStart = this.scrollStartSig.asReadonly();
  readonly scrollableEnd = this.scrollEndSig.asReadonly();
  readonly autoScrolling = this.programmatic.asReadonly();

  registerViewport(element: HTMLElement): void {
    this.viewportEl.set(element);
    const position = this.hbDefaultScrollPosition();
    if (position === 'start') {
      element.scrollTop = 0;
      this.engaged.set(false);
      this.measure();
    } else if (position === 'last-anchor') {
      const anchors = this.ordered().filter((i) => i.anchor());
      const last = anchors[anchors.length - 1];
      if (last) this.scrollToMessage(last.messageId(), false);
      else this.scrollToEnd(false);
    } else {
      this.scrollToEnd(false);
    }
  }

  registerItem(item: HbMessageScrollerItemRef): void {
    this.items.update((list) => [...list, item]);
  }
  unregisterItem(item: HbMessageScrollerItemRef): void {
    this.items.update((list) => list.filter((i) => i !== item));
  }

  onViewportScroll(): void {
    this.measure();
    if (!this.programmatic()) this.engaged.set(this.atBottomSig());
  }
  onContentResize(): void {
    if (this.hbAutoScroll() && this.engaged()) this.scrollToEnd(false);
    else this.measure();
  }

  scrollToEnd(smooth = true): void {
    const el = this.viewportEl();
    if (!el) return;
    this.programmatic.set(true);
    this.applyScroll(el, el.scrollHeight, smooth);
    this.engaged.set(true);
    this.atBottomSig.set(true);
    this.scrollEndSig.set(false);
    this.scrollStartSig.set(el.scrollTop > 1);
    this.clearProgrammatic();
  }
  scrollToStart(smooth = true): void {
    const el = this.viewportEl();
    if (!el) return;
    this.programmatic.set(true);
    this.applyScroll(el, 0, smooth);
    this.engaged.set(false);
    this.clearProgrammatic();
  }
  scrollToMessage(id: string, smooth = true): void {
    const el = this.viewportEl();
    const item = this.items().find((i) => i.messageId() === id);
    if (!el || !item) return;
    const target =
      el.scrollTop +
      item.element().getBoundingClientRect().top -
      el.getBoundingClientRect().top -
      this.hbScrollPreviousItemPeek();
    this.programmatic.set(true);
    this.applyScroll(el, Math.max(0, target), smooth);
    this.clearProgrammatic();
  }

  private applyScroll(el: HTMLElement, top: number, smooth: boolean): void {
    if (smooth && typeof el.scrollTo === 'function') el.scrollTo({ top, behavior: 'smooth' });
    else el.scrollTop = top;
  }

  private measure(): void {
    const el = this.viewportEl();
    if (!el) return;
    const dist = el.scrollHeight - el.clientHeight - el.scrollTop;
    this.atBottomSig.set(dist <= AT_BOTTOM_THRESHOLD);
    this.scrollStartSig.set(el.scrollTop > 1);
    this.scrollEndSig.set(dist > 1);
  }
  private ordered(): HbMessageScrollerItemRef[] {
    return [...this.items()].sort((a, b) =>
      a.element().compareDocumentPosition(b.element()) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
  }
  private clearProgrammatic(): void {
    setTimeout(() => {
      this.programmatic.set(false);
      this.measure();
    }, 150);
  }
}
