import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  HB_SIDEBAR,
  HB_SIDEBAR_LAYOUT,
  type HbSidebarCollapsible,
  type HbSidebarContext,
  type HbSidebarOpenChangeEvent,
  type HbSidebarSide,
  type HbSidebarState,
  type HbSidebarVariant,
} from './sidebar.token';
import { sidebarBackdropClass, sidebarInnerClass } from './sidebar.variants';



let sidebarUid = 0;
@Component({
  selector: 'hb-sidebar',
  providers: [{ provide: HB_SIDEBAR, useExisting: forwardRef(() => HbSidebarComponent) }],
  template: `
    @if (!overlay() && collapsible() !== 'none') {
      <div
        data-slot="sidebar-gap"
        class="h-full bg-transparent transition-[width] duration-200 ease-linear"
        [style.width]="gapWidth()"
      ></div>
    } @else if (!overlay()) {
      <div data-slot="sidebar-gap" class="h-full" [style.width]="hbWidth()"></div>
    }

    @if (overlay() && open()) {
      <div [class]="backdropClass" data-slot="sidebar-backdrop" (click)="onBackdrop($event)"></div>
    }

    <div
      class="group/sb absolute inset-y-0 z-30 flex h-full transition-[transform,width] duration-200 ease-linear"
      data-slot="sidebar-container"
      [class.left-0]="side() === 'left'"
      [class.right-0]="side() === 'right'"
      [class.p-2]="variant() === 'floating'"
      [attr.data-state]="state()"
      [attr.data-side]="side()"
      [attr.data-variant]="variant()"
      [attr.data-collapsible]="collapsible()"
      [attr.data-collapsed]="collapsed() || null"
      [style.width]="containerWidth()"
      [style.transform]="containerTransform()"
    >
      <div [class]="innerClasses()" data-slot="sidebar-inner">
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-slot]': "'sidebar'",
    '(pointerenter)': 'onPointerEnter()',
    '(pointerleave)': 'onPointerLeave()',
  },
  exportAs: 'hbSidebar',
})
export class HbSidebarComponent implements HbSidebarContext {
  readonly hbOpen = model(true);
  readonly hbSide = input<HbSidebarSide>('left');
  readonly hbVariant = input<HbSidebarVariant>('sidebar');
  readonly hbCollapsible = input<HbSidebarCollapsible>('icon');
  readonly hbOverlay = input(false, { transform: booleanAttribute });
  readonly hbDismissable = input(true, { transform: booleanAttribute });
  readonly hbHideOnOutsideClick = input(true, { transform: booleanAttribute });
  readonly hbWidth = input('16rem');
  readonly hbIconWidth = input('3rem');
  readonly hbOpenOnHover = input(false, { transform: booleanAttribute });
  readonly hbHoverOpenDelay = input(50, { transform: numberAttribute });
  readonly hbHoverCloseDelay = input(100, { transform: numberAttribute });
  readonly hbId = input(`hb-sidebar-${++sidebarUid}`);
  readonly class = input<ClassValue>('');

  readonly hbOnOpenChange = output<HbSidebarOpenChangeEvent>();

  private readonly layout = inject(HB_SIDEBAR_LAYOUT, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  private readonly isMobileSig = signal(false);
  private hoverTimer: ReturnType<typeof setTimeout> | null = null;
  private triggerGuard = false;

  readonly side = this.hbSide;
  readonly variant = this.hbVariant;
  readonly isMobile = this.isMobileSig.asReadonly();
  readonly open = this.hbOpen.asReadonly();

  readonly overlay = computed(() => this.isMobileSig() || this.hbOverlay());
  readonly collapsible = computed<HbSidebarCollapsible>(() =>
    this.isMobileSig() ? 'offcanvas' : this.hbCollapsible(),
  );
  readonly state = computed<HbSidebarState>(() =>
    this.collapsible() === 'none' || this.hbOpen() ? 'expanded' : 'collapsed',
  );
  readonly collapsed = computed(() => this.state() === 'collapsed');

  protected readonly backdropClass = sidebarBackdropClass;

  protected readonly gapWidth = computed(() => {
    if (!this.collapsed()) return this.hbWidth();
    return this.collapsible() === 'icon' ? this.hbIconWidth() : '0px';
  });
  protected readonly containerWidth = computed(() =>
    this.collapsed() && this.collapsible() === 'icon' ? this.hbIconWidth() : this.hbWidth(),
  );
  protected readonly containerTransform = computed(() => {
    if (this.collapsed() && this.collapsible() === 'offcanvas') {
      return this.hbSide() === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
    }
    return 'translateX(0)';
  });

  protected readonly hostClasses = computed(() => cn('h-full shrink-0', this.class()));
  protected readonly innerClasses = computed(() =>
    cn(
      sidebarInnerClass,
      this.variant() === 'sidebar' &&
        (this.hbSide() === 'left' ? 'border-r border-border' : 'border-l border-border'),
      this.variant() === 'floating' && 'rounded-lg border border-border shadow-lg',
    ),
  );

  constructor() {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      const mq = window.matchMedia('(max-width: 767px)');
      this.isMobileSig.set(mq.matches);
      const handler = (event: MediaQueryListEvent) => this.isMobileSig.set(event.matches);
      mq.addEventListener('change', handler);
      this.destroyRef.onDestroy(() => mq.removeEventListener('change', handler));
    }

    let registeredId: string | null = null;
    effect(() => {
      const id = this.hbId();
      if (registeredId === id) return;
      if (registeredId) this.layout?.unregister(registeredId);
      this.layout?.register(id, this);
      registeredId = id;
    });
    this.destroyRef.onDestroy(() => {
      if (registeredId) this.layout?.unregister(registeredId);
      if (this.hoverTimer) clearTimeout(this.hoverTimer);
    });
  }

  toggle(event?: Event): void {
    this.setOpen(!this.hbOpen(), event);
  }
  setOpen(value: boolean, event?: Event): void {
    if (this.collapsible() === 'none') return;
    if (this.hbOpen() === value) return;
    this.hbOpen.set(value);
    this.hbOnOpenChange.emit({ originalEvent: event, value });
  }
  markTrigger(): void {
    this.triggerGuard = true;
    queueMicrotask(() => (this.triggerGuard = false));
  }
  requestOutsideClose(event: Event): void {
    if (!this.overlay() || !this.hbOpen() || !this.hbHideOnOutsideClick()) return;
    if (this.triggerGuard) return;
    this.setOpen(false, event);
  }

  protected onBackdrop(event: Event): void {
    if (this.hbDismissable()) this.setOpen(false, event);
  }

  protected onPointerEnter(): void {
    if (!this.hbOpenOnHover() || this.hbOpen()) return;
    this.scheduleHover(true, this.hbHoverOpenDelay());
  }
  protected onPointerLeave(): void {
    if (!this.hbOpenOnHover() || !this.hbOpen()) return;
    this.scheduleHover(false, this.hbHoverCloseDelay());
  }
  private scheduleHover(value: boolean, delay: number): void {
    if (this.hoverTimer) clearTimeout(this.hoverTimer);
    this.hoverTimer = setTimeout(() => this.setOpen(value), delay);
  }
}
