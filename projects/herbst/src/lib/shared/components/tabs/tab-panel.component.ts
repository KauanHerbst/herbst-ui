import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_TABS, type HbTabsContext } from './tabs.token';

@Component({
  selector: 'hb-tab-panel',
  template: `
    @if (!hbLazy() || rendered()) {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'tabpanel',
    '[class]': 'classes()',
    '[id]': 'ctx?.panelId(hbValue())',
    '[attr.aria-labelledby]': 'ctx?.tabId(hbValue())',
    '[hidden]': '!active()',
    '[attr.tabindex]': 'active() ? 0 : null',
    '[attr.data-slot]': "'tab-panel'",
  },
  exportAs: 'hbTabPanel',
})
export class HbTabPanelComponent {
  protected readonly ctx = inject<HbTabsContext | null>(HB_TABS, { optional: true });

  readonly hbValue = input<unknown>(null);
  readonly hbLazy = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly active = computed(() => (this.ctx ? this.ctx.isActive(this.hbValue()) : false));
  protected readonly rendered = signal(false);

  private readonly spacing = computed(() => {
    switch (this.ctx?.position()) {
      case 'bottom':
        return 'mb-3';
      case 'left':
        return 'ml-4';
      case 'right':
        return 'mr-4';
      default:
        return 'mt-3';
    }
  });
  protected readonly classes = computed(() =>
    cn('min-w-0 flex-1 outline-none', this.spacing(), this.class()),
  );

  constructor() {
    effect(() => {
      if (this.active()) this.rendered.set(true);
    });
  }
}
