import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { cn, type ClassValue } from '../../utils';
import { HB_TOGGLE_GROUP, type HbToggleGroupContext, type HbToggleItemRef } from './toggle.token';
import {
  toggleGroupConnectedClass,
  toggleGroupConnectedOutlineClass,
  type HbToggleGroupType,
  type HbToggleSize,
  type HbToggleVariant,
} from './toggle.variants';

@Component({
  selector: 'hb-toggle-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HbToggleGroupComponent),
      multi: true,
    },
    { provide: HB_TOGGLE_GROUP, useExisting: forwardRef(() => HbToggleGroupComponent) },
  ],
  host: {
    role: 'group',
    '[class]': 'classes()',
    '[attr.data-slot]': "'toggle-group'",
    '[attr.aria-label]': 'hbAriaLabel() || null',
  },
  exportAs: 'hbToggleGroup',
})
export class HbToggleGroupComponent implements ControlValueAccessor, HbToggleGroupContext {
  readonly hbType = input<HbToggleGroupType>('single');
  readonly hbValue = model<unknown>(null);
  readonly hbVariant = input<HbToggleVariant>('default');
  readonly hbSize = input<HbToggleSize>('md');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbConnected = input(true, { transform: booleanAttribute });
  readonly hbRollable = input(true, { transform: booleanAttribute });
  readonly hbAriaLabel = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown>();

  private readonly items = signal<HbToggleItemRef[]>([]);
  private readonly cvaDisabled = signal(false);
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  readonly type = this.hbType;
  readonly variant = this.hbVariant;
  readonly size = this.hbSize;
  readonly disabled = computed(() => this.hbDisabled() || this.cvaDisabled());

  protected readonly classes = computed(() =>
    cn(
      'inline-flex items-center',
      this.hbConnected()
        ? cn(
            toggleGroupConnectedClass,
            this.hbVariant() === 'outline' && toggleGroupConnectedOutlineClass,
          )
        : 'gap-1',
      this.class(),
    ),
  );

  private get selectionArray(): unknown[] {
    const v = this.hbValue();
    return Array.isArray(v) ? v : [];
  }

  isSelected(value: unknown): boolean {
    return this.hbType() === 'multiple'
      ? this.selectionArray.includes(value)
      : this.hbValue() === value;
  }
  toggle(value: unknown): void {
    if (this.disabled()) return;
    if (this.hbType() === 'multiple') {
      const current = this.selectionArray;
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      this.commit(next);
    } else {
      const next = this.hbValue() === value ? (this.hbRollable() ? null : value) : value;
      this.commit(next);
    }
  }
  private commit(value: unknown): void {
    this.hbValue.set(value);
    this.onChange(value);
    this.onTouched();
    this.hbChange.emit(value);
  }

  registerItem(item: HbToggleItemRef): void {
    this.items.update((list) => [...list, item]);
  }
  unregisterItem(item: HbToggleItemRef): void {
    this.items.update((list) => list.filter((i) => i !== item));
  }
  private ordered(): HbToggleItemRef[] {
    return [...this.items()].sort((a, b) =>
      a.element().compareDocumentPosition(b.element()) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
  }
  isActiveItem(item: HbToggleItemRef): boolean {
    const enabled = this.ordered().filter((i) => !i.disabled());
    const active = enabled.find((i) => this.isSelected(i.value())) ?? enabled[0];
    return active === item;
  }
  onItemKeydown(item: HbToggleItemRef, event: KeyboardEvent): void {
    const enabled = this.ordered().filter((i) => !i.disabled());
    const i = enabled.indexOf(item);
    if (i < 0) return;
    let target: HbToggleItemRef | undefined;
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        target = enabled[(i + 1) % enabled.length];
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        target = enabled[(i - 1 + enabled.length) % enabled.length];
        break;
      case 'Home':
        target = enabled[0];
        break;
      case 'End':
        target = enabled[enabled.length - 1];
        break;
      default:
        return;
    }
    if (!target) return;
    event.preventDefault();
    target.element().focus();
  }
  markTouched(): void {
    this.onTouched();
  }

  writeValue(value: unknown): void {
    this.hbValue.set(value ?? (this.hbType() === 'multiple' ? [] : null));
  }
  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.cvaDisabled.set(isDisabled);
  }
}
