import { DOCUMENT } from '@angular/common';
import {
  type ConnectedPosition,
  Overlay,
  type OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  type TemplateRef,
  untracked,
  ViewContainerRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

export type HbPopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type HbPopoverAlign = 'start' | 'center' | 'end';
export type HbPopoverTriggerMode = 'click' | 'hover';

const OPPOSITE: Record<HbPopoverSide, HbPopoverSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

@Component({
  selector: 'hb-popover',
  template: `
    <span
      #trigger
      class="inline-flex w-fit"
      (click)="onTriggerClick()"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave($event)"
    >
      <ng-content select="[hbPopoverTrigger]" />
    </span>

    <ng-template #panel>
      <ng-content />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'popover'" },
  exportAs: 'hbPopover',
})
export class HbPopoverComponent {
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);

  readonly hbTrigger = input<HbPopoverTriggerMode>('click');
  readonly hbSide = input<HbPopoverSide>('bottom');
  readonly hbAlign = input<HbPopoverAlign>('center');
  readonly hbSideOffset = input(4, { transform: numberAttribute });
  readonly hbOpenDelay = input(100, { transform: numberAttribute });
  readonly hbCloseDelay = input(150, { transform: numberAttribute });
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbAutoFocus = input(true, { transform: booleanAttribute });
  readonly hbRestoreFocus = input(true, { transform: booleanAttribute });
  readonly hbCloseOnEscape = input(true, { transform: booleanAttribute });
  readonly hbCloseOnOutsideClick = input(true, { transform: booleanAttribute });
  readonly hbOpen = input<boolean | undefined>(undefined);
  readonly hbOpenChange = output<boolean>();

  private readonly trigger = viewChild.required<ElementRef<HTMLElement>>('trigger');
  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');

  readonly isOpen = signal(false);
  readonly resolvedSide = signal<HbPopoverSide>('bottom');

  private overlayRef: OverlayRef | null = null;
  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;
  private restoreEl: HTMLElement | null = null;

  private readonly onPanelEnter = (): void => this.clearTimers();
  private readonly onPanelLeave = (event: MouseEvent): void => this.onLeave(event);

  constructor() {
    effect(() => this.resolvedSide.set(this.hbSide()));

    effect(() => {
      const open = this.hbOpen();
      if (open === undefined) return;
      untracked(() => (open ? this.open() : this.close()));
    });

    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      this.detachPanel();
      this.overlayRef?.dispose();
    });
  }

  protected onTriggerClick(): void {
    if (this.hbTrigger() !== 'click' || this.hbDisabled()) return;
    this.isOpen() ? this.close() : this.open();
  }

  protected onEnter(): void {
    if (this.hbTrigger() !== 'hover' || this.hbDisabled()) return;
    this.clearTimers();
    this.openTimer = setTimeout(() => this.open(), this.hbOpenDelay());
  }

  protected onLeave(event?: Event): void {
    if (this.hbTrigger() !== 'hover') return;
    this.clearTimers();
    const related = (event as MouseEvent | undefined)?.relatedTarget ?? null;
    if (this.isInside(related)) return;
    this.closeTimer = setTimeout(() => this.close(), this.hbCloseDelay());
  }

  open(): void {
    if (this.overlayRef || this.hbDisabled()) return;
    this.resolvedSide.set(this.hbSide());
    this.restoreEl = this.document.activeElement as HTMLElement | null;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger())
      .withPositions(this.positions())
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.overlayRef.attach(new TemplatePortal(this.panel(), this.vcr));

    const el = this.overlayRef.overlayElement;
    if (this.hbTrigger() === 'hover') {
      el.addEventListener('mouseenter', this.onPanelEnter);
      el.addEventListener('mouseleave', this.onPanelLeave);
    } else {
      this.overlayRef.outsidePointerEvents().subscribe((event) => {
        const target = event.target as Node | null;
        if (target && this.trigger().nativeElement.contains(target)) return;
        if (this.hbCloseOnOutsideClick()) this.close();
      });
      if (this.hbAutoFocus()) setTimeout(() => this.focusContent(), 0);
    }

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape' && this.hbCloseOnEscape()) this.close();
    });

    this.isOpen.set(true);
    this.hbOpenChange.emit(true);
  }

  close(): void {
    if (!this.overlayRef) return;
    this.detachPanel();
    this.overlayRef.dispose();
    this.overlayRef = null;
    this.isOpen.set(false);
    this.hbOpenChange.emit(false);
    if (this.hbRestoreFocus()) this.restoreEl?.focus?.();
    this.restoreEl = null;
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  private focusContent(): void {
    const el = this.overlayRef?.overlayElement;
    if (!el) return;
    const focusable = el.querySelector<HTMLElement>(FOCUSABLE);
    (focusable ?? el.querySelector<HTMLElement>('[data-slot="popover-content"]'))?.focus();
  }

  private positions(): ConnectedPosition[] {
    const align = this.hbAlign();
    const off = this.hbSideOffset();
    const x = align === 'start' ? 'start' : align === 'end' ? 'end' : 'center';
    const y = align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center';

    const map: Record<HbPopoverSide, ConnectedPosition> = {
      bottom: { originX: x, originY: 'bottom', overlayX: x, overlayY: 'top', offsetY: off },
      top: { originX: x, originY: 'top', overlayX: x, overlayY: 'bottom', offsetY: -off },
      right: { originX: 'end', originY: y, overlayX: 'start', overlayY: y, offsetX: off },
      left: { originX: 'start', originY: y, overlayX: 'end', overlayY: y, offsetX: -off },
    };
    return [map[this.hbSide()], map[OPPOSITE[this.hbSide()]]];
  }

  private isInside(node: EventTarget | null): boolean {
    if (!(node instanceof Node)) return false;
    if (this.trigger().nativeElement.contains(node)) return true;
    return this.overlayRef?.overlayElement.contains(node) ?? false;
  }

  private detachPanel(): void {
    const el = this.overlayRef?.overlayElement;
    if (!el) return;
    el.removeEventListener('mouseenter', this.onPanelEnter);
    el.removeEventListener('mouseleave', this.onPanelLeave);
  }

  private clearTimers(): void {
    if (this.openTimer) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    if (this.closeTimer) {
      clearTimeout(this.closeTimer);
      this.closeTimer = null;
    }
  }
}
