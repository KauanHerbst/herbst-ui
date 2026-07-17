import { NgTemplateOutlet } from '@angular/common';
import { type ConnectedPosition, Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  InjectionToken,
  input,
  numberAttribute,
  output,
  type Provider,
  signal,
  type TemplateRef,
  untracked,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbKbdComponent } from '../kbd';
import {
  TOOLTIP_ARROW_SIDE,
  tooltipContentVariants,
  type HbTooltipAlign,
  type HbTooltipDelay,
  type HbTooltipSide,
  type HbTooltipTrigger,
} from './tooltip.variants';


let tooltipUid = 0;
export interface HbTooltipGlobalConfig {
  position: HbTooltipSide;
  align: HbTooltipAlign;
  trigger: HbTooltipTrigger;
  openDelay: number;
  closeDelay: number;
  offset: number;
  arrow: boolean;
}

export const HB_TOOLTIP_DEFAULTS: HbTooltipGlobalConfig = {
  position: 'top',
  align: 'center',
  trigger: 'hover',
  openDelay: 300,
  closeDelay: 100,
  offset: 6,
  arrow: false,
};

export const HB_TOOLTIP_CONFIG = new InjectionToken<Partial<HbTooltipGlobalConfig>>(
  'HB_TOOLTIP_CONFIG',
);

export function provideHbTooltip(config: Partial<HbTooltipGlobalConfig>): Provider {
  return { provide: HB_TOOLTIP_CONFIG, useValue: config };
}

const OPPOSITE: Record<HbTooltipSide, HbTooltipSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};


