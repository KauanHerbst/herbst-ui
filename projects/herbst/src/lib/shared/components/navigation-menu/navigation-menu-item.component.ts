import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_NAV_MENU, type HbNavMenuItemRef } from './navigation-menu.token';



let navItemUid = 0;
@Component({
  selector: 'hb-navigation-menu-item',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'listitem',
    '[class]': 'classes()',
    '[attr.data-slot]': "'navigation-menu-item'",
  },
  exportAs: 'hbNavigationMenuItem',
})
export class HbNavigationMenuItemComponent {
  private readonly ctx = inject(HB_NAV_MENU);
  private readonly destroyRef = inject(DestroyRef);
  private readonly autoId = `hb-nav-item-${++navItemUid}`;

  readonly hbValue = input('');
  readonly class = input<ClassValue>('');

  private readonly triggerElSig = signal<HTMLElement | null>(null);
  private readonly contentSig = signal<TemplateRef<unknown> | null>(null);

  readonly value = computed(() => this.hbValue() || this.autoId);
  readonly isOpen = computed(() => this.ctx.isOpen(this.value()));

  private readonly ref: HbNavMenuItemRef = {
    value: () => this.value(),
    triggerEl: () => this.triggerElSig(),
    content: () => this.contentSig(),
  };

  protected readonly classes = computed(() => cn('relative', this.class()));

  constructor() {
    this.ctx.registerItem(this.ref);
    this.destroyRef.onDestroy(() => this.ctx.unregisterItem(this.ref));
  }

  setTriggerEl(el: HTMLElement | null): void {
    this.triggerElSig.set(el);
  }
  setContent(tpl: TemplateRef<unknown> | null): void {
    this.contentSig.set(tpl);
  }
  useViewport(): boolean {
    return this.ctx.useViewport();
  }
  side() {
    return this.ctx.side();
  }
  hoverOpen(): void {
    this.ctx.hoverOpen(this.value());
  }
  toggle(): void {
    this.ctx.toggle(this.value());
  }
  scheduleClose(): void {
    this.ctx.scheduleClose();
  }
  cancelClose(): void {
    this.ctx.cancelClose();
  }
  onKeydown(event: KeyboardEvent): void {
    this.ctx.onTriggerKeydown(this.value(), event);
  }
}
