import { NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretDown,
  phosphorCaretLeft,
  phosphorCaretRight,
  phosphorCaretUp,
} from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HB_TABS, type HbTabsContext } from './tabs.token';
import { tabListVariants } from './tabs.variants';

@Component({
  selector: 'hb-tab-list',
  imports: [NgIcon, NgTemplateOutlet],
  viewProviders: [
    provideIcons({ phosphorCaretLeft, phosphorCaretRight, phosphorCaretUp, phosphorCaretDown }),
  ],
  template: `
    @if (ctx.showArrows() && canStart()) {
      <button type="button" class="hb-tab-arrow" aria-label="Scroll back" (click)="scroll(-1)">
        <ng-icon [name]="horizontal() ? 'phosphorCaretLeft' : 'phosphorCaretUp'" />
      </button>
    }

    <div #scrollport [class]="scrollClasses()" (scroll)="updateOverflow()">
      <div #inner [class]="innerClasses()">
        <ng-content />
        @if (indVisible()) {
          <span
            [class]="indicatorClasses()"
            [style.left.px]="indLeft()"
            [style.top.px]="indTop()"
            [style.width.px]="indWidth()"
            [style.height.px]="indHeight()"
          >
            @if (ctx.indicatorTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" />
            }
          </span>
        }
      </div>
    </div>

    @if (ctx.showArrows() && canEnd()) {
      <button type="button" class="hb-tab-arrow" aria-label="Scroll forward" (click)="scroll(1)">
        <ng-icon [name]="horizontal() ? 'phosphorCaretRight' : 'phosphorCaretDown'" />
      </button>
    }
  `,
  styles: `
    .hb-tab-arrow {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      align-self: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: calc(var(--radius) - 2px);
      color: var(--muted-foreground);
      cursor: pointer;
    }
    .hb-tab-arrow:hover {
      background: var(--muted);
      color: var(--foreground);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'tablist',
    '[class]': 'hostClasses()',
    '[attr.aria-orientation]': 'ctx.orientation()',
    '[attr.data-slot]': "'tab-list'",
  },
  exportAs: 'hbTabList',
})
export class HbTabListComponent {
  protected readonly ctx = inject<HbTabsContext>(HB_TABS);
  private readonly destroyRef = inject(DestroyRef);
  private readonly scrollEl = viewChild.required<ElementRef<HTMLElement>>('scrollport');
  private readonly innerEl = viewChild.required<ElementRef<HTMLElement>>('inner');

  readonly class = input<ClassValue>('');

  protected readonly horizontal = computed(() => this.ctx.orientation() === 'horizontal');
  protected readonly scrollMode = computed(() => {
    const threshold = this.ctx.scrollThreshold();
    return this.ctx.showArrows() || (threshold > 0 && this.ctx.triggers().length > threshold);
  });

  protected readonly indLeft = signal<number | null>(null);
  protected readonly indTop = signal<number | null>(null);
  protected readonly indWidth = signal<number | null>(null);
  protected readonly indHeight = signal<number | null>(null);
  protected readonly indVisible = signal(false);
  protected readonly canStart = signal(false);
  protected readonly canEnd = signal(false);
  private readonly resizeTick = signal(0);

  private readonly trackBorder = computed(() => {
    if (this.ctx.variant() === 'pills') return '';
    return {
      top: 'border-b border-border',
      bottom: 'border-t border-border',
      left: 'border-r border-border',
      right: 'border-l border-border',
    }[this.ctx.position()];
  });

  protected readonly hostClasses = computed(() =>
    cn(
      'relative flex',
      this.horizontal() ? 'flex-row items-stretch' : 'flex-col items-stretch',
      this.trackBorder(),
      this.class(),
    ),
  );
  protected readonly scrollClasses = computed(() =>
    cn(
      'min-h-0 min-w-0 flex-1',
      this.scrollMode() ? 'hb-scrollbar-none overflow-auto' : 'overflow-visible',
    ),
  );
  protected readonly innerClasses = computed(() =>
    cn(
      tabListVariants({
        orientation: this.ctx.orientation(),
        variant: this.ctx.variant(),
        align: this.ctx.align(),
      }),
      this.scrollMode()
        ? this.horizontal()
          ? 'w-max flex-nowrap'
          : 'h-max flex-nowrap'
        : this.horizontal()
          ? 'w-full flex-wrap'
          : 'h-full flex-wrap',
    ),
  );
  protected readonly indicatorClasses = computed(() =>
    cn(
      'pointer-events-none absolute transition-all duration-200 ease-out',
      this.ctx.variant() === 'pills'
        ? 'z-0 rounded-md bg-background shadow-sm'
        : 'z-0 rounded-full bg-primary',
      this.ctx.indicatorClass(),
    ),
  );

  constructor() {
    afterRenderEffect(() => {
      this.ctx.value();
      this.ctx.triggers();
      this.ctx.variant();
      this.ctx.position();
      this.resizeTick();
      this.measure();
      this.updateOverflow();
    });

    const RO = (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    const ro = RO ? new RO(() => this.resizeTick.update((v) => v + 1)) : null;
    effect(() => {
      const inner = this.innerEl().nativeElement;
      ro?.observe(inner);
    });
    this.destroyRef.onDestroy(() => ro?.disconnect());
  }

  private measure(): void {
    const active = this.ctx.triggers().find((t) => this.ctx.isActive(t.value()));
    if (!active) {
      this.indVisible.set(false);
      return;
    }
    const el = active.element();
    let left = el.offsetLeft;
    let top = el.offsetTop;
    let width = el.offsetWidth;
    let height = el.offsetHeight;
    if (this.ctx.variant() !== 'pills') {
      const th = this.ctx.variant() === 'underline' ? 3 : 2;
      const pos = this.ctx.position();
      if (pos === 'top') {
        top = el.offsetTop + el.offsetHeight - th;
        height = th;
      } else if (pos === 'bottom') {
        height = th;
      } else if (pos === 'left') {
        left = el.offsetLeft + el.offsetWidth - th;
        width = th;
      } else {
        width = th;
      }
    }
    this.indLeft.set(left);
    this.indTop.set(top);
    this.indWidth.set(width);
    this.indHeight.set(height);
    this.indVisible.set(true);
  }

  protected updateOverflow(): void {
    const el = this.scrollEl().nativeElement;
    if (this.horizontal()) {
      this.canStart.set(el.scrollLeft > 1);
      this.canEnd.set(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    } else {
      this.canStart.set(el.scrollTop > 1);
      this.canEnd.set(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
    }
  }

  protected scroll(direction: number): void {
    const el = this.scrollEl().nativeElement;
    const amount = (this.horizontal() ? el.clientWidth : el.clientHeight) * 0.7 * direction;
    el.scrollBy(
      this.horizontal() ? { left: amount, behavior: 'smooth' } : { top: amount, behavior: 'smooth' },
    );
  }
}
