import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  HB_SIDEBAR_LAYOUT,
  type HbSidebarContext,
  type HbSidebarLayoutContext,
} from './sidebar.token';
import { sidebarLayoutClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-layout',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: HB_SIDEBAR_LAYOUT, useExisting: forwardRef(() => HbSidebarLayoutComponent) },
  ],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-layout'",
  },
  exportAs: 'hbSidebarLayout',
})
export class HbSidebarLayoutComponent implements HbSidebarLayoutContext {
  readonly class = input<ClassValue>('');

  private readonly registry = new Map<string, HbSidebarContext>();

  protected readonly classes = computed(() => cn(sidebarLayoutClass, this.class()));

  register(id: string, ctx: HbSidebarContext): void {
    this.registry.set(id, ctx);
  }
  unregister(id: string): void {
    this.registry.delete(id);
  }
  get(id: string): HbSidebarContext | undefined {
    return this.registry.get(id);
  }
  first(): HbSidebarContext | undefined {
    return this.registry.values().next().value;
  }
}
