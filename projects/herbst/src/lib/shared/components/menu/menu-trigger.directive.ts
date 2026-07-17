import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  booleanAttribute,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { CdkMenuTrigger } from '@angular/cdk/menu';

@Directive({
  selector: '[hbMenuTriggerFor]',
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: hbMenuTriggerFor', 'cdkMenuPosition: hbMenuPosition'],
    },
  ],
  host: {
    '[attr.data-slot]': "'menu-trigger'",
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave($event)',
  },
  exportAs: 'hbMenuTrigger',
})
export class HbMenuTriggerDirective {
  private readonly cdk = inject(CdkMenuTrigger);
  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly document = inject(DOCUMENT);

  readonly hbTrigger = input<'click' | 'hover'>('click');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbOpen = input<boolean | undefined>(undefined);
  readonly hbOpenChange = output<boolean>();

  private hoverTimer: ReturnType<typeof setTimeout> | null = null;
  private menuEl: HTMLElement | null = null;

  private readonly onMenuEnter = (): void => this.clearTimer();
  private readonly onMenuLeave = (event: MouseEvent): void => this.onLeave(event);

  constructor() {
    this.cdk.opened.pipe(takeUntilDestroyed()).subscribe(() => {
      this.hbOpenChange.emit(true);
      if (this.hbTrigger() === 'hover') setTimeout(() => this.attachMenuListeners(), 0);
    });
    this.cdk.closed.pipe(takeUntilDestroyed()).subscribe(() => {
      this.hbOpenChange.emit(false);
      this.detachMenuListeners();
    });

    effect(() => {
      const open = this.hbOpen();
      if (open === undefined) return;
      if (open && !this.cdk.isOpen()) this.cdk.open();
      else if (!open && this.cdk.isOpen()) this.cdk.close();
    });

    this.destroyRef.onDestroy(() => {
      this.clearTimer();
      this.detachMenuListeners();
    });
  }

  open(): void {
    this.cdk.open();
  }
  close(): void {
    this.cdk.close();
  }
  toggle(): void {
    this.cdk.toggle();
  }
  isOpen(): boolean {
    return this.cdk.isOpen();
  }

  protected onEnter(): void {
    if (this.hbTrigger() !== 'hover' || this.hbDisabled()) return;
    this.clearTimer();
    if (!this.cdk.isOpen()) this.hoverTimer = setTimeout(() => this.cdk.open(), 90);
  }

  protected onLeave(event: MouseEvent): void {
    if (this.hbTrigger() !== 'hover') return;
    this.clearTimer();
    if (this.isInsideMenus(event.relatedTarget)) return;
    this.hoverTimer = setTimeout(() => this.cdk.isOpen() && this.cdk.close(), 140);
  }

  private isInsideMenus(node: EventTarget | null): boolean {
    if (!(node instanceof Node)) return false;
    if (this.host.nativeElement.contains(node)) return true;
    const panels = this.document.querySelectorAll('.cdk-overlay-container [data-slot="menu"]');
    return Array.from(panels).some((panel) => panel.contains(node));
  }

  private attachMenuListeners(): void {
    const el =
      (this.cdk.getMenu()?.nativeElement as HTMLElement | undefined) ??
      (this.overlayPanel() ?? undefined);
    if (!el) return;
    this.menuEl = el;
    el.addEventListener('mouseenter', this.onMenuEnter);
    el.addEventListener('mouseleave', this.onMenuLeave);
  }

  private overlayPanel(): HTMLElement | null {
    const panels = this.document.querySelectorAll<HTMLElement>('[data-slot="menu"]');
    return panels.length ? panels[panels.length - 1] : null;
  }
  private detachMenuListeners(): void {
    if (!this.menuEl) return;
    this.menuEl.removeEventListener('mouseenter', this.onMenuEnter);
    this.menuEl.removeEventListener('mouseleave', this.onMenuLeave);
    this.menuEl = null;
  }

  private clearTimer(): void {
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
      this.hoverTimer = null;
    }
  }
}