@Component({
  selector: 'hb-tooltip-content',
  imports: [HbKbdComponent, NgTemplateOutlet],
  template: `
    @if (template()) {
      <ng-container [ngTemplateOutlet]="template()!" [ngTemplateOutletContext]="context()" />
    } @else {
      @if (text()) {
        <span>{{ text() }}</span>
      }
      @for (key of shortcut(); track $index) {
        <hb-kbd
          class="border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground"
          hbSize="xs"
          >{{ key }}</hb-kbd
        >
      }
    }
    @if (arrow()) {
      <span [class]="arrowClasses()"></span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[id]': 'id()',
    role: 'tooltip',
    '[attr.data-slot]': "'tooltip-content'",
    '[attr.data-side]': 'side()',
  },
  exportAs: 'hbTooltipContent',
})
export class HbTooltipContentComponent {
  readonly id = input<string>('');
  readonly text = input<string>('');
  readonly shortcut = input<string[]>([]);
  readonly template = input<TemplateRef<unknown> | null>(null);
  readonly context = input<unknown>(undefined);
  readonly side = input<HbTooltipSide>('top');
  readonly arrow = input(false);
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn(tooltipContentVariants(), this.class()));
  protected readonly arrowClasses = computed(() =>
    cn('absolute size-2 rotate-45 rounded-[1px] bg-primary', TOOLTIP_ARROW_SIDE[this.side()]),
  );
}

@Directive({
  selector: '[hbTooltip]',
  host: {
    '[attr.data-slot]': "'tooltip-trigger'",
    '[attr.aria-describedby]': 'describedBy()',
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave($event)',
    '(focusin)': 'onFocus()',
    '(focusout)': 'onLeave($event)',
    '(click)': 'onClick()',
  },
  exportAs: 'hbTooltip',
})
export class HbTooltipDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly overlay = inject(Overlay);
  private readonly destroyRef = inject(DestroyRef);
  private readonly config: HbTooltipGlobalConfig = {
    ...HB_TOOLTIP_DEFAULTS,
    ...(inject(HB_TOOLTIP_CONFIG, { optional: true }) ?? {}),
  };

  readonly hbTooltip = input<string>('');
  readonly hbTooltipContent = input<TemplateRef<unknown> | null>(null);
  readonly hbTooltipContentContext = input<unknown>(undefined);
  readonly hbTooltipShortcut = input<string | string[]>([]);
  readonly hbTooltipPosition = input<HbTooltipSide>(this.config.position);
  readonly hbTooltipAlign = input<HbTooltipAlign>(this.config.align);
  readonly hbTooltipTrigger = input<HbTooltipTrigger>(this.config.trigger);
  readonly hbTooltipDelay = input<HbTooltipDelay>();
  readonly hbTooltipOffset = input(this.config.offset, { transform: numberAttribute });
  readonly hbTooltipArrow = input(this.config.arrow, { transform: booleanAttribute });
  readonly hbTooltipDisabled = input(false, { transform: booleanAttribute });
  readonly hbTooltipClass = input<ClassValue>('');
  readonly hbTooltipOpen = input<boolean | undefined>(undefined);
  readonly hbTooltipOpenChange = output<boolean>();

  private readonly id = `hb-tooltip-${++tooltipUid}`;
  protected readonly describedBy = signal<string | null>(null);
  private readonly openState = signal(false);

  private overlayRef: OverlayRef | null = null;
  private openTimer: ReturnType<typeof setTimeout> | null = null;
  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly side = this.hbTooltipPosition;
  private readonly align = this.hbTooltipAlign;
  private readonly triggerMode = this.hbTooltipTrigger;
  private readonly shortcutList = computed<string[]>(() => {
    const s = this.hbTooltipShortcut();
    return Array.isArray(s) ? s : s ? [s] : [];
  });
  private readonly hasContent = computed(
    () => !!this.hbTooltip() || !!this.hbTooltipContent() || this.shortcutList().length > 0,
  );

  private delays(): { open: number; close: number } {
    const d = this.hbTooltipDelay();
    if (typeof d === 'number') return { open: d, close: d };
    return { open: d?.open ?? this.config.openDelay, close: d?.close ?? this.config.closeDelay };
  }

  constructor() {
    effect(() => {
      const open = this.hbTooltipOpen();
      if (open === undefined) return;
      untracked(() => (open ? this.open() : this.close()));
    });
    this.destroyRef.onDestroy(() => {
      this.clearTimers();
      this.overlayRef?.dispose();
    });
  }

  protected onEnter(): void {
    if (this.triggerMode() !== 'hover') return;
    this.scheduleOpen();
  }
  protected onFocus(): void {
    if (this.triggerMode() !== 'hover') return;
    this.clearTimers();
    this.open();
  }
  protected onLeave(event?: Event): void {
    if (this.triggerMode() !== 'hover') return;
    const related = (event as MouseEvent | FocusEvent | undefined)?.relatedTarget ?? null;
    if (related instanceof Node && this.el.nativeElement.contains(related)) return;
    this.scheduleClose();
  }
  protected onClick(): void {
    if (this.triggerMode() !== 'click') return;
    this.openState() ? this.close() : this.open();
  }

  private scheduleOpen(): void {
    this.clearTimers();
    this.openTimer = setTimeout(() => this.open(), this.delays().open);
  }
  private scheduleClose(): void {
    this.clearTimers();
    this.closeTimer = setTimeout(() => this.close(), this.delays().close);
  }

  open(): void {
    if (this.overlayRef || this.hbTooltipDisabled() || !this.hasContent()) return;

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions(this.positions())
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: 'hb-tooltip-pane',
    });

    const ref = this.overlayRef.attach(new ComponentPortal(HbTooltipContentComponent));
    ref.setInput('id', this.id);
    ref.setInput('text', this.hbTooltip());
    ref.setInput('shortcut', this.shortcutList());
    ref.setInput('template', this.hbTooltipContent());
    ref.setInput('context', this.hbTooltipContentContext());
    ref.setInput('side', this.side());
    ref.setInput('arrow', this.hbTooltipArrow());
    ref.setInput('class', this.hbTooltipClass());

    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.close();
    });
    if (this.triggerMode() === 'click') {
      this.overlayRef.outsidePointerEvents().subscribe((event) => {
        const target = event.target as Node | null;
        if (target && this.el.nativeElement.contains(target)) return;
        this.close();
      });
    }

    this.describedBy.set(this.id);
    this.setOpen(true);
  }

  close(): void {
    if (!this.overlayRef) return;
    this.overlayRef.dispose();
    this.overlayRef = null;
    this.describedBy.set(null);
    this.setOpen(false);
  }

  private setOpen(value: boolean): void {
    if (this.openState() === value) return;
    this.openState.set(value);
    this.hbTooltipOpenChange.emit(value);
  }

  private positions(): ConnectedPosition[] {
    const off = this.hbTooltipOffset();
    const align = this.align();
    const x = align === 'start' ? 'start' : align === 'end' ? 'end' : 'center';
    const y = align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center';
    const map: Record<HbTooltipSide, ConnectedPosition> = {
      bottom: { originX: x, originY: 'bottom', overlayX: x, overlayY: 'top', offsetY: off },
      top: { originX: x, originY: 'top', overlayX: x, overlayY: 'bottom', offsetY: -off },
      right: { originX: 'end', originY: y, overlayX: 'start', overlayY: y, offsetX: off },
      left: { originX: 'start', originY: y, overlayX: 'end', overlayY: y, offsetX: -off },
    };
    return [map[this.side()], map[OPPOSITE[this.side()]]];
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
