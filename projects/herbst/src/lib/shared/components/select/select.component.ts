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
  contentChild,
  contentChildren,
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
  phosphorCaretUp,
  phosphorCheck,
  phosphorMagnifyingGlass,
  phosphorSpinnerGap,
  phosphorX,
} from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbSelectItemComponent } from './select-item.component';
import { HbSelectValueDirective } from './select-value.directive';
import { HB_SELECT, type HbSelectContext, type HbSelectItemRef } from './select.token';
import {
  selectContentVariants,
  selectItemVariants,
  selectIndicatorVariants,
  selectScrollButtonVariants,
  selectTriggerVariants,
  selectViewportVariants,
  type HbSelectSize,
  type HbSelectStatus,
} from './select.variants';



let selectUid = 0;
export interface HbSelectOption {
  value: unknown;
  label: string;
  disabled?: boolean;
}
interface HbSelectEntry {
  id: string;
  value: unknown;
  label: string;
  disabled: boolean;
}

@Component({
  selector: 'hb-select',
  imports: [NgIcon, NgTemplateOutlet, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf],
  viewProviders: [
    provideIcons({
      phosphorCaretDown,
      phosphorCaretUp,
      phosphorX,
      phosphorMagnifyingGlass,
      phosphorCheck,
      phosphorSpinnerGap,
    }),
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: HbSelectComponent, multi: true },
    { provide: HB_SELECT, useExisting: HbSelectComponent },
  ],
  template: `
    <button
      #trigger
      type="button"
      [class]="triggerClasses()"
      [disabled]="isDisabled()"
      [attr.data-placeholder]="isEmpty() || null"
      [attr.aria-invalid]="hbInvalid() || null"
      [attr.aria-required]="hbRequired() || null"
      [attr.aria-expanded]="isOpen()"
      aria-haspopup="listbox"
      (click)="toggle()"
      (keydown)="onTriggerKeydown($event)"
      (blur)="onTouched()"
    >
      <span class="flex min-w-0 flex-1 flex-nowrap items-center gap-1 overflow-hidden text-left">
        @if (isEmpty()) {
          {{ hbPlaceholder() }}
        } @else if (valueTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="valueContext()" />
        } @else if (hbMultiple() && hbDisplay() === 'chip') {
          @for (chip of visibleChips(); track $index) {
            <span
              class="inline-flex max-w-[9rem] shrink-0 items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-xs text-secondary-foreground"
            >
              <span class="truncate">{{ chip.label }}</span>
              <ng-icon
                [name]="hbClearIcon()"
                class="size-3 shrink-0 opacity-60 hover:opacity-100"
                role="button"
                (click)="removeChip(chip.value, $event)"
              />
            </span>
          }
          @if (overflowCount() > 0) {
            <span class="shrink-0 rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
              +{{ overflowCount() }}
            </span>
          }
        } @else {
          <span class="line-clamp-1">{{ displayLabel() }}</span>
        }
      </span>
      @if (hbLoading()) {
        <ng-icon name="phosphorSpinnerGap" class="size-4 animate-spin text-muted-foreground" />
      } @else {
        @if (hbClearable() && !isEmpty() && !hbReadonly()) {
          <ng-icon
            [name]="hbClearIcon()"
            class="size-4 opacity-60 hover:opacity-100"
            role="button"
            aria-label="Clear"
            (click)="clear($event)"
          />
        }
        <ng-icon [name]="hbDropdownIcon()" class="size-4 opacity-50" />
      }
    </button>

    <ng-template #optionRow let-e>
      <div
        role="option"
        [id]="e.id"
        [class]="rowClasses(e.disabled)"
        [attr.aria-selected]="isSelected(e.value)"
        [attr.aria-disabled]="e.disabled || null"
        [attr.data-active]="activeEntry()?.id === e.id || null"
        [attr.data-disabled]="e.disabled || null"
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
        [attr.aria-activedescendant]="activeEntry()?.id ?? null"
        (keydown)="onPanelKeydown($event)"
      >
        @if (hbFilter()) {
          <div class="flex items-center gap-2 border-b border-border px-2 pb-1.5">
            <ng-icon name="phosphorMagnifyingGlass" class="size-4 shrink-0 text-muted-foreground" />
            <input
              #filter
              type="text"
              class="h-7 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              [placeholder]="hbFilterPlaceholder()"
              [attr.aria-activedescendant]="activeEntry()?.id ?? null"
              (input)="onFilterInput($event)"
              (keydown)="onPanelKeydown($event)"
            />
          </div>
        }
        @if (hbMultiple() && hbSelectAll() && !hbLoading()) {
          <div
            role="option"
            [class]="selectAllClasses"
            [attr.aria-selected]="allSelected()"
            (click)="toggleAll()"
          >
            <span [class]="checkboxClasses(allSelected() || someSelected())">
              @if (allSelected()) {
                <ng-icon name="phosphorCheck" class="size-3" />
              } @else if (someSelected()) {
                <span class="h-0.5 w-2 rounded bg-primary-foreground"></span>
              }
            </span>
            Select all
          </div>
        }

        @if (hbLoading()) {
          <div class="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
            <ng-icon name="phosphorSpinnerGap" class="size-4 animate-spin" />
            {{ hbLoadingText() }}
          </div>
        } @else {
          @if (canScrollUp()) {
            <div [class]="scrollButtonClasses" (click)="scrollByStep(-1)">
              <ng-icon name="phosphorCaretUp" class="size-4" />
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
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'select'" },
  exportAs: 'hbSelect',
})
export class HbSelectComponent implements ControlValueAccessor, HbSelectContext {
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private readonly injector = inject(Injector);
  private readonly instanceId = `hb-select-${++selectUid}`;

  readonly hbValue = model<unknown>(null);
  readonly hbMultiple = input(false, { transform: booleanAttribute });
  readonly hbDisplay = input<'chip' | 'comma'>('chip');
  readonly hbMaxChips = input(2, { transform: numberAttribute });
  readonly hbSelectAll = input(false, { transform: booleanAttribute });
  readonly hbSelectionLimit = input(0, { transform: numberAttribute });
  readonly hbFilter = input(false, { transform: booleanAttribute });
  readonly hbFilterPlaceholder = input('Search...');
  readonly hbFilterMatchMode = input<'contains' | 'startsWith' | 'equals'>('contains');
  readonly hbEmptyMessage = input('No results.');
  readonly hbEmptyOptionsMessage = input('No options.');
  readonly hbPlaceholder = input('Select...');
  readonly hbCompareWith = input<(a: unknown, b: unknown) => boolean>((a, b) => a === b);
  readonly hbOptions = input<HbSelectOption[]>([]);
  readonly hbVirtualScroll = input(false, { transform: booleanAttribute });
  readonly hbVirtualItemSize = input(36, { transform: numberAttribute });
  readonly hbVirtualHeight = input(280, { transform: numberAttribute });
  readonly hbLoading = input(false, { transform: booleanAttribute });
  readonly hbLoadingText = input('Loading…');
  readonly hbSize = input<HbSelectSize>('md');
  readonly hbStatus = input<HbSelectStatus>('default');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbReadonly = input(false, { transform: booleanAttribute });
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbRequired = input(false, { transform: booleanAttribute });
  readonly hbBorderless = input(false, { transform: booleanAttribute });
  readonly hbRing = input(true, { transform: booleanAttribute });
  readonly hbFluid = input(false, { transform: booleanAttribute });
  readonly hbClearable = input(false, { transform: booleanAttribute });
  readonly hbDropdownIcon = input('phosphorCaretDown');
  readonly hbClearIcon = input('phosphorX');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown>();
  readonly hbOpenChange = output<boolean>();

  private readonly trigger = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  protected readonly items = contentChildren(HbSelectItemComponent, { descendants: true });
  protected readonly valueTpl = contentChild(HbSelectValueDirective, { read: TemplateRef });

  readonly filterText = signal('');
  protected readonly isOpen = signal(false);
  protected readonly triggerWidth = signal(0);
  readonly activeEntry = signal<HbSelectEntry | null>(null);
  private overlayRef: OverlayRef | null = null;
  private viewportEl: HTMLElement | null = null;
  private readonly cvaDisabled = signal(false);
  protected readonly canScrollUp = signal(false);
  protected readonly canScrollDown = signal(false);
  private typeaheadBuffer = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly labels = signal<{ value: unknown; label: string }[]>([]);

  protected readonly viewportClasses = selectViewportVariants();
  protected readonly indicatorClasses = selectIndicatorVariants();
  protected readonly scrollButtonClasses = selectScrollButtonVariants();
  protected readonly selectAllClasses = cn(
    selectItemVariants(),
    'pl-8 pr-2 font-medium data-[active=true]:bg-accent',
  );

  protected readonly isDataMode = computed(() => this.hbOptions().length > 0);
  protected readonly isDisabled = computed(() => this.hbDisabled() || this.cvaDisabled());

  private readonly allEntries = computed<HbSelectEntry[]>(() => {
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
  protected readonly displayLabel = computed(() =>
    this.selectedValues().map((v) => this.labelFor(v)).join(', '),
  );
  protected readonly selectedChips = computed(() =>
    this.selectedValues().map((v) => ({ value: v, label: this.labelFor(v) })),
  );
  protected readonly visibleChips = computed(() => {
    const max = this.hbMaxChips();
    const chips = this.selectedChips();
    return max > 0 ? chips.slice(0, max) : chips;
  });
  protected readonly overflowCount = computed(() => {
    const max = this.hbMaxChips();
    return max > 0 ? Math.max(0, this.selectedChips().length - max) : 0;
  });
  protected readonly valueContext = computed(() => ({
    $implicit: this.hbMultiple() ? this.selectedValues() : this.selectedValues()[0],
    label: this.displayLabel(),
    values: this.selectedValues(),
    chips: this.selectedChips(),
    multiple: this.hbMultiple(),
  }));
  protected readonly emptyMessage = computed<string | null>(() => {
    if (this.hbLoading() || this.visibleEntries().length > 0) return null;
    return this.filterText() && this.allEntries().length > 0
      ? this.hbEmptyMessage()
      : this.hbEmptyOptionsMessage();
  });
  protected readonly allSelected = computed(() => {
    const enabled = this.enabledEntries();
    return enabled.length > 0 && enabled.every((e) => this.isSelected(e.value));
  });
  protected readonly someSelected = computed(
    () => this.selectedValues().length > 0 && !this.allSelected(),
  );

  protected readonly triggerClasses = computed(() =>
    cn(
      selectTriggerVariants({
        size: this.hbSize(),
        status: this.hbStatus(),
        borderless: this.hbBorderless(),
        ring: this.hbRing(),
        fluid: this.hbFluid(),
      }),
      this.hbReadonly() ? 'cursor-default' : '',
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
  protected trackEntry = (_: number, e: HbSelectEntry): string => e.id;

  matchesFilter(label: string): boolean {
    const filter = this.filterText().trim().toLowerCase();
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
  activeEntryFor(item: HbSelectItemRef): boolean {
    return this.activeEntry()?.id === item.optionId;
  }
  setActiveEntry(entry: HbSelectEntry): void {
    this.activeEntry.set(entry);
  }
  setActiveByItem(item: HbSelectItemRef): void {
    this.activeEntry.set(this.allEntries().find((e) => e.id === item.optionId) ?? null);
  }

  protected toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }
  open(): void {
    if (this.overlayRef || this.isDisabled() || this.hbReadonly()) return;
    const triggerEl = this.trigger().nativeElement;
    this.triggerWidth.set(triggerEl.offsetWidth);
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerEl)
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
      ])
      .withPush(true);
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.overlayRef.attach(new TemplatePortal(this.panel(), this.vcr));
    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.isOpen.set(true);
    this.hbOpenChange.emit(true);
    const selected = this.enabledEntries().find((e) => this.isSelected(e.value));
    this.activeEntry.set(selected ?? this.enabledEntries()[0] ?? null);
    afterNextRender(
      () => {
        const el = this.overlayRef?.overlayElement;
        this.viewportEl = (el?.querySelector('[data-viewport]') as HTMLElement) ?? null;
        this.updateScroll();
        const focusTarget = (el?.querySelector('input') ??
          el?.querySelector('[role="listbox"]')) as HTMLElement | null;
        focusTarget?.focus();
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
    this.filterText.set('');
    this.hbOpenChange.emit(false);
    this.onTouched();
    this.trigger().nativeElement.focus();
  }

  selectValue(value: unknown): void {
    if (this.hbMultiple()) {
      const compare = this.hbCompareWith();
      const current = this.selectedValues();
      const exists = current.some((v) => compare(v, value));
      if (exists) {
        this.commit(current.filter((v) => !compare(v, value)));
      } else {
        const limit = this.hbSelectionLimit();
        if (limit > 0 && current.length >= limit) return;
        this.commit([...current, value]);
      }
    } else {
      this.commit(value);
      this.close();
    }
  }
  protected toggleAll(): void {
    const compare = this.hbCompareWith();
    const values = this.enabledEntries().map((e) => e.value);
    if (values.every((v) => this.isSelected(v))) {
      this.commit(this.selectedValues().filter((v) => !values.some((x) => compare(x, v))));
      return;
    }
    const merged = [...this.selectedValues()];
    const limit = this.hbSelectionLimit();
    for (const v of values) {
      if (merged.some((x) => compare(x, v))) continue;
      if (limit > 0 && merged.length >= limit) break;
      merged.push(v);
    }
    this.commit(merged);
  }
  protected removeChip(value: unknown, event: Event): void {
    event.stopPropagation();
    const compare = this.hbCompareWith();
    this.commit(this.selectedValues().filter((v) => !compare(v, value)));
  }
  private commit(next: unknown): void {
    this.hbValue.set(next);
    this.onChange(next);
    this.hbChange.emit(next);
  }
  protected clear(event: Event): void {
    event.stopPropagation();
    this.commit(this.hbMultiple() ? [] : null);
  }

  protected onFilterInput(event: Event): void {
    this.filterText.set((event.target as HTMLInputElement).value);
    this.activeEntry.set(this.enabledEntries()[0] ?? null);
    afterNextRender(() => this.updateScroll(), { injector: this.injector });
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

  private moveActive(delta: number): void {
    const enabled = this.enabledEntries();
    if (!enabled.length) return;
    const current = this.activeEntry();
    const idx = current ? enabled.findIndex((e) => e.id === current.id) : -1;
    const nextIdx = Math.max(0, Math.min(enabled.length - 1, idx + delta));
    const next = enabled[nextIdx];
    this.activeEntry.set(next);
    this.scrollActiveIntoView(next);
  }
  private scrollActiveIntoView(entry: HbSelectEntry): void {
    const el = this.overlayRef?.overlayElement.querySelector(`#${entry.id}`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
    this.updateScroll();
  }
  private typeahead(char: string): void {
    this.typeaheadBuffer += char.toLowerCase();
    if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
    this.typeaheadTimer = setTimeout(() => (this.typeaheadBuffer = ''), 500);
    const match = this.enabledEntries().find((e) =>
      e.label.toLowerCase().startsWith(this.typeaheadBuffer),
    );
    if (match) {
      this.activeEntry.set(match);
      this.scrollActiveIntoView(match);
    }
  }
  protected onPanelKeydown(event: KeyboardEvent): void {
    const enabled = this.enabledEntries();
    switch (event.key) {
      case 'ArrowDown':
        this.moveActive(1);
        break;
      case 'ArrowUp':
        this.moveActive(-1);
        break;
      case 'Home':
        if (enabled.length) this.activeEntry.set(enabled[0]);
        break;
      case 'End':
        if (enabled.length) this.activeEntry.set(enabled[enabled.length - 1]);
        break;
      case 'Enter':
      case ' ': {
        if (event.key === ' ' && this.hbFilter()) return;
        const active = this.activeEntry();
        if (active && !active.disabled) this.selectValue(active.value);
        break;
      }
      case 'Escape':
        this.close();
        break;
      case 'Tab':
        this.close();
        return;
      default:
        if (!this.hbFilter() && event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
          this.typeahead(event.key);
          event.preventDefault();
        }
        return;
    }
    event.preventDefault();
  }
  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.isOpen()) this.open();
    }
  }

  protected onChange: (value: unknown) => void = () => {};
  protected onTouched: () => void = () => {};
  writeValue(value: unknown): void {
    this.hbValue.set(value);
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
