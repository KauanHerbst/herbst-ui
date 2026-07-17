import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  type ElementRef,
  forwardRef,
  input,
  model,
  signal,
  ViewEncapsulation,
  viewChildren,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';

import { cn, type ClassValue } from '../../utils';
import { HbSegmentedItemComponent } from './segmented-item.component';
import {
  segmentedItemVariants,
  segmentedVariants,
  type HbSegmentedSize,
} from './segmented.variants';

export interface HbSegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'hb-segmented',
  imports: [NgIcon],
  template: `
    <div
      [class]="trackClasses()"
      role="radiogroup"
      [attr.aria-label]="hbAriaLabel() || null"
      (keydown)="onKeydown($event)"
    >
      @for (opt of options(); track opt.value) {
        <button
          #optBtn
          type="button"
          role="radio"
          [class]="itemClasses(opt)"
          [disabled]="opt.disabled || disabledState()"
          [attr.aria-checked]="isSelected(opt.value)"
          [attr.aria-label]="opt.label"
          [attr.tabindex]="isSelected(opt.value) ? 0 : -1"
          (click)="selectOption(opt.value)"
        >
          @if (opt.icon) {
            <ng-icon [name]="opt.icon" />
          }
          @if (opt.label) {
            <span>{{ opt.label }}</span>
          }
        </button>
      }
    </div>
  `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbSegmentedComponent), multi: true },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'segmented'" },
  exportAs: 'hbSegmented',
})
export class HbSegmentedComponent implements ControlValueAccessor {
  readonly hbOptions = input<HbSegmentedOption[]>([]);
  readonly hbValue = model<string>('');
  readonly hbSize = input<HbSegmentedSize>('md');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbFluid = input(false, { transform: booleanAttribute });
  readonly hbAriaLabel = input<string>('');
  readonly class = input<ClassValue>('');

  private readonly items = contentChildren(HbSegmentedItemComponent);
  private readonly optionButtons = viewChildren<ElementRef<HTMLButtonElement>>('optBtn');

  private readonly cvaDisabled = signal(false);
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly options = computed<HbSegmentedOption[]>(() => {
    const data = this.hbOptions();
    if (data.length) return data;
    return this.items().map((item) => ({
      value: item.value(),
      label: item.label(),
      disabled: item.hbDisabled(),
      icon: item.hbIcon() || undefined,
    }));
  });

  protected readonly activeValue = computed(() => {
    const value = this.hbValue();
    const opts = this.options();
    if (value && opts.some((o) => o.value === value)) return value;
    return opts.find((o) => !o.disabled)?.value ?? '';
  });

  protected readonly disabledState = computed(() => this.hbDisabled() || this.cvaDisabled());

  protected readonly hostClasses = computed(() =>
    cn('inline-block', this.hbFluid() && 'block w-full'),
  );
  protected readonly trackClasses = computed(() =>
    cn(segmentedVariants({ size: this.hbSize() }), this.hbFluid() && 'flex w-full', this.class()),
  );

  protected isSelected(value: string): boolean {
    return this.activeValue() === value;
  }

  protected itemClasses(opt: HbSegmentedOption): string {
    return cn(
      segmentedItemVariants({ size: this.hbSize(), active: this.isSelected(opt.value) }),
      this.hbFluid() && 'flex-1',
    );
  }

  protected selectOption(value: string): void {
    if (this.disabledState()) return;
    const opt = this.options().find((o) => o.value === value);
    if (!opt || opt.disabled || value === this.hbValue()) return;
    this.hbValue.set(value);
    this.onChange(value);
    this.onTouched();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.disabledState()) return;
    const opts = this.options();
    const enabled = opts.map((o, i) => ({ o, i })).filter((x) => !x.o.disabled);
    if (!enabled.length) return;

    const currentPos = Math.max(
      0,
      enabled.findIndex((x) => x.o.value === this.activeValue()),
    );
    let targetPos = currentPos;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        targetPos = (currentPos + 1) % enabled.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        targetPos = (currentPos - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        targetPos = 0;
        break;
      case 'End':
        targetPos = enabled.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    const target = enabled[targetPos];
    this.selectOption(target.o.value);
    this.optionButtons()[target.i]?.nativeElement.focus();
  }

  writeValue(value: string): void {
    this.hbValue.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
