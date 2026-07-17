import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbCommandItemComponent } from './command-item.component';
import {
  HB_COMMAND,
  type HbCommandContext,
  type HbCommandInputRef,
  type HbCommandItemRef,
} from './command.token';
import { commandVariants, type HbCommandSize } from './command.variants';

@Component({
  selector: 'hb-command',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'listbox', '[attr.data-slot]': "'command'" },
  providers: [{ provide: HB_COMMAND, useExisting: HbCommandComponent }],
  exportAs: 'hbCommand',
})
export class HbCommandComponent implements HbCommandContext {
  readonly hbSize = input<HbCommandSize>('md');
  readonly class = input<ClassValue>('');
  readonly hbSelect = output<unknown>();
  readonly hbCommandChange = output<string>();

  readonly query = signal('');
  readonly activeItem = signal<HbCommandItemRef | null>(null);
  protected readonly items = contentChildren(HbCommandItemComponent, { descendants: true });
  private inputRef: HbCommandInputRef | null = null;

  protected readonly classes = computed(() => cn(commandVariants(), this.class()));

  matchesFilter(label: string, keywords: readonly string[]): boolean {
    const q = this.query().trim().toLowerCase();
    if (!q) return true;
    return [label, ...keywords].join(' ').toLowerCase().includes(q);
  }
  readonly hasVisibleItems = computed(() => this.items().some((i) => i.matches()));
  private readonly enabled = computed(() =>
    this.items().filter((i) => i.matches() && !i.hbDisabled()),
  );

  isActive(item: HbCommandItemRef): boolean {
    return this.activeItem() === item;
  }
  setActive(item: HbCommandItemRef): void {
    this.activeItem.set(item);
  }
  registerInput(input: HbCommandInputRef): void {
    this.inputRef = input;
  }
  focusInput(): void {
    this.inputRef?.focus();
  }
  setQuery(value: string): void {
    this.query.set(value);
    this.hbCommandChange.emit(value);
    this.activeItem.set(this.enabled()[0] ?? null);
  }
  selectItem(item: HbCommandItemRef): void {
    if (item.hbDisabled()) return;
    this.hbSelect.emit(item.hbValue());
    item.hbSelect.emit(item.hbValue());
  }
  onKeydown(event: KeyboardEvent): void {
    const enabled = this.enabled();
    switch (event.key) {
      case 'ArrowDown':
        this.move(enabled, 1);
        break;
      case 'ArrowUp':
        this.move(enabled, -1);
        break;
      case 'Home':
        if (enabled.length) this.activeItem.set(enabled[0]);
        break;
      case 'End':
        if (enabled.length) this.activeItem.set(enabled[enabled.length - 1]);
        break;
      case 'Enter': {
        const active = this.activeItem();
        if (active) this.selectItem(active);
        break;
      }
      default:
        return;
    }
    event.preventDefault();
  }
  private move(enabled: HbCommandItemComponent[], delta: number): void {
    if (!enabled.length) return;
    const current = this.activeItem();
    const idx = current ? enabled.indexOf(current as HbCommandItemComponent) : -1;
    const next = Math.max(0, Math.min(enabled.length - 1, idx + delta));
    this.activeItem.set(enabled[next]);
    enabled[next].scrollIntoView();
  }
}
