import { NgTemplateOutlet } from '@angular/common';
import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  numberAttribute,
  output,
  signal,
  TemplateRef,
  ViewContainerRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretDown,
  phosphorCheck,
  phosphorSpinnerGap,
  phosphorX,
} from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import {
  selectContentVariants,
  selectItemVariants,
  selectLabelVariants,
  selectSeparatorVariants,
  selectIndicatorVariants,
  selectScrollButtonVariants,
  selectViewportVariants,
} from '../select';
import {
  comboboxTriggerVariants,
  type HbComboboxSize,
  type HbComboboxStatus,
} from './combobox.variants';
import { HbComboboxItemComponent } from './combobox-item.component';
import { HB_COMBOBOX, type HbComboboxContext, type HbComboboxItemRef } from './combobox.token';



let comboboxUid = 0;
export interface HbComboboxOption {
  value: unknown;
  label: string;
  disabled?: boolean;
}
interface HbComboboxEntry {
  id: string;
  value: unknown;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'hb-combobox',
  imports: [NgIcon, NgTemplateOutlet, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf],
  viewProviders: [
    provideIcons({ phosphorCaretDown, phosphorX, phosphorCheck, phosphorSpinnerGap }),
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: HbComboboxComponent, multi: true },
    { provide: HB_COMBOBOX, useExisting: HbComboboxComponent },
  ],
  template: `
    <div
      [class]="triggerClasses()"
      [attr.aria-invalid]="hbInvalid() || null"
      (mousedown)="onContainerMousedown($event)"
    >
      @if (hbMultiple()) {
        @for (chip of selectedChips(); track $index) {
          <span
            class="inline-flex max-w-[10rem] shrink-0 items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
          >
            <span class="truncate">{{ chip.label }}</span>
            <ng-icon
              name="phosphorX"
              class="size-3 shrink-0 opacity-60 hover:opacity-100"
              role="button"
              (mousedown)="removeChip(chip.value, $event)"
            />
          </span>
        }
        @if (overflowCount() > 0) {
          <span class="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            +{{ overflowCount() }}
          </span>
        }
      }
      <input
        #input
        type="text"
        role="combobox"
        aria-autocomplete="list"
        [class]="'min-w-[3rem] flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed'"
        [value]="text()"
        [placeholder]="isEmpty() || hbMultiple() ? hbPlaceholder() : ''"
        [readonly]="hbReadonly()"
        [disabled]="isDisabled()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-activedescendant]="activeEntry()?.id ?? null"
        [attr.aria-required]="hbRequired() || null"
        (input)="onInput($event)"
        (focus)="onFocus()"
        (blur)="onBlur($event)"
        (keydown)="onKeydown($event)"
      />
      @if (hbLoading()) {
        <ng-icon name="phosphorSpinnerGap" class="size-4 shrink-0 animate-spin text-muted-foreground" />
      } @else {
        @if (hbClearable() && !isEmpty() && !hbReadonly()) {
          <ng-icon
            name="phosphorX"
            class="size-4 shrink-0 opacity-60 hover:opacity-100"
            role="button"
            aria-label="Clear"
            (mousedown)="clear($event)"
          />
        }
        @if (hbDropdown()) {
          <ng-icon
            name="phosphorCaretDown"
            class="size-4 shrink-0 opacity-50"
            role="button"
            aria-label="Toggle"
            (mousedown)="onDropdownMousedown($event)"
          />
        }
      }
    </div>

    <ng-template #optionRow let-e>
      <div
        role="option"
        [id]="e.id"
        [class]="rowClasses(e.disabled)"
        [attr.aria-selected]="isSelected(e.value)"
        [attr.aria-disabled]="e.disabled || null"
        [attr.data-active]="activeEntry()?.id === e.id || null"
        (click)="e.disabled || selectValue(e.value)"
        (mouseenter)="e.disabled || setActiveEntry(e)"
      >
        @if (hbMultiple()) {
          <span [class]="checkboxClasses(isSelected(e.value))">
            @if (isSelected(e.value)) {
              <ng-icon name="phosphorCheck" class="size-3" />
            }
          </span>
        } @else {
          <span [class]="indicatorClasses">
            @if (isSelected(e.value)) {
              <ng-icon name="phosphorCheck" />
            }
          </span>
        }
        <span class="line-clamp-1">{{ e.label }}</span>
      </div>
    </ng-template>

    <ng-template #panel>
      <div
        [class]="contentClasses()"
        [style.--hb-select-trigger-width.px]="triggerWidth()"
        role="listbox"
        [attr.aria-multiselectable]="hbMultiple() || null"
        (mousedown)="$event.preventDefault()"
      >
        @if (hbLoading()) {
          <div class="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <ng-icon name="phosphorSpinnerGap" class="size-4 animate-spin" />
            {{ hbLoadingText() }}
          </div>
        } @else {
          @if (canScrollUp()) {
            <div [class]="scrollButtonClasses" (click)="scrollByStep(-1)">
              <ng-icon name="phosphorCaretDown" class="size-4 rotate-180" />
            </div>
          }
          @if (isDataMode() && hbVirtualScroll()) {
            <cdk-virtual-scroll-viewport
              [itemSize]="hbVirtualItemSize()"
              [style.height.px]="hbVirtualHeight()"
              class="w-full"
            >
              <ng-container
                *cdkVirtualFor="let e of visibleEntries(); trackBy: trackEntry"
                [ngTemplateOutlet]="optionRow"
                [ngTemplateOutletContext]="{ $implicit: e }"
              />
            </cdk-virtual-scroll-viewport>
          } @else {
            <div #viewport data-viewport [class]="viewportClasses" (scroll)="updateScroll()">
              @if (isDataMode()) {
                @for (e of visibleEntries(); track e.id) {
                  <ng-container [ngTemplateOutlet]="optionRow" [ngTemplateOutletContext]="{ $implicit: e }" />
                }
              } @else {
                <ng-content />
              }
              @if (showCreate()) {
                <div [class]="rowClasses(false)" (click)="commitCustom()">
                  <span class="text-muted-foreground">Create</span>
                  <span class="font-medium">“{{ text() }}”</span>
                </div>
              }
              @if (emptyMessage(); as msg) {
                <div class="py-6 text-center text-sm text-muted-foreground">{{ msg }}</div>
              }
            </div>
          }
          @if (canScrollDown()) {
            <div [class]="scrollButtonClasses" (click)="scrollByStep(1)">
              <ng-icon name="phosphorCaretDown" class="size-4" />
            </div>
          }
        }
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'combobox'" },
  exportAs: 'hbCombobox',
})
export class HbComboboxComponent implements ControlValueAccessor, HbComboboxContext {
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly instanceId = `hb-combobox-${++comboboxUid}`;

  readonly hbValue = model<unknown>(null);
  readonly hbMultiple = input(false, { transform: booleanAttribute });
  readonly hbPlaceholder = input('Search…');
  readonly hbCompareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);
  readonly hbOptions = input<HbComboboxOption[]>([]);
  readonly hbFilterMatchMode = input<'contains' | 'startsWith' | 'equals'>('contains');
  readonly hbAllowCustom = input(false, { transform: booleanAttribute });
  readonly hbForceSelection = input(false, { transform: booleanAttribute });
  readonly hbUnique = input(true, { transform: booleanAttribute });
  readonly hbSelectionLimit = input(0, { transform: numberAttribute });
  readonly hbMaxChips = input(2, { transform: numberAttribute });
  readonly hbMinLength = input(0, { transform: numberAttribute });
  readonly hbDebounce = input(0, { transform: numberAttribute });
  readonly hbOpenOnFocus = input(true, { transform: booleanAttribute });
  readonly hbDropdown = input(false, { transform: booleanAttribute });
  readonly hbAutoHighlight = input(true, { transform: booleanAttribute });
  readonly hbVirtualScroll = input(false, { transform: booleanAttribute });
  readonly hbVirtualItemSize = input(36, { transform: numberAttribute });
  readonly hbVirtualHeight = input(280, { transform: numberAttribute });
  readonly hbLoading = input(false, { transform: booleanAttribute });
  readonly hbLoadingText = input('Loading…');
  readonly hbEmptyMessage = input('No results.');
  readonly hbSize = input<HbComboboxSize>('md');
  readonly hbStatus = input<HbComboboxStatus>('default');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbReadonly = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbRequired = input(false, { transform: booleanAttribute });
  readonly hbBorderless = input(false, { transform: booleanAttribute });
  readonly hbRing = input(true, { transform: booleanAttribute });
  readonly hbFluid = input(false, { transform: booleanAttribute });
  readonly hbClearable = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown>();
  readonly hbOpenChange = output<boolean>();
  readonly hbSearch = output<string>();

  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  protected readonly items = contentChildren(HbComboboxItemComponent, { descendants: true });

  protected readonly text = signal('');
  private readonly query = signal('');
  protected readonly isOpen = signal(false);
  protected readonly triggerWidth = signal(0);
  readonly activeEntry = signal<HbComboboxEntry | null>(null);
  private overlayRef: OverlayRef | null = null;
  private viewportEl: HTMLElement | null = null;
  private readonly cvaDisabled = signal(false);
  protected readonly canScrollUp = signal(false);
  protected readonly canScrollDown = signal(false);
  private debounceTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly labels = signal<{ value: unknown; label: string }[]>([]);

  protected readonly viewportClasses = selectViewportVariants();
  protected readonly indicatorClasses = selectIndicatorVariants();
  protected readonly scrollButtonClasses = selectScrollButtonVariants();

  protected readonly isDataMode = computed(() => this.hbOptions().length > 0);
  protected readonly isDisabled = computed(() => this.hbDisabled() || this.cvaDisabled());

  private readonly allEntries = computed<HbComboboxEntry[]>(() => {
    const options = this.hbOptions();
    if (options.length) {
      return options.map((o, i) => ({
        id: `${this.instanceId}-opt-${i}`,
        value: o.value,
        label: o.label,
        disabled: !!o.disabled,
      }));
    }
    return this.items().map((it) => ({
      id: it.optionId,
      value: it.hbValue(),
      label: it.label(),
      disabled: it.hbDisabled(),
    }));
  });
  protected readonly visibleEntries = computed(() =>
    this.allEntries().filter((e) => this.matchesFilter(e.label)),
  );
  private readonly enabledEntries = computed(() =>
    this.visibleEntries().filter((e) => !e.disabled),
  );

  protected readonly selectedValues = computed<unknown[]>(() => {
    const value = this.hbValue();
    if (this.hbMultiple()) return Array.isArray(value) ? value : [];
    return value === null || value === undefined ? [] : [value];
  });
  protected readonly isEmpty = computed(() => this.selectedValues().length === 0);
  private labelFor(value: unknown): string {
    const compare = this.hbCompareWith();
    const option = this.hbOptions().find((o) => compare(o.value, value));
    if (option) return option.label;
    return this.labels().find((e) => compare(e.value, value))?.label ?? String(value);
  }
  protected readonly selectedChips = computed(() => {
    const max = this.hbMaxChips();
    const chips = this.selectedValues().map((v) => ({ value: v, label: this.labelFor(v) }));
    return max > 0 ? chips.slice(0, max) : chips;
  });
  protected readonly overflowCount = computed(() => {
    const max = this.hbMaxChips();
    return max > 0 ? Math.max(0, this.selectedValues().length - max) : 0;
  });
  protected readonly emptyMessage = computed<string | null>(() => {
    if (this.hbLoading() || this.visibleEntries().length > 0 || this.showCreate()) return null;
    return this.hbEmptyMessage();
  });
  protected readonly showCreate = computed(() => {
    const t = this.text().trim();
    if (!this.hbAllowCustom() || this.hbForceSelection() || !t) return false;
    const compare = this.hbCompareWith();
    const known =
      this.allEntries().some((e) => e.label.toLowerCase() === t.toLowerCase()) ||
      this.selectedValues().some((v) => compare(v, t));
    return !known;
  });

  protected readonly triggerClasses = computed(() =>
    cn(
      comboboxTriggerVariants({
        size: this.hbSize(),
        status: this.hbStatus(),
        borderless: this.hbBorderless(),
        ring: this.hbRing(),
        fluid: this.hbFluid(),
      }),
      this.class(),
    ),
  );
  protected readonly hostClasses = computed(() => (this.hbFluid() ? 'block w-full' : 'inline-block'));
  protected readonly contentClasses = computed(() => cn(selectContentVariants()));
  protected checkboxClasses(on: boolean): string {
    return cn(
      'absolute left-2 flex size-4 items-center justify-center rounded-[4px] border border-input',
      on ? 'border-primary bg-primary text-primary-foreground' : '',
    );
  }
  protected rowClasses(disabled: boolean): string {
    return cn(
      selectItemVariants(),
      this.hbMultiple() ? 'pl-8 pr-2' : 'pr-8',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      disabled ? 'pointer-events-none opacity-50' : '',
    );
  }
  protected trackEntry = (_: number, e: HbComboboxEntry): string => e.id;

  filterText(): string {
    return this.query();
  }
  matchesFilter(label: string): boolean {
    const filter = this.query().trim().toLowerCase();
    if (!filter) return true;
    const value = label.toLowerCase();
    switch (this.hbFilterMatchMode()) {
      case 'startsWith':
        return value.startsWith(filter);
      case 'equals':
        return value === filter;
      default:
        return value.includes(filter);
    }
  }
  isSelected(value: unknown): boolean {
    const compare = this.hbCompareWith();
    return this.selectedValues().some((v) => compare(v, value));
  }
  reportLabel(value: unknown, label: string): void {
    const compare = this.hbCompareWith();
    this.labels.update((list) => [...list.filter((e) => !compare(e.value, value)), { value, label }]);
  }
  activeEntryFor(item: HbComboboxItemRef): boolean {
    return this.activeEntry()?.id === item.optionId;
  }
  setActiveEntry(entry: HbComboboxEntry): void {
    this.activeEntry.set(entry);
  }
  setActiveByItem(item: HbComboboxItemRef): void {
    this.activeEntry.set(this.allEntries().find((e) => e.id === item.optionId) ?? null);
  }

  protected onContainerMousedown(event: MouseEvent): void {
    if ((event.target as HTMLElement).closest('[role="button"]')) return;
    if (event.target !== this.input().nativeElement) {
      event.preventDefault();
      this.input().nativeElement.focus();
      this.open();
    }
  }
  protected onFocus(): void {
    if (this.hbOpenOnFocus() && !this.isDisabled() && !this.hbReadonly()) this.open();
    this.input().nativeElement.select();
  }
  protected onDropdownMousedown(event: MouseEvent): void {
    event.preventDefault();
    if (this.isOpen()) {
      this.close();
    } else {
      this.query.set('');
      this.input().nativeElement.focus();
      this.open();
    }
  }

  open(): void {
    if (this.overlayRef || this.isDisabled() || this.hbReadonly()) return;
    const container = this.input().nativeElement.closest('[data-slot="combobox"] > div') as HTMLElement;
    const anchor = container ?? this.input().nativeElement;
    this.triggerWidth.set(anchor.offsetWidth);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(anchor)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      ])
      .withPush(true);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.overlayRef.attach(new TemplatePortal(this.panel(), this.vcr));
    this.isOpen.set(true);
    this.hbOpenChange.emit(true);
    this.highlightFirst();
    afterNextRender(
      () => {
        this.viewportEl = (this.overlayRef?.overlayElement.querySelector('[data-viewport]') as HTMLElement) ?? null;
        this.updateScroll();
      },
      { injector: this.injector },
    );
  }
  close(): void {
    if (!this.overlayRef) return;
    this.overlayRef.dispose();
    this.overlayRef = null;
    this.viewportEl = null;
    this.isOpen.set(false);
    this.hbOpenChange.emit(false);
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.text.set(value);
    if (!this.isOpen()) this.open();
    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    const delay = this.hbDebounce();
    if (delay > 0) {
      this.debounceTimer = setTimeout(() => this.applyQuery(value), delay);
    } else {
      this.applyQuery(value);
    }
  }
  private applyQuery(value: string): void {
    if (value.length >= this.hbMinLength()) {
      this.query.set(value);
      this.hbSearch.emit(value);
    } else {
      this.query.set('');
    }
    this.highlightFirst();
    afterNextRender(() => this.updateScroll(), { injector: this.injector });
  }
  private highlightFirst(): void {
    if (!this.hbAutoHighlight()) return;
    const selected = this.enabledEntries().find((e) => this.isSelected(e.value));
    this.activeEntry.set(selected ?? this.enabledEntries()[0] ?? null);
  }

  selectValue(value: unknown): void {
    if (this.hbMultiple()) {
      this.addValue(value);
      this.text.set('');
      this.query.set('');
      this.highlightFirst();
      this.input().nativeElement.focus();
    } else {
      this.commit(value);
      this.text.set(this.labelFor(value));
      this.query.set('');
      this.close();
    }
  }
  private addValue(value: unknown): void {
    const compare = this.hbCompareWith();
    const current = this.selectedValues();
    if (this.hbUnique() && current.some((v) => compare(v, value))) return;
    const limit = this.hbSelectionLimit();
    if (limit > 0 && current.length >= limit) return;
    this.commit([...current, value]);
  }
  protected commitCustom(): void {
    const t = this.text().trim();
    if (!t || !this.hbAllowCustom() || this.hbForceSelection()) return;
    this.selectValue(t);
  }
  protected removeChip(value: unknown, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const compare = this.hbCompareWith();
    this.commit(this.selectedValues().filter((v) => !compare(v, value)));
    this.input().nativeElement.focus();
  }
  private commit(next: unknown): void {
    this.hbValue.set(next);
    this.onChange(next);
    this.hbChange.emit(next);
  }
  protected clear(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.commit(this.hbMultiple() ? [] : null);
    this.text.set('');
    this.query.set('');
    this.input().nativeElement.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        if (!this.isOpen()) this.open();
        else this.moveActive(1);
        break;
      case 'ArrowUp':
        if (this.isOpen()) this.moveActive(-1);
        break;
      case 'Enter': {
        const active = this.activeEntry();
        if (active && !active.disabled) this.selectValue(active.value);
        else if (this.hbAllowCustom()) this.commitCustom();
        else return;
        break;
      }
      case 'Escape':
        this.close();
        this.finalize();
        break;
      case 'Backspace':
        if (this.hbMultiple() && !this.text() && this.selectedValues().length) {
          const last = this.selectedValues()[this.selectedValues().length - 1];
          this.removeChip(last, event);
        }
        return;
      case 'Tab':
        if (this.hbAllowCustom() && this.text().trim()) this.commitCustom();
        this.close();
        return;
      default:
        return;
    }
    event.preventDefault();
  }
  protected onBlur(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (next && this.overlayRef?.overlayElement.contains(next)) return;
    this.finalize();
    this.close();
  }
  private finalize(): void {
    const t = this.text().trim();
    if (this.hbMultiple()) {
      if (this.hbAllowCustom() && t) this.selectValue(t);
      this.text.set('');
      this.query.set('');
      return;
    }
    if (!this.selectedValues().length) {
      if (this.hbAllowCustom() && t && !this.hbForceSelection()) {
        this.commit(t);
        this.text.set(t);
      } else {
        this.text.set('');
      }
    } else {
      this.text.set(this.labelFor(this.selectedValues()[0]));
    }
    this.query.set('');
  }

  private moveActive(delta: number): void {
    const enabled = this.enabledEntries();
    if (!enabled.length) return;
    const current = this.activeEntry();
    const idx = current ? enabled.findIndex((e) => e.id === current.id) : -1;
    const nextIdx = Math.max(0, Math.min(enabled.length - 1, idx + delta));
    const next = enabled[nextIdx];
    this.activeEntry.set(next);
    const el = this.overlayRef?.overlayElement.querySelector(`#${next.id}`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
    this.updateScroll();
  }
  protected updateScroll(): void {
    const el = this.viewportEl;
    if (!el) {
      this.canScrollUp.set(false);
      this.canScrollDown.set(false);
      return;
    }
    this.canScrollUp.set(el.scrollTop > 1);
    this.canScrollDown.set(el.scrollTop < el.scrollHeight - el.clientHeight - 1);
  }
  protected scrollByStep(dir: number): void {
    const el = this.viewportEl;
    if (!el) return;
    el.scrollBy({ top: dir * el.clientHeight * 0.7, behavior: 'smooth' });
    setTimeout(() => this.updateScroll(), 120);
  }

  protected onChange: (value: unknown) => void = () => {};
  protected onTouched: () => void = () => {};
  writeValue(value: unknown): void {
    this.hbValue.set(value);
    if (!this.hbMultiple()) {
      this.text.set(value === null || value === undefined ? '' : this.labelFor(value));
    }
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

  constructor() {
    effect(() => {
      if (this.hbMultiple() || this.isOpen()) return;
      const values = this.selectedValues();
      this.text.set(values.length ? this.labelFor(values[0]) : '');
    });
  }
}
