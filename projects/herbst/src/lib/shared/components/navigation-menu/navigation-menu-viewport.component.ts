import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '../../utils';
import { HB_NAV_MENU, type HbNavMenuContext } from './navigation-menu.token';

@Component({
  selector: 'hb-navigation-menu-viewport',
  imports: [NgTemplateOutlet],
  template: `
    @if (content(); as tpl) {
      <div [class]="boxClasses()" [style.width.px]="width()" [style.height.px]="height()">
        <div #measure class="w-max max-w-[calc(100vw-1rem)]">
          <ng-container [ngTemplateOutlet]="tpl" />
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-slot]': "'navigation-menu-viewport'",
    '[attr.data-side]': 'ctx.side()',
    '[attr.data-state]': 'content() ? "open" : "closed"',
    '(pointerenter)': 'ctx.cancelClose()',
    '(pointerleave)': 'ctx.scheduleClose()',
  },
  exportAs: 'hbNavigationMenuViewport',
})
export class HbNavigationMenuViewportComponent {
  protected readonly ctx = inject<HbNavMenuContext>(HB_NAV_MENU);
  private readonly measure = viewChild<ElementRef<HTMLElement>>('measure');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly content = computed(() => this.ctx.activeContent());
  protected readonly width = signal<number | null>(null);
  protected readonly height = signal<number | null>(null);

  protected readonly hostClasses = computed(() => {
    const pos = {
      bottom: 'left-0 top-full w-full justify-center',
      top: 'left-0 bottom-full w-full justify-center',
      right: 'left-full top-0 h-full items-center',
      left: 'right-full top-0 h-full items-center',
    }[this.ctx.side()];
    return cn('absolute isolate z-50 flex', pos);
  });
  protected readonly boxClasses = computed(() => {
    const gap = {
      bottom: 'mt-1.5 origin-top',
      top: 'mb-1.5 origin-bottom',
      right: 'ml-1.5 origin-left',
      left: 'mr-1.5 origin-right',
    }[this.ctx.side()];
    return cn(
      'relative box-content max-w-[calc(100vw-1rem)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg transition-[width,height] duration-200',
      gap,
    );
  });

  constructor() {
    let ro: ResizeObserver | null = null;
    let observed: HTMLElement | null = null;
    const RO = (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;

    afterRenderEffect(() => {
      this.content();
      const m = this.measure()?.nativeElement ?? null;
      if (m && m !== observed) {
        ro?.disconnect();
        ro = RO ? new RO(() => this.remeasure()) : null;
        ro?.observe(m);
        observed = m;
      } else if (!m) {
        observed = null;
      }
      this.remeasure();
    });
    this.destroyRef.onDestroy(() => ro?.disconnect());
  }

  private remeasure(): void {
    const m = this.measure()?.nativeElement;
    if (!m) return;
    this.width.set(m.scrollWidth);
    this.height.set(m.scrollHeight);
  }
}
