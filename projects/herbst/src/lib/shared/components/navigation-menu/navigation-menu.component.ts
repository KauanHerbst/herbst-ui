import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  numberAttribute,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbNavigationMenuViewportComponent } from './navigation-menu-viewport.component';
import {
  HB_NAV_MENU,
  type HbNavMenuContext,
  type HbNavMenuItemRef,
  type HbNavMenuOrientation,
  type HbNavMenuSide,
} from './navigation-menu.token';

@Component({
  selector: 'hb-navigation-menu',
  imports: [HbNavigationMenuViewportComponent],
  template: `
    <ng-content />
    @if (hbViewport()) {
      <hb-navigation-menu-viewport />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: HB_NAV_MENU, useExisting: forwardRef(() => HbNavigationMenuComponent) },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'navigation-menu'",
    '[attr.data-orientation]': 'hbOrientation()',
    '(mouseleave)': 'scheduleClose()',
  },
  exportAs: 'hbNavigationMenu',
})
export class HbNavigationMenuComponent implements HbNavMenuContext {
  readonly hbValue = model<string | null>(null);
  readonly hbOrientation = input<HbNavMenuOrientation>('horizontal');
  readonly hbSide = input<HbNavMenuSide>('bottom');
  readonly hbViewport = input(true, { transform: booleanAttribute });
  readonly hbDelayDuration = input(200, { transform: numberAttribute });
  readonly hbSkipDelayDuration = input(300, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  private readonly items = signal<HbNavMenuItemRef[]>([]);
  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  readonly orientation = this.hbOrientation;
  readonly side = this.hbSide;
  readonly useViewport = this.hbViewport;
  readonly activeValue = this.hbValue.asReadonly();

  readonly activeItem = computed(
    () => this.items().find((i) => i.value() === this.hbValue()) ?? null,
  );
  readonly activeContent = computed(() => this.activeItem()?.content() ?? null);

  protected readonly classes = computed(() =>
    cn(
      'relative flex max-w-max flex-1 items-center justify-center data-[orientation=vertical]:max-w-none data-[orientation=vertical]:items-stretch',
      this.class(),
    ),
  );

  isOpen(value: string): boolean {
    return this.hbValue() === value;
  }
  hoverOpen(value: string): void {
    this.cancelClose();
    if (this.hbValue() !== null) {
      this.hbValue.set(value);
      return;
    }
    this.clearOpen();
    this.openTimer = setTimeout(() => this.hbValue.set(value), this.hbDelayDuration());
  }
  openImmediate(value: string): void {
    this.cancelClose();
    this.clearOpen();
    this.hbValue.set(value);
  }
  toggle(value: string): void {
    if (this.isOpen(value)) this.hbValue.set(null);
    else this.openImmediate(value);
  }
  scheduleClose(): void {
    this.clearClose();
    this.closeTimer = setTimeout(() => this.hbValue.set(null), 150);
  }
  cancelClose(): void {
    this.clearClose();
  }

  registerItem(item: HbNavMenuItemRef): void {
    this.items.update((list) => [...list, item]);
  }
  unregisterItem(item: HbNavMenuItemRef): void {
    this.items.update((list) => list.filter((i) => i !== item));
  }

  onTriggerKeydown(value: string, event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle(value);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.openImmediate(value);
        break;
      case 'Escape':
        this.hbValue.set(null);
        break;
    }
  }

  private clearOpen(): void {
    if (this.openTimer) clearTimeout(this.openTimer);
    this.openTimer = null;
  }
  private clearClose(): void {
    if (this.closeTimer) clearTimeout(this.closeTimer);
    this.closeTimer = null;
  }
}
