import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  input,
  model,
  numberAttribute,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn, type ClassValue } from '../../utils';
import {
  INPUT_OTP_CHARS,
  INPUT_OTP_DIGITS,
  INPUT_OTP_DIGITS_AND_CHARS,
  type HbInputOtpPattern,
  type HbInputOtpSize,
  type HbInputOtpStatus,
} from './input-otp.variants';



let inputOtpUid = 0;
@Component({
  selector: 'hb-input-otp',
  template: `
    <ng-content />
    <input
      #native
      class="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none disabled:cursor-not-allowed [&::selection]:bg-transparent"
      autocomplete="one-time-code"
      [id]="hbInputId() || uid"
      [value]="hbValue()"
      [disabled]="isDisabled()"
      [readOnly]="hbReadonly()"
      [attr.maxlength]="hbMaxLength()"
      [attr.inputmode]="inputMode()"
      [attr.name]="hbName() || null"
      [attr.aria-invalid]="hbInvalid() || null"
      [attr.aria-label]="hbAriaLabel() || null"
      (input)="onInput($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
      (keyup)="syncCaret()"
      (pointerup)="syncCaret()"
      (select)="syncCaret()"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => HbInputOtpComponent), multi: true },
  ],
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-slot]': "'input-otp'",
    '[attr.data-disabled]': 'isDisabled() || null',
  },
  exportAs: 'hbInputOtp',
})
export class HbInputOtpComponent implements ControlValueAccessor {
  private readonly native = viewChild.required<ElementRef<HTMLInputElement>>('native');

  protected readonly uid = `hb-input-otp-${++inputOtpUid}`;

  readonly hbMaxLength = input(6, { transform: numberAttribute });
  readonly hbValue = model('');
  readonly hbPattern = input<HbInputOtpPattern>('digits');
  readonly hbSize = input<HbInputOtpSize>('md');
  readonly hbStatus = input<HbInputOtpStatus>('default');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbReadonly = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbRing = input(true, { transform: booleanAttribute });
  readonly hbAutoFocus = input(false, { transform: booleanAttribute });
  readonly hbName = input<string>('');
  readonly hbInputId = input<string>('');
  readonly hbAriaLabel = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<string>();
  readonly hbComplete = output<string>();

  private readonly focused = signal(false);
  private readonly caretStart = signal(0);
  private readonly caretEnd = signal(0);
  private readonly cvaDisabled = signal(false);

  readonly size = this.hbSize;
  readonly ring = this.hbRing;
  readonly status = computed<HbInputOtpStatus>(() =>
    this.hbInvalid() ? 'error' : this.hbStatus(),
  );
  readonly isDisabled = computed(() => this.hbDisabled() || this.cvaDisabled());

  protected readonly inputMode = computed(() => (this.hbPattern() === 'digits' ? 'numeric' : 'text'));
  protected readonly hostClasses = computed(() =>
    cn(
      'relative inline-flex items-center gap-2',
      this.isDisabled() && 'cursor-not-allowed opacity-50',
      this.class(),
    ),
  );

  private readonly perChar = computed<RegExp>(() => {
    const p = this.hbPattern();
    if (p instanceof RegExp) return new RegExp(p.source, p.flags.replace('g', ''));
    if (p === 'chars') return INPUT_OTP_CHARS;
    if (p === 'alphanumeric') return INPUT_OTP_DIGITS_AND_CHARS;
    return INPUT_OTP_DIGITS;
  });

  constructor() {
    afterNextRender(() => {
      if (this.hbAutoFocus() && !this.isDisabled()) this.native().nativeElement.focus();
    });
  }

  charAt(index: number): string {
    return this.hbValue()[index] ?? '';
  }
  isActive(index: number): boolean {
    if (!this.focused()) return false;
    const start = this.caretStart();
    const end = this.caretEnd();
    if (start !== end) return index >= start && index < end;
    return index === this.activeIndex(start);
  }
  showCaret(index: number): boolean {
    if (!this.focused() || this.caretStart() !== this.caretEnd()) return false;
    return index === this.activeIndex(this.caretStart()) && !this.charAt(index);
  }
  private activeIndex(caret: number): number {
    const max = this.hbMaxLength();
    return caret >= max ? max - 1 : caret;
  }

  private sanitize(value: string): string {
    const rx = this.perChar();
    return Array.from(value)
      .filter((c) => rx.test(c))
      .join('')
      .slice(0, this.hbMaxLength());
  }

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    const next = this.sanitize(el.value);
    if (el.value !== next) el.value = next;
    el.setSelectionRange(next.length, next.length);
    this.caretStart.set(next.length);
    this.caretEnd.set(next.length);
    if (next !== this.hbValue()) {
      this.hbValue.set(next);
      this.onChange(next);
      this.hbChange.emit(next);
      if (next.length === this.hbMaxLength()) this.hbComplete.emit(next);
    }
  }
  protected onFocus(): void {
    this.focused.set(true);
    this.syncCaret();
  }
  protected onBlur(): void {
    this.focused.set(false);
    this.onTouched();
  }
  protected syncCaret(): void {
    const el = this.native().nativeElement;
    this.caretStart.set(el.selectionStart ?? 0);
    this.caretEnd.set(el.selectionEnd ?? 0);
  }

  focus(): void {
    this.native().nativeElement.focus();
  }

  protected onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};
  writeValue(value: string): void {
    this.hbValue.set(this.sanitize(value ?? ''));
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
