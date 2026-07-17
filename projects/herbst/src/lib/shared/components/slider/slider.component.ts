import { DOCUMENT } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn, type ClassValue } from '../../utils';
import {
  sliderRangeVariants,
  sliderRootVariants,
  sliderThumbVariants,
  sliderTrackVariants,
  type HbSliderMark,
  type HbSliderOrientation,
  type HbSliderSize,
} from './slider.variants';


const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);
type HbSliderValue = number | number[];
type HbSliderMarksInput = boolean | number[] | HbSliderMark[];

@Component({
  selector: 'hb-slider',
  template: `
    <div [class]="controlClasses()">
      <span #track [class]="trackClasses()" (pointerdown)="onTrackPointerDown($event)">
        <span
          [class]="rangeClasses()"
          [style.left.%]="horizontal() ? rangeStart() : null"
          [style.width.%]="horizontal() ? rangeLength() : null"
          [style.top.%]="horizontal() ? null : 100 - rangeStart() - rangeLength()"
          [style.height.%]="horizontal() ? null : rangeLength()"
        ></span>

        @for (mark of marks(); track mark.value) {
          <span
            class="bg-background/70 pointer-events-none absolute z-10 rounded-full"
            [class]="horizontal() ? 'top-1/2 size-1 -translate-x-1/2 -translate-y-1/2' : 'left-1/2 size-1 -translate-x-1/2 translate-y-1/2'"
            [style.left.%]="horizontal() ? markPos(mark.value) : null"
            [style.bottom.%]="horizontal() ? null : markPos(mark.value)"
          ></span>
        }
      </span>

      @for (value of values(); track $index) {
        <span
          role="slider"
          [class]="thumbClasses()"
          [style.left.%]="horizontal() ? thumbPos($index) : 50"
          [style.top.%]="horizontal() ? 50 : 100 - thumbPos($index)"
          [style.transform]="'translate(-50%, -50%)'"
          [style.zIndex]="activeThumb() === $index ? 20 : 15"
          [attr.tabindex]="disabledState() ? -1 : 0"
          [attr.data-disabled]="disabledState() || null"
          [attr.aria-orientation]="hbOrientation()"
          [attr.aria-valuemin]="hbMin()"
          [attr.aria-valuemax]="hbMax()"
          [attr.aria-valuenow]="value"
          [attr.aria-valuetext]="format()(value)"
          [attr.aria-label]="hbAriaLabel() || null"
          [attr.aria-disabled]="disabledState() || null"
          (pointerdown)="onThumbPointerDown($index, $event)"
          (keydown)="onThumbKeydown($index, $event)"
          (focus)="onThumbFocus($index)"
          (blur)="onThumbBlur()"
          (pointerenter)="hovered.set($index)"
          (pointerleave)="hovered.set(null)"
        >
          @if (hbTooltip() && tooltipVisible($index)) {
            <span
              class="bg-primary text-primary-foreground pointer-events-none absolute z-30 rounded-md px-1.5 py-0.5 text-xs whitespace-nowrap shadow-sm"
              [class]="horizontal() ? 'bottom-full left-1/2 mb-2 -translate-x-1/2' : 'left-full top-1/2 ml-2 -translate-y-1/2'"
            >
              {{ format()(value) }}
            </span>
          }
        </span>
      }
    </div>

    @if (labelledMarks().length) {
      <div [class]="markLabelWrapClasses()">
        @for (mark of labelledMarks(); track mark.value) {
          <span
            class="text-muted-foreground pointer-events-none absolute text-xs"
            [class]="horizontal() ? '-translate-x-1/2' : '-translate-y-1/2'"
            [style.left.%]="horizontal() ? markPos(mark.value) : null"
            [style.bottom.%]="horizontal() ? null : markPos(mark.value)"
          >
            {{ mark.label }}
          </span>
        }
      </div>
    }
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbSliderComponent), multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'rootClasses()',
    '[attr.data-slot]': "'slider'",
    '[attr.data-orientation]': 'hbOrientation()',
    '[attr.data-disabled]': 'disabledState() || null',
  },
  exportAs: 'hbSlider',
})
export class HbSliderComponent implements ControlValueAccessor {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly hostEl = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbValue = model<HbSliderValue | null>(null);
  readonly hbDefaultValue = input<HbSliderValue>();
  readonly hbMin = input(0, { transform: numberAttribute });
  readonly hbMax = input(100, { transform: numberAttribute });
  readonly hbStep = input(1, { transform: numberAttribute });
  readonly hbMinStepsBetweenThumbs = input(0, { transform: numberAttribute });
  readonly hbOrientation = input<HbSliderOrientation>('horizontal');
  readonly hbInverted = input(false, { transform: booleanAttribute });
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbSize = input<HbSliderSize>('md');
  readonly hbTooltip = input(false, { transform: booleanAttribute });
  readonly hbFormat = input<(value: number) => string>();
  readonly hbMarks = input<HbSliderMarksInput>(false);
  readonly hbAriaLabel = input<string>('');
  readonly class = input<ClassValue>('');
  readonly hbTrackClass = input<ClassValue>('');
  readonly hbRangeClass = input<ClassValue>('');
  readonly hbThumbClass = input<ClassValue>('');

  readonly hbChange = output<HbSliderValue>();
  readonly hbChangeEnd = output<HbSliderValue>();

  private readonly trackEl = viewChild.required<ElementRef<HTMLElement>>('track');

  private readonly cvaDisabled = signal(false);
  protected readonly activeThumb = signal<number | null>(null);
  protected readonly hovered = signal<number | null>(null);
  private moveCleanup: (() => void) | null = null;

  private onChange: (value: HbSliderValue) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.destroyRef.onDestroy(() => this.stopTracking());
  }

  protected readonly horizontal = computed(() => this.hbOrientation() === 'horizontal');
  protected readonly disabledState = computed(() => this.hbDisabled() || this.cvaDisabled());

  protected readonly format = computed(
    () => this.hbFormat() ?? ((value: number) => String(value)),
  );

  private readonly single = computed(() => {
    const bound = this.hbValue();
    if (bound !== null && bound !== undefined) return !Array.isArray(bound);
    const def = this.hbDefaultValue();
    if (def !== undefined) return !Array.isArray(def);
    return true;
  });

  protected readonly values = computed<number[]>(() => {
    const raw = this.hbValue() ?? this.hbDefaultValue() ?? this.hbMin();
    const arr = Array.isArray(raw) ? raw : [raw];
    const safe = arr.length ? arr : [this.hbMin()];
    return safe.map((v) => this.snap(clamp(v, this.hbMin(), this.hbMax())));
  });

  protected readonly rootClasses = computed(() =>
    cn(sliderRootVariants({ orientation: this.hbOrientation() }), this.class()),
  );
  protected readonly controlClasses = computed(() =>
    this.horizontal()
      ? 'relative flex w-full items-center'
      : 'relative flex h-full w-auto flex-col items-center',
  );
  protected readonly trackClasses = computed(() =>
    cn(
      sliderTrackVariants({ orientation: this.hbOrientation(), size: this.hbSize() }),
      this.hbTrackClass(),
    ),
  );
  protected readonly rangeClasses = computed(() =>
    cn(sliderRangeVariants({ orientation: this.hbOrientation() }), this.hbRangeClass()),
  );
  protected readonly thumbClasses = computed(() =>
    cn(sliderThumbVariants({ size: this.hbSize() }), this.hbThumbClass()),
  );


  private basePercent(value: number): number {
    const span = this.hbMax() - this.hbMin();
    if (span <= 0) return 0;
    return ((value - this.hbMin()) / span) * 100;
  }

  private visual(value: number): number {
    const base = this.basePercent(value);
    return this.hbInverted() ? 100 - base : base;
  }

  protected thumbPos(index: number): number {
    return this.visual(this.values()[index]);
  }

  protected markPos(value: number): number {
    return this.visual(value);
  }

  protected readonly rangeStart = computed(() => {
    const vals = this.values();
    const lo = this.single() ? this.hbMin() : Math.min(...vals);
    const hi = this.single() ? vals[0] : Math.max(...vals);
    return Math.min(this.visual(lo), this.visual(hi));
  });

  protected readonly rangeLength = computed(() => {
    const vals = this.values();
    const lo = this.single() ? this.hbMin() : Math.min(...vals);
    const hi = this.single() ? vals[0] : Math.max(...vals);
    return Math.abs(this.visual(hi) - this.visual(lo));
  });


  protected readonly marks = computed<HbSliderMark[]>(() => {
    const m = this.hbMarks();
    if (!m) return [];
    if (m === true) {
      const step = this.hbStep() || 1;
      const count = (this.hbMax() - this.hbMin()) / step;
      if (count > 100) return [];
      const out: HbSliderMark[] = [];
      for (let v = this.hbMin(); v <= this.hbMax() + 1e-9; v += step) {
        out.push({ value: this.snap(v) });
      }
      return out;
    }
    return (m as (number | HbSliderMark)[]).map((x) =>
      typeof x === 'number' ? { value: x } : x,
    );
  });

  protected readonly labelledMarks = computed(() => this.marks().filter((m) => !!m.label));

  protected readonly markLabelWrapClasses = computed(() =>
    this.horizontal() ? 'relative mt-2 h-4 w-full' : 'relative ml-2 h-full w-4',
  );


  protected tooltipVisible(index: number): boolean {
    return this.activeThumb() === index || this.hovered() === index;
  }


  protected onTrackPointerDown(event: PointerEvent): void {
    if (this.disabledState()) return;
    const raw = this.valueFromPointer(event);
    const index = this.nearestThumb(raw);
    this.focusThumb(index);
    this.moveThumb(index, raw, false);
    this.startDrag(index);
  }

  protected onThumbPointerDown(index: number, event: PointerEvent): void {
    if (this.disabledState()) return;
    event.stopPropagation();
    this.focusThumb(index);
    this.activeThumb.set(index);
    this.startDrag(index);
  }

  private startDrag(index: number): void {
    this.activeThumb.set(index);
    this.document.body.style.userSelect = 'none';

    const onMove = (e: PointerEvent): void => {
      this.moveThumb(index, this.valueFromPointer(e), false);
    };
    const onUp = (e: PointerEvent): void => {
      this.moveThumb(index, this.valueFromPointer(e), true);
      this.stopTracking();
      this.document.body.style.userSelect = '';
      this.onTouched();
    };
    this.document.addEventListener('pointermove', onMove);
    this.document.addEventListener('pointerup', onUp);
    this.moveCleanup = () => {
      this.document.removeEventListener('pointermove', onMove);
      this.document.removeEventListener('pointerup', onUp);
    };
  }

  private valueFromPointer(event: PointerEvent): number {
    const rect = this.trackEl().nativeElement.getBoundingClientRect();
    let ratio = this.horizontal()
      ? (event.clientX - rect.left) / (rect.width || 1)
      : (rect.bottom - event.clientY) / (rect.height || 1);
    if (this.hbInverted()) ratio = 1 - ratio;
    ratio = clamp(ratio, 0, 1);
    return this.hbMin() + ratio * (this.hbMax() - this.hbMin());
  }

  private nearestThumb(rawValue: number): number {
    const vals = this.values();
    let best = 0;
    let bestDist = Infinity;
    vals.forEach((v, i) => {
      const dist = Math.abs(v - rawValue);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  }


  protected onThumbKeydown(index: number, event: KeyboardEvent): void {
    if (this.disabledState()) return;
    const step = this.hbStep();
    const big = step * 10;
    let delta = 0;
    let jump: 'min' | 'max' | null = null;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'PageUp':
        delta = big;
        break;
      case 'PageDown':
        delta = -big;
        break;
      case 'Home':
        jump = 'min';
        break;
      case 'End':
        jump = 'max';
        break;
      default:
        return;
    }
    event.preventDefault();
    if (this.hbInverted()) delta = -delta;
    const current = this.values()[index];
    const target =
      jump === 'min' ? this.hbMin() : jump === 'max' ? this.hbMax() : current + delta;
    this.moveThumb(index, target, true);
    this.onTouched();
  }


  private moveThumb(index: number, rawValue: number, end: boolean): void {
    const current = [...this.values()];
    const step = this.hbStep();
    const gap = this.hbMinStepsBetweenThumbs() * step;
    const lower = index > 0 ? current[index - 1] + gap : this.hbMin();
    const upper = index < current.length - 1 ? current[index + 1] - gap : this.hbMax();
    const next = clamp(
      this.snap(rawValue),
      Math.max(this.hbMin(), lower),
      Math.min(this.hbMax(), upper),
    );

    if (next !== current[index]) {
      current[index] = next;
      const out = this.toValue(current);
      this.hbValue.set(out);
      this.onChange(out);
      this.hbChange.emit(out);
    }
    if (end) this.hbChangeEnd.emit(this.toValue(current));
  }

  private toValue(values: number[]): HbSliderValue {
    return this.single() ? values[0] : [...values];
  }

  private snap(value: number): number {
    const step = this.hbStep() || 1;
    const min = this.hbMin();
    const snapped = Math.round((value - min) / step) * step + min;
    const decimals = (String(step).split('.')[1] ?? '').length;
    return Number(clamp(snapped, min, this.hbMax()).toFixed(decimals));
  }

  private focusThumb(index: number): void {
    const thumbs = this.hostEl.nativeElement.querySelectorAll<HTMLElement>('[role="slider"]');
    thumbs[index]?.focus();
  }

  protected onThumbFocus(index: number): void {
    this.activeThumb.set(index);
  }
  protected onThumbBlur(): void {
    if (!this.moveCleanup) this.activeThumb.set(null);
  }

  private stopTracking(): void {
    this.moveCleanup?.();
    this.moveCleanup = null;
  }


  writeValue(value: HbSliderValue | null): void {
    this.hbValue.set(value ?? null);
  }
  registerOnChange(fn: (value: HbSliderValue) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
