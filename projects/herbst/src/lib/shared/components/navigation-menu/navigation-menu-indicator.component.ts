import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_NAV_MENU, type HbNavMenuContext } from './navigation-menu.token';

@Component({
  selector: 'hb-navigation-menu-indicator',
  template: `<div [class]="arrowClasses()"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    'aria-hidden': 'true',
    '[class]': 'classes()',
    '[attr.data-slot]': "'navigation-menu-indicator'",
    '[attr.data-state]': 'visible() ? "visible" : "hidden"',
    '[style.left.px]': 'left()',
    '[style.width.px]': 'width()',
  },
  exportAs: 'hbNavigationMenuIndicator',
})
export class HbNavigationMenuIndicatorComponent {
  private readonly ctx = inject<HbNavMenuContext>(HB_NAV_MENU);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly class = input<ClassValue>('');

  protected readonly left = signal(0);
  protected readonly width = signal(0);

  protected readonly visible = computed(
    () => this.ctx.activeValue() !== null && !!this.ctx.activeItem()?.triggerEl(),
  );
  protected readonly classes = computed(() => {
    const pos = this.ctx.side() === 'top' ? 'bottom-full items-start' : 'top-full items-end';
    return cn(
      'pointer-events-none absolute z-50 flex h-1.5 justify-center overflow-hidden transition-all duration-200 data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100',
      pos,
      this.class(),
    );
  });
  protected readonly arrowClasses = computed(() => {
    const shape =
      this.ctx.side() === 'top'
        ? 'top-[60%] rounded-br-sm border-r border-b'
        : 'top-[60%] rounded-tl-sm border-t border-l';
    return cn('relative size-2 rotate-45 border-border bg-popover shadow-md', shape);
  });

  constructor() {
    afterRenderEffect(() => {
      this.ctx.activeValue();
      const trigger = this.ctx.activeItem()?.triggerEl();
      if (!trigger) return;
      const ref = (this.el.nativeElement.offsetParent as HTMLElement | null) ?? this.el.nativeElement;
      const t = trigger.getBoundingClientRect();
      const r = ref.getBoundingClientRect();
      this.left.set(t.left - r.left);
      this.width.set(t.width);
    });
  }
}
