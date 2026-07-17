import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  scrollAreaClass,
  scrollbarVariants,
  thumbVariants,
  type HbScrollAreaOrientation,
  type HbScrollAreaType,
  type HbScrollbarVariants,
  type HbThumbVariants,
} from './scroll-area.variants';

const MIN_THUMB = 20;
const FADE = '24px';

type Axis = 'vertical' | 'horizontal';

@Component({
  selector: 'hb-scroll-area',
  template: `
    <div
      #viewport
      class="hb-scrollbar-none size-full rounded-[inherit]"
      [class]="viewportOverflow()"
      data-slot="scroll-area-viewport"
      [style]="viewportStyle()"
      (scroll)="onScroll()"
    >
      <div #content class="min-w-full" data-slot="scroll-area-content" [class.w-max]="scrollsX()">
        <ng-content />
      </div>
    </div>

    @if (scrollsY()) {
      <div
        [class]="verticalBarClass()"
        data-slot="scroll-area-scrollbar"
        data-orientation="vertical"
        [attr.data-state]="visibleY() ? 'visible' : 'hidden'"
        (pointerdown)="onTrackPointerDown('vertical', $event)"
      >
        <div
          [class]="thumbClass()"
          data-slot="scroll-area-thumb"
          [style.height.px]="thumbSizeY()"
          [style.transform]="'translateY(' + thumbOffsetY() + 'px)'"
          (pointerdown)="onThumbDown('vertical', $event)"
          (pointermove)="onThumbMove('vertical', $event)"
          (pointerup)="onThumbUp($event)"
          (pointercancel)="onThumbUp($event)"
        ></div>
      </div>
    }

    @if (scrollsX()) {
      <div
        [class]="horizontalBarClass()"
        data-slot="scroll-area-scrollbar"
        data-orientation="horizontal"
        [attr.data-state]="visibleX() ? 'visible' : 'hidden'"
        (pointerdown)="onTrackPointerDown('horizontal', $event)"
      >
        <div
          [class]="thumbClass()"
          data-slot="scroll-area-thumb"
          [style.width.px]="thumbSizeX()"
          [style.transform]="'translateX(' + thumbOffsetX() + 'px)'"
          (pointerdown)="onThumbDown('horizontal', $event)"
          (pointermove)="onThumbMove('horizontal', $event)"
          (pointerup)="onThumbUp($event)"
          (pointercancel)="onThumbUp($event)"
        ></div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'scroll-area'",
    '[attr.data-orientation]': 'hbOrientation()',
    '(pointerenter)': 'hovering.set(true)',
    '(pointerleave)': 'hovering.set(false)',
  },
  exportAs: 'hbScrollArea',
})
export class HbScrollAreaComponent {
  readonly hbOrientation = input<HbScrollAreaOrientation>('vertical');
  readonly hbType = input<HbScrollAreaType>('hover');
  readonly hbFade = input(false, { transform: booleanAttribute });
  readonly hbVariant = input<NonNullable<HbThumbVariants['variant']>>('default');
  readonly hbSize = input<NonNullable<HbScrollbarVariants['size']>>('md');
  readonly hbHideDelay = input(600, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  readonly hbReachEnd = output<'bottom' | 'right'>();

  private readonly viewportRef = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly contentRef = viewChild.required<ElementRef<HTMLElement>>('content');
  private readonly destroyRef = inject(DestroyRef);

  private readonly scrollTop = signal(0);
  private readonly scrollLeft = signal(0);
  private readonly clientH = signal(0);
  private readonly clientW = signal(0);
  private readonly scrollH = signal(0);
  private readonly scrollW = signal(0);

  protected readonly hovering = signal(false);
  private readonly scrolling = signal(false);
  private readonly dragging = signal<Axis | null>(null);
  private dragStart = 0;
  private dragScroll = 0;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;
  private prevAtBottom = true;
  private prevAtRight = true;

  protected readonly scrollsY = computed(
    () => this.hbOrientation() === 'vertical' || this.hbOrientation() === 'both',
  );
  protected readonly scrollsX = computed(
    () => this.hbOrientation() === 'horizontal' || this.hbOrientation() === 'both',
  );

  protected readonly classes = computed(() => cn(scrollAreaClass, this.class()));
  protected readonly thumbClass = computed(() => thumbVariants({ variant: this.hbVariant() }));
  protected readonly verticalBarClass = computed(() =>
    scrollbarVariants({ orientation: 'vertical', size: this.hbSize() }),
  );
  protected readonly horizontalBarClass = computed(() =>
    scrollbarVariants({ orientation: 'horizontal', size: this.hbSize() }),
  );
  protected readonly viewportOverflow = computed(() => {
    switch (this.hbOrientation()) {
      case 'horizontal':
        return 'overflow-x-auto overflow-y-hidden';
      case 'both':
        return 'overflow-auto';
      default:
        return 'overflow-y-auto overflow-x-hidden';
    }
  });

  private readonly overflowY = computed(() => this.scrollH() - this.clientH() > 1);
  private readonly overflowX = computed(() => this.scrollW() - this.clientW() > 1);

  readonly atTop = computed(() => this.scrollTop() <= 1);
  readonly atBottom = computed(() => this.scrollH() - this.clientH() - this.scrollTop() <= 1);
  readonly atStart = computed(() => this.scrollLeft() <= 1);
  readonly atEnd = computed(() => this.scrollW() - this.clientW() - this.scrollLeft() <= 1);

  protected readonly visibleY = computed(() => this.axisVisible(this.overflowY()));
  protected readonly visibleX = computed(() => this.axisVisible(this.overflowX()));

  protected readonly thumbSizeY = computed(() => {
    if (!this.overflowY()) return 0;
    return Math.max(MIN_THUMB, (this.clientH() / this.scrollH()) * this.clientH());
  });
  protected readonly thumbSizeX = computed(() => {
    if (!this.overflowX()) return 0;
    return Math.max(MIN_THUMB, (this.clientW() / this.scrollW()) * this.clientW());
  });
  protected readonly thumbOffsetY = computed(() => {
    const track = this.clientH() - this.thumbSizeY();
    const range = this.scrollH() - this.clientH();
    return range > 0 ? (this.scrollTop() / range) * track : 0;
  });
  protected readonly thumbOffsetX = computed(() => {
    const track = this.clientW() - this.thumbSizeX();
    const range = this.scrollW() - this.clientW();
    return range > 0 ? (this.scrollLeft() / range) * track : 0;
  });

  protected readonly viewportStyle = computed<Record<string, string>>(() => {
    if (!this.hbFade()) return {};
    const masks: string[] = [];
    if (this.scrollsY()) {
      masks.push(
        axisMask('to bottom', !this.atTop() && this.overflowY(), !this.atBottom() && this.overflowY()),
      );
    }
    if (this.scrollsX()) {
      masks.push(
        axisMask('to right', !this.atStart() && this.overflowX(), !this.atEnd() && this.overflowX()),
      );
    }
    const image = masks.join(', ');
    const style: Record<string, string> = {
      'mask-image': image,
      '-webkit-mask-image': image,
    };
    if (masks.length > 1) {
      style['mask-composite'] = 'intersect';
      style['-webkit-mask-composite'] = 'source-in';
    }
    return style;
  });

  constructor() {
    afterNextRender(() => {
      const viewport = this.viewportRef().nativeElement;
      const content = this.contentRef().nativeElement;
      this.measure();
      if (typeof ResizeObserver !== 'undefined') {
        const observer = new ResizeObserver(() => this.measure());
        observer.observe(viewport);
        observer.observe(content);
        this.destroyRef.onDestroy(() => observer.disconnect());
      }
    });
    this.destroyRef.onDestroy(() => {
      if (this.hideTimer) clearTimeout(this.hideTimer);
    });
  }

  scrollToTop(smooth = true): void {
    this.scrollTo({ top: 0 }, smooth);
  }
  scrollToBottom(smooth = true): void {
    const el = this.viewportRef().nativeElement;
    this.scrollTo({ top: el.scrollHeight }, smooth);
  }
  scrollTo(pos: { top?: number; left?: number }, smooth = true): void {
    const el = this.viewportRef().nativeElement;
    if (smooth && typeof el.scrollTo === 'function') {
      el.scrollTo({ ...pos, behavior: 'smooth' });
    } else {
      if (pos.top !== undefined) el.scrollTop = pos.top;
      if (pos.left !== undefined) el.scrollLeft = pos.left;
    }
    this.measure();
  }

  protected onScroll(): void {
    this.measure();
    this.flagScrolling();
  }

  protected onTrackPointerDown(axis: Axis, event: PointerEvent): void {
    if (event.target !== event.currentTarget) return;
    const el = this.viewportRef().nativeElement;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    if (axis === 'vertical') {
      const ratio = (event.clientY - rect.top) / rect.height;
      this.scrollTo({ top: ratio * (el.scrollHeight - el.clientHeight) });
    } else {
      const ratio = (event.clientX - rect.left) / rect.width;
      this.scrollTo({ left: ratio * (el.scrollWidth - el.clientWidth) });
    }
  }

  protected onThumbDown(axis: Axis, event: PointerEvent): void {
    event.stopPropagation();
    event.preventDefault();
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    this.dragging.set(axis);
    const el = this.viewportRef().nativeElement;
    if (axis === 'vertical') {
      this.dragStart = event.clientY;
      this.dragScroll = el.scrollTop;
    } else {
      this.dragStart = event.clientX;
      this.dragScroll = el.scrollLeft;
    }
  }

  protected onThumbMove(axis: Axis, event: PointerEvent): void {
    if (this.dragging() !== axis) return;
    const el = this.viewportRef().nativeElement;
    if (axis === 'vertical') {
      const track = el.clientHeight - this.thumbSizeY();
      const range = el.scrollHeight - el.clientHeight;
      const delta = event.clientY - this.dragStart;
      el.scrollTop = this.dragScroll + (track > 0 ? (delta / track) * range : 0);
    } else {
      const track = el.clientWidth - this.thumbSizeX();
      const range = el.scrollWidth - el.clientWidth;
      const delta = event.clientX - this.dragStart;
      el.scrollLeft = this.dragScroll + (track > 0 ? (delta / track) * range : 0);
    }
    this.measure();
  }

  protected onThumbUp(event: PointerEvent): void {
    const target = event.target as HTMLElement;
    if (target.hasPointerCapture?.(event.pointerId)) target.releasePointerCapture(event.pointerId);
    this.dragging.set(null);
  }

  private axisVisible(overflow: boolean): boolean {
    const type = this.hbType();
    if (type === 'always') return true;
    if (!overflow) return false;
    if (type === 'hover') return this.hovering() || this.dragging() !== null;
    if (type === 'scroll') return this.scrolling() || this.dragging() !== null;
    return true;
  }

  private flagScrolling(): void {
    if (this.hbType() !== 'scroll') return;
    this.scrolling.set(true);
    if (this.hideTimer) clearTimeout(this.hideTimer);
    this.hideTimer = setTimeout(() => this.scrolling.set(false), this.hbHideDelay());
  }

  private measure(): void {
    const el = this.viewportRef().nativeElement;
    this.scrollTop.set(el.scrollTop);
    this.scrollLeft.set(el.scrollLeft);
    this.clientH.set(el.clientHeight);
    this.clientW.set(el.clientWidth);
    this.scrollH.set(el.scrollHeight);
    this.scrollW.set(el.scrollWidth);

    const atBottom = this.atBottom();
    if (atBottom && !this.prevAtBottom && this.overflowY()) this.hbReachEnd.emit('bottom');
    this.prevAtBottom = atBottom;

    const atRight = this.atEnd();
    if (atRight && !this.prevAtRight && this.overflowX()) this.hbReachEnd.emit('right');
    this.prevAtRight = atRight;
  }
}

function axisMask(dir: string, fadeNear: boolean, fadeFar: boolean): string {
  const start = fadeNear ? `transparent 0, #000 ${FADE}` : '#000 0';
  const end = fadeFar ? `#000 calc(100% - ${FADE}), transparent 100%` : '#000 100%';
  return `linear-gradient(${dir}, ${start}, ${end})`;
}
