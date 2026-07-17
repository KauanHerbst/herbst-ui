import { DOCUMENT } from '@angular/common';
import {
  type AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
  type OutputEmitterRef,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbResizableHandleComponent } from './resizable-handle.component';
import { HbResizablePanelComponent } from './resizable-panel.component';
import {
  HB_RESIZABLE_GROUP,
  type HbResizableContext,
  type HbResizableHandleRef,
} from './resizable.token';
import { resizableGroupVariants, type HbResizableOrientation } from './resizable.variants';


const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
export interface HbResizeEvent {
  sizes: number[];
  orientation: HbResizableOrientation;
}

@Component({
  selector: 'hb-resizable-group, [hb-resizable-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: HB_RESIZABLE_GROUP, useExisting: HbResizableGroupComponent }],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'resizable-group'",
    '[attr.data-orientation]': 'hbOrientation()',
  },
  exportAs: 'hbResizableGroup',
})
export class HbResizableGroupComponent implements AfterContentInit, HbResizableContext {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbOrientation = input<HbResizableOrientation>('horizontal');
  readonly hbKeyboardStep = input(5, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  readonly hbResizeStart = output<HbResizeEvent>();
  readonly hbResize = output<HbResizeEvent>();
  readonly hbResizeEnd = output<HbResizeEvent>();

  readonly panels = contentChildren(HbResizablePanelComponent);
  readonly handles = contentChildren(HbResizableHandleComponent);
  readonly panelSizes = signal<number[]>([]);

  protected readonly classes = computed(() =>
    cn(resizableGroupVariants({ orientation: this.hbOrientation() }), this.class()),
  );

  private moveCleanup: (() => void) | null = null;

  constructor() {
    this.destroyRef.onDestroy(() => this.stopTracking());
  }

  ngAfterContentInit(): void {
    this.initSizes();
  }

  handleIndexOf(handle: HbResizableHandleRef): number {
    return this.handles().indexOf(handle as HbResizableHandleComponent);
  }

  startResize(handleIndex: number, event: PointerEvent): void {
    const panels = this.panels();
    const leftIdx = handleIndex;
    const rightIdx = handleIndex + 1;
    if (leftIdx < 0 || rightIdx >= panels.length) return;

    const horizontal = this.hbOrientation() === 'horizontal';
    const container = this.containerSize();
    const startPos = horizontal ? event.clientX : event.clientY;
    const sizes = [...this.panelSizes()];
    const leftStart = sizes[leftIdx];
    const rightStart = sizes[rightIdx];
    const [leftMin, leftMax] = this.limits(panels[leftIdx]);
    const [rightMin, rightMax] = this.limits(panels[rightIdx]);

    this.emit(this.hbResizeStart);
    this.document.body.style.userSelect = 'none';
    this.document.body.style.cursor = horizontal ? 'col-resize' : 'row-resize';

    const onMove = (e: PointerEvent): void => {
      const pos = horizontal ? e.clientX : e.clientY;
      const deltaPct = ((pos - startPos) / container) * 100;
      this.redistribute(leftIdx, rightIdx, leftStart, rightStart, deltaPct, [
        leftMin,
        leftMax,
        rightMin,
        rightMax,
      ]);
      this.emit(this.hbResize);
    };
    const onUp = (): void => {
      this.stopTracking();
      this.document.body.style.userSelect = '';
      this.document.body.style.cursor = '';
      this.emit(this.hbResizeEnd);
    };
    this.document.addEventListener('pointermove', onMove);
    this.document.addEventListener('pointerup', onUp);
    this.moveCleanup = () => {
      this.document.removeEventListener('pointermove', onMove);
      this.document.removeEventListener('pointerup', onUp);
    };
  }

  resizeByKeyboard(
    handleIndex: number,
    direction: number,
    toExtreme: 'min' | 'max' | null = null,
  ): void {
    const panels = this.panels();
    const leftIdx = handleIndex;
    const rightIdx = handleIndex + 1;
    if (leftIdx < 0 || rightIdx >= panels.length) return;

    const sizes = this.panelSizes();
    const leftStart = sizes[leftIdx];
    const rightStart = sizes[rightIdx];
    const [leftMin, leftMax] = this.limits(panels[leftIdx]);
    const [rightMin, rightMax] = this.limits(panels[rightIdx]);

    let deltaPct: number;
    if (toExtreme === 'min') deltaPct = leftMin - leftStart;
    else if (toExtreme === 'max') deltaPct = leftMax - leftStart;
    else deltaPct = direction * this.hbKeyboardStep();

    this.redistribute(leftIdx, rightIdx, leftStart, rightStart, deltaPct, [
      leftMin,
      leftMax,
      rightMin,
      rightMax,
    ]);
    this.emit(this.hbResize);
    this.emit(this.hbResizeEnd);
  }

  private redistribute(
    leftIdx: number,
    rightIdx: number,
    leftStart: number,
    rightStart: number,
    deltaPct: number,
    [leftMin, leftMax, rightMin, rightMax]: number[],
  ): void {
    let newLeft = clamp(leftStart + deltaPct, leftMin, leftMax);
    let newRight = rightStart - (newLeft - leftStart);
    const clampedRight = clamp(newRight, rightMin, rightMax);
    if (clampedRight !== newRight) {
      newLeft = leftStart + (rightStart - clampedRight);
      newRight = clampedRight;
    }
    const next = [...this.panelSizes()];
    next[leftIdx] = newLeft;
    next[rightIdx] = newRight;
    this.applySizes(next);
  }

  private limits(panel: HbResizablePanelComponent): [number, number] {
    return [panel.hbCollapsible() ? 0 : panel.hbMin(), panel.hbMax()];
  }

  private initSizes(): void {
    const panels = this.panels();
    if (!panels.length) return;

    const resolved = panels.map((p) => {
      const d = p.hbDefaultSize();
      if (d === undefined || d === null || d === '') return null;
      const num = typeof d === 'number' ? d : Number.parseFloat(String(d));
      return Number.isFinite(num) ? num : null;
    });
    const sumDefined = resolved.reduce<number>((acc, v) => acc + (v ?? 0), 0);
    const undefinedCount = resolved.filter((v) => v === null).length;
    const share = undefinedCount > 0 ? Math.max(0, 100 - sumDefined) / undefinedCount : 0;

    let sizes = resolved.map((v) => (v === null ? share : v));
    const total = sizes.reduce((a, b) => a + b, 0) || 1;
    sizes = sizes.map((s) => (s / total) * 100);
    this.applySizes(sizes);
  }

  private applySizes(sizes: number[]): void {
    this.panelSizes.set(sizes);
    this.panels().forEach((panel, i) => panel.setSize(sizes[i] ?? 0));
  }

  private containerSize(): number {
    const el = this.host.nativeElement;
    const horizontal = this.hbOrientation() === 'horizontal';
    const full = horizontal ? el.offsetWidth : el.offsetHeight;
    const handlesPx = this.handles().reduce((sum, h) => {
      const he = h.el.nativeElement;
      return sum + (horizontal ? he.offsetWidth : he.offsetHeight);
    }, 0);
    return Math.max(1, full - handlesPx);
  }

  private stopTracking(): void {
    this.moveCleanup?.();
    this.moveCleanup = null;
  }

  private emit(out: OutputEmitterRef<HbResizeEvent>): void {
    out.emit({
      sizes: this.panelSizes().map((s) => Math.round(s * 100) / 100),
      orientation: this.hbOrientation(),
    });
  }
}
