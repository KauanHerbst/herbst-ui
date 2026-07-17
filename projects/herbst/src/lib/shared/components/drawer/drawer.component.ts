import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { type GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  type TemplateRef,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorX } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '../button';
import { cn, type ClassValue } from '../../utils';
import { HbDrawerScaleService } from './drawer.wrapper';
import {
  DRAWER_SIZE_REM,
  drawerBodyVariants,
  drawerDescriptionVariants,
  drawerFooterVariants,
  drawerHandleVariants,
  drawerHeaderVariants,
  drawerPanelVariants,
  drawerTitleVariants,
  type HbDrawerFooterAlign,
  type HbDrawerOkType,
  type HbDrawerSide,
  type HbDrawerSize,
} from './drawer.variants';

let uid = 0;

const SPRING = 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)';
const DISMISS_RATIO = 0.45;
const DISMISS_VELOCITY = 0.55;

@Component({
  selector: 'hb-drawer',
  imports: [NgIcon, HbButtonComponent],
  viewProviders: [provideIcons({ phosphorX })],
  template: `
    <span class="contents" (click)="open()">
      <ng-content select="[hbDrawerTrigger]" />
    </span>

    <ng-template #panel>
      <div
        data-drawer-panel
        [class]="panelClasses()"
        [style.transform]="panelTransform()"
        [style.transition]="panelTransition()"
        (pointerdown)="onPointerDown($event)"
        (pointermove)="onPointerMove($event)"
        (pointerup)="onPointerUp($event)"
        (pointercancel)="onPointerUp($event)"
      >
        @if (showHandle() && handleBefore()) {
          <div [class]="handleClasses()" data-drawer-handle aria-hidden="true"></div>
        }

        <div [class]="headerClasses">
          @if (hbIcon()) {
            <ng-icon [name]="hbIcon()" class="mt-0.5 shrink-0 [&>svg]:size-5" />
          }
          <div class="min-w-0 flex-1">
            @if (hbTitle()) {
              <h2 [id]="titleId" [class]="titleClasses">{{ hbTitle() }}</h2>
            }
            @if (hbDescription()) {
              <p [id]="descriptionId" [class]="descriptionClasses">{{ hbDescription() }}</p>
            }
          </div>
          @if (showClose()) {
            <button
              hb-button
              hbType="ghost"
              hbSize="icon"
              class="-mt-2 -mr-2"
              aria-label="Close"
              data-no-drag
              (click)="close()"
            >
              <ng-icon name="phosphorX" />
            </button>
          }
        </div>

        <div [class]="bodyClasses">
          <ng-content select="[hbDrawerContent]" />
        </div>

        @if (hbShowFooter()) {
          <div [class]="footerClasses()">
            <ng-content select="[hbDrawerFooter]" />
            @if (hbCancelText()) {
              <button
                hb-button
                hbType="outline"
                data-no-drag
                [hbDisabled]="hbCancelDisabled()"
                (click)="onCancel()"
              >
                @if (hbCancelIcon()) {
                  <ng-icon [name]="hbCancelIcon()" />
                }
                {{ hbCancelText() }}
              </button>
            }
            @if (hbOkText()) {
              <button
                hb-button
                data-no-drag
                [hbType]="hbOkType()"
                [hbDisabled]="hbOkDisabled()"
                (click)="onOk()"
              >
                @if (hbOkIcon()) {
                  <ng-icon [name]="hbOkIcon()" />
                }
                {{ hbOkText() }}
              </button>
            }
          </div>
        }

        @if (showHandle() && !handleBefore()) {
          <div [class]="handleClasses()" data-drawer-handle aria-hidden="true"></div>
        }
      </div>
    </ng-template>
  `,
  styles: `
    .hb-drawer-pane {
      pointer-events: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'drawer'" },
  exportAs: 'hbDrawer',
})
export class HbDrawerComponent {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);
  private readonly scale = inject(HbDrawerScaleService);

  readonly hbSide = input<HbDrawerSide>('bottom');
  readonly hbSize = input<HbDrawerSize>('auto');
  readonly hbFullScreen = input(false, { transform: booleanAttribute });
  readonly hbHandle = input(true, { transform: booleanAttribute });
  readonly hbHandleOnly = input(false, { transform: booleanAttribute });
  readonly hbSnapPoints = input<number[]>([]);
  readonly hbBreakpoint = input(768, { transform: numberAttribute });
  readonly hbScaleBackground = input(false, { transform: booleanAttribute });
  readonly hbBlockScroll = input(true, { transform: booleanAttribute });

  readonly hbTitle = input('');
  readonly hbDescription = input('');
  readonly hbIcon = input('');
  readonly hbOkText = input('OK');
  readonly hbCancelText = input('Cancel');
  readonly hbOkType = input<HbDrawerOkType>('default');
  readonly hbOkIcon = input('');
  readonly hbCancelIcon = input('');
  readonly hbOkDisabled = input(false, { transform: booleanAttribute });
  readonly hbCancelDisabled = input(false, { transform: booleanAttribute });
  readonly hbClosable = input(true, { transform: booleanAttribute });
  readonly hbShowClose = input(true, { transform: booleanAttribute });
  readonly hbShowFooter = input(true, { transform: booleanAttribute });
  readonly hbFooterAlign = input<HbDrawerFooterAlign>('end');
  readonly hbData = input<object | undefined>(undefined);
  readonly hbOpen = input<boolean | undefined>(undefined);
  readonly hbActiveSnapPoint = model<number | undefined>(undefined);
  readonly class = input<ClassValue>('');

  readonly hbOk = output<object | undefined>();
  readonly hbCancel = output<object | undefined>();
  readonly hbOpenChange = output<boolean>();

  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  private dialogRef: DialogRef<unknown> | null = null;

  private readonly id = uid++;
  protected readonly titleId = `hb-drawer-title-${this.id}`;
  protected readonly descriptionId = `hb-drawer-desc-${this.id}`;

  private readonly viewportWidth = signal(
    typeof window === 'undefined' ? 1024 : window.innerWidth,
  );
  protected readonly effectiveSide = computed<HbDrawerSide>(() => {
    const side = this.hbSide();
    if ((side === 'left' || side === 'right') && this.viewportWidth() < this.hbBreakpoint()) {
      return 'bottom';
    }
    return side;
  });
  protected readonly isVertical = computed(
    () => this.effectiveSide() === 'top' || this.effectiveSide() === 'bottom',
  );
  private readonly hideSign = computed(() => {
    const side = this.effectiveSide();
    return side === 'bottom' || side === 'right' ? 1 : -1;
  });

  private readonly snapPointsSorted = computed(() =>
    [...this.hbSnapPoints()].filter((n) => n > 0).sort((a, b) => a - b),
  );
  protected readonly snapEnabled = computed(
    () => this.snapPointsSorted().length > 0 && !this.hbFullScreen() && this.hbSize() !== 'full',
  );
  private readonly maxSnap = computed(() => {
    const snaps = this.snapPointsSorted();
    return snaps.length ? snaps[snaps.length - 1] : 1;
  });
  private readonly activeSnap = computed(() => this.hbActiveSnapPoint() ?? this.maxSnap());

  private readonly entered = signal(false);
  private readonly dragging = signal(false);
  private readonly dragPx = signal(0);

  private pointerId = -1;
  private startCoord = 0;
  private baseHiddenPx = 0;
  private extentPx = 1;
  private viewportPx = 1;
  private lastCoord = 0;
  private lastTs = 0;
  private velocity = 0;

  protected readonly showClose = computed(() => this.hbShowClose() && this.hbClosable());
  protected readonly showHandle = computed(
    () => this.hbHandle() && this.isVertical() && !this.hbFullScreen(),
  );
  protected readonly handleBefore = computed(() => this.effectiveSide() === 'bottom');
  protected readonly panelClasses = computed(() =>
    cn(
      drawerPanelVariants({ side: this.effectiveSide(), fullScreen: this.hbFullScreen() }),
      this.class(),
    ),
  );
  protected readonly handleClasses = computed(() =>
    drawerHandleVariants({ side: this.effectiveSide() }),
  );
  protected readonly headerClasses = drawerHeaderVariants();
  protected readonly titleClasses = drawerTitleVariants();
  protected readonly descriptionClasses = drawerDescriptionVariants();
  protected readonly bodyClasses = drawerBodyVariants();
  protected readonly footerClasses = computed(() =>
    drawerFooterVariants({ align: this.hbFooterAlign() }),
  );

  protected readonly panelTransition = computed(() => (this.dragging() ? 'none' : SPRING));
  protected readonly panelTransform = computed(() => {
    const axis = this.isVertical() ? 'Y' : 'X';
    const sign = this.hideSign();
    if (!this.entered()) return `translate${axis}(${sign * 100}%)`;
    const basePct = this.snapEnabled() ? (1 - this.activeSnap() / this.maxSnap()) * 100 : 0;
    return `translate${axis}(calc(${sign * basePct}% + ${sign * this.dragPx()}px))`;
  });

  constructor() {
    if (typeof window !== 'undefined') {
      const onResize = () => this.viewportWidth.set(window.innerWidth);
      window.addEventListener('resize', onResize, { passive: true });
      inject(DestroyRef).onDestroy(() => window.removeEventListener('resize', onResize));
    }

    effect(() => {
      const open = this.hbOpen();
      if (open === undefined) return;
      untracked(() => (open ? this.open() : this.close()));
    });
  }

  open(): void {
    if (this.dialogRef) return;
    this.viewportWidth.set(typeof window === 'undefined' ? 1024 : window.innerWidth);
    this.entered.set(false);
    this.dragPx.set(0);

    const { width, height, maxWidth, maxHeight } = this.sizing();
    this.dialogRef = this.dialog.open(this.panel(), {
      role: 'dialog',
      hasBackdrop: true,
      disableClose: !this.hbClosable(),
      width,
      height,
      maxWidth,
      maxHeight,
      positionStrategy: this.buildPosition(),
      scrollStrategy: this.hbBlockScroll()
        ? this.overlay.scrollStrategies.block()
        : this.overlay.scrollStrategies.noop(),
      panelClass: 'hb-drawer-pane',
      ariaLabelledBy: this.hbTitle() ? this.titleId : null,
      ariaDescribedBy: this.hbDescription() ? this.descriptionId : null,
    });

    if (this.hbScaleBackground()) this.scale.push();
    this.hbOpenChange.emit(true);

    if (typeof requestAnimationFrame === 'undefined') {
      this.entered.set(true);
    } else {
      requestAnimationFrame(() => requestAnimationFrame(() => this.entered.set(true)));
    }

    this.dialogRef.closed.subscribe(() => {
      this.dialogRef = null;
      this.dragging.set(false);
      this.entered.set(false);
      this.dragPx.set(0);
      if (this.hbScaleBackground()) this.scale.pop();
      this.hbOpenChange.emit(false);
    });
  }

  close(): void {
    this.dialogRef?.close();
  }

  protected onOk(): void {
    this.hbOk.emit(this.hbData());
    this.close();
  }

  protected onCancel(): void {
    this.hbCancel.emit(this.hbData());
    this.close();
  }

  protected onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    if (!this.hbClosable() && !this.snapEnabled()) return;
    const target = event.target as HTMLElement;
    const onHandle = !!target.closest('[data-drawer-handle]');
    if (this.hbHandleOnly() && !onHandle) return;
    if (!onHandle && target.closest('input, textarea, select, button, a, [data-no-drag]')) return;

    const panelEl = event.currentTarget as HTMLElement;
    const rect = panelEl.getBoundingClientRect();
    this.extentPx = Math.max(1, this.isVertical() ? rect.height : rect.width);
    this.viewportPx = Math.max(
      1,
      this.isVertical()
        ? typeof window === 'undefined'
          ? this.extentPx
          : window.innerHeight
        : typeof window === 'undefined'
          ? this.extentPx
          : window.innerWidth,
    );
    this.baseHiddenPx = this.snapEnabled()
      ? (1 - this.activeSnap() / this.maxSnap()) * this.extentPx
      : 0;

    this.pointerId = event.pointerId;
    this.startCoord = this.isVertical() ? event.clientY : event.clientX;
    this.lastCoord = this.startCoord;
    this.lastTs = event.timeStamp;
    this.velocity = 0;
    this.dragging.set(true);
    panelEl.setPointerCapture(event.pointerId);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.pointerId) return;
    const coord = this.isVertical() ? event.clientY : event.clientX;
    const hiddenDelta = this.hideSign() * (coord - this.startCoord);
    const total = Math.min(this.extentPx, Math.max(0, this.baseHiddenPx + hiddenDelta));
    this.dragPx.set(total - this.baseHiddenPx);

    const dt = event.timeStamp - this.lastTs;
    if (dt > 0) this.velocity = (this.hideSign() * (coord - this.lastCoord)) / dt;
    this.lastCoord = coord;
    this.lastTs = event.timeStamp;
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging() || event.pointerId !== this.pointerId) return;
    this.dragging.set(false);
    this.pointerId = -1;

    const totalHidden = this.baseHiddenPx + this.dragPx();
    const visiblePx = this.extentPx - totalHidden;
    const flung = this.velocity > DISMISS_VELOCITY;

    if (this.snapEnabled()) {
      const snapsPx = this.snapPointsSorted().map((s) => s * this.viewportPx);
      const lowest = snapsPx[0];
      const nearest = snapsPx.reduce((a, b) =>
        Math.abs(b - visiblePx) < Math.abs(a - visiblePx) ? b : a,
      );
      if (this.hbClosable() && (visiblePx < lowest * 0.5 || (flung && nearest === lowest))) {
        this.close();
        return;
      }
      this.hbActiveSnapPoint.set(this.snapPointsSorted()[snapsPx.indexOf(nearest)]);
      this.dragPx.set(0);
      return;
    }

    if (this.hbClosable() && (totalHidden > this.extentPx * DISMISS_RATIO || flung)) {
      this.close();
      return;
    }
    this.dragPx.set(0);
  }

  private sizing(): { width: string; height: string; maxWidth: string; maxHeight: string } {
    const size = this.hbSize();
    const full = this.hbFullScreen() || size === 'full';
    if (this.isVertical()) {
      let height: string;
      let maxHeight = '100dvh';
      if (full) height = '100dvh';
      else if (this.snapEnabled()) height = `${this.maxSnap() * 100}dvh`;
      else if (size === 'auto') {
        height = 'auto';
        maxHeight = 'calc(100dvh - 6rem)';
      } else height = DRAWER_SIZE_REM[size];
      return { width: '100vw', height, maxWidth: '100vw', maxHeight };
    }
    let width: string;
    if (full) width = '100vw';
    else if (this.snapEnabled()) width = `${this.maxSnap() * 100}vw`;
    else if (size === 'auto') width = DRAWER_SIZE_REM.md;
    else width = DRAWER_SIZE_REM[size];
    return { width, height: '100dvh', maxWidth: '100vw', maxHeight: '100dvh' };
  }

  private buildPosition(): GlobalPositionStrategy {
    const p = this.overlay.position().global();
    switch (this.effectiveSide()) {
      case 'left':
        return p.left('0').top('0');
      case 'top':
        return p.top('0').left('0');
      case 'right':
        return p.right('0').top('0');
      case 'bottom':
      default:
        return p.bottom('0').left('0');
    }
  }
}
