import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { cn, type ClassValue } from '../../utils';
import { HB_TABS, type HbTabsContext, type HbTabTriggerRef } from './tabs.token';
import { tabTriggerVariants } from './tabs.variants';

@Component({
  selector: 'hb-tab',
  imports: [NgIcon],
  template: `
    @if (hbIcon()) {
      <ng-icon [name]="hbIcon()" />
    }
    <ng-content />
    @if (hbBadge() !== null && hbBadge() !== '') {
      <span
        class="ml-1 inline-flex min-w-4 items-center justify-center rounded-full bg-muted px-1 text-[0.625rem] leading-none data-[state=active]:bg-primary/10"
        [attr.data-state]="active() ? 'active' : 'inactive'"
        >{{ hbBadge() }}</span
      >
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'tab',
    '[class]': 'classes()',
    '[id]': 'ctx?.tabId(hbValue())',
    '[attr.aria-selected]': 'active()',
    '[attr.aria-controls]': 'ctx?.panelId(hbValue())',
    '[attr.aria-disabled]': 'hbDisabled() || null',
    '[attr.data-state]': "active() ? 'active' : 'inactive'",
    '[attr.data-disabled]': 'hbDisabled() || null',
    '[attr.tabindex]': 'tabindex()',
    '[attr.disabled]': 'hbDisabled() || null',
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
  },
  exportAs: 'hbTab',
})
export class HbTabComponent {
  protected readonly ctx = inject<HbTabsContext | null>(HB_TABS, { optional: true });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly hbValue = input<unknown>(null);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbIcon = input<string>('');
  readonly hbBadge = input<string | number | null>(null);
  readonly class = input<ClassValue>('');

  private readonly ref: HbTabTriggerRef = {
    value: () => this.hbValue(),
    element: () => this.el.nativeElement,
    disabled: () => this.hbDisabled(),
  };

  protected readonly active = computed(() => (this.ctx ? this.ctx.isActive(this.hbValue()) : false));
  protected readonly tabindex = computed(() => {
    if (this.hbDisabled()) return -1;
    return this.active() ? 0 : -1;
  });
  protected readonly classes = computed(() =>
    cn(
      tabTriggerVariants({ size: this.ctx?.size() ?? 'md', variant: this.ctx?.variant() ?? 'line' }),
      this.class(),
    ),
  );

  constructor() {
    this.ctx?.registerTrigger(this.ref);
    this.destroyRef.onDestroy(() => this.ctx?.unregisterTrigger(this.ref));
  }

  protected onClick(): void {
    if (!this.hbDisabled()) this.ctx?.select(this.hbValue());
  }
  protected onKeydown(event: KeyboardEvent): void {
    this.ctx?.onTriggerKeydown(this.ref, event);
  }
}
