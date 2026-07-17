import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorPlus, phosphorX } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbButtonComponent, type HbButtonType } from '../button';
import { HbTooltipDirective, type HbTooltipSide } from '../tooltip';
import { HbSpeedDialItemDirective } from './speed-dial-item.directive';
import {
  type HbSpeedDialDirection,
  type HbSpeedDialItem,
  type HbSpeedDialType,
} from './speed-dial.types';
import { speedDialItemClass, speedDialMaskClass } from './speed-dial.variants';

@Component({
  selector: 'hb-speed-dial',
  imports: [NgTemplateOutlet, NgIcon, HbButtonComponent, HbTooltipDirective],
  viewProviders: [provideIcons({ phosphorPlus, phosphorX })],
  template: `
    @if (hbMask() && visible()) {
      <div [class]="maskClass" data-slot="speed-dial-mask" (click)="close()"></div>
    }

    <div
      class="hb-speed-dial-list pointer-events-none absolute inset-0"
      role="menu"
      [attr.aria-hidden]="!visible()"
    >
      @for (item of hbModel(); track $index; let i = $index) {
        <div
          role="menuitem"
          data-slot="speed-dial-item"
          [class]="itemClasses(item)"
          [style.transform]="itemTransform(i)"
          [style.opacity]="visible() ? 1 : 0"
          [style.transitionDelay]="itemDelay(i)"
        >
          <button
            hb-button
            [hbType]="hbButtonType()"
            hbSize="icon"
            class="size-9 rounded-full shadow-md"
            [attr.tabindex]="visible() ? 0 : -1"
            [attr.aria-hidden]="!visible()"
            [attr.aria-label]="item.ariaLabel || item.label || null"
            [disabled]="item.disabled || null"
            [hbTooltip]="tooltipFor(item)"
            [hbTooltipPosition]="tooltipSide()"
            (click)="onItemClick(item)"
          >
            @if (itemTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: item, index: i }" />
            } @else if (item.icon) {
              <ng-icon [name]="item.icon" />
            }
          </button>
        </div>
      }
    </div>

    <button
      hb-button
      [hbType]="hbButtonType()"
      hbSize="icon"
      class="hb-speed-dial-button size-12 rounded-full shadow-lg"
      [attr.aria-label]="hbAriaLabel() || 'Actions'"
      [attr.aria-haspopup]="true"
      [attr.aria-expanded]="visible()"
      (click)="toggle()"
    >
      <ng-icon [name]="visible() ? hbCloseIcon() : hbIcon()" [class]="iconClasses()" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[class.z-50]': 'visible()',
    '[attr.data-slot]': "'speed-dial'",
    '[attr.data-open]': 'visible() || null',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown)': 'onKeydown($event)',
  },
  exportAs: 'hbSpeedDial',
})
export class HbSpeedDialComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbModel = input<HbSpeedDialItem[]>([]);
  readonly hbType = input<HbSpeedDialType>('linear');
  readonly hbDirection = input<HbSpeedDialDirection>('up');
  readonly hbRadius = input(120, { transform: numberAttribute });
  readonly hbGap = input(12, { transform: numberAttribute });
  readonly hbItemSize = input(36, { transform: numberAttribute });
  readonly hbTransitionDelay = input(30, { transform: numberAttribute });
  readonly hbMask = input(false, { transform: booleanAttribute });
  readonly hbVisible = model(false);
  readonly hbHideOnClickOutside = input(true, { transform: booleanAttribute });
  readonly hbRotateIcon = input(false, { transform: booleanAttribute });
  readonly hbIcon = input('phosphorPlus');
  readonly hbCloseIcon = input('phosphorX');
  readonly hbButtonType = input<HbButtonType>('default');
  readonly hbTooltip = input(true, { transform: booleanAttribute });
  readonly hbAriaLabel = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbItemClick = output<HbSpeedDialItem>();
  readonly hbShow = output<void>();
  readonly hbHide = output<void>();

  protected readonly itemTemplate = contentChild(HbSpeedDialItemDirective, { read: TemplateRef });

  protected readonly visible = this.hbVisible;
  protected readonly maskClass = speedDialMaskClass;

  protected readonly tooltipSide = computed<HbTooltipSide>(() => {
    const d = this.hbDirection();
    if (d === 'left' || d === 'up-left' || d === 'down-left') return 'right';
    return 'left';
  });

  protected readonly hostClasses = computed(() => cn('relative inline-flex', this.class()));
  protected readonly iconClasses = computed(() =>
    cn('transition-transform duration-200', this.hbRotateIcon() && this.visible() && 'rotate-45'),
  );
  protected itemClasses(item: HbSpeedDialItem): string {
    return cn(
      speedDialItemClass,
      '-ml-[18px] -mt-[18px]',
      this.visible() ? 'pointer-events-auto' : 'pointer-events-none',
      item.styleClass,
    );
  }
  protected tooltipFor(item: HbSpeedDialItem): string {
    if (!this.hbTooltip()) return '';
    return item.tooltip ?? item.label ?? '';
  }
  protected itemDelay(i: number): string {
    const n = this.hbModel().length;
    const step = this.hbTransitionDelay();
    const order = this.visible() ? i : n - 1 - i;
    return `${order * step}ms`;
  }

  protected itemTransform(i: number): string {
    if (!this.visible()) return 'translate3d(0, 0, 0) scale(0.4)';
    const { x, y } = this.offset(i);
    return `translate3d(${x}px, ${y}px, 0) scale(1)`;
  }

  private offset(i: number): { x: number; y: number } {
    const n = this.hbModel().length;
    const r = this.hbRadius();
    switch (this.hbType()) {
      case 'linear': {
        const d = (i + 1) * (this.hbItemSize() + this.hbGap());
        return this.linearOffset(d);
      }
      case 'circle': {
        const angle = (2 * Math.PI * i) / Math.max(1, n) - Math.PI / 2;
        return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
      }
      case 'semi-circle': {
        const [start, end] = this.semiRange();
        const angle = start + (end - start) * (n > 1 ? i / (n - 1) : 0.5);
        return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
      }
      case 'quarter-circle': {
        const [start, end] = this.quarterRange();
        const angle = start + (end - start) * (n > 1 ? i / (n - 1) : 0);
        return { x: r * Math.cos(angle), y: r * Math.sin(angle) };
      }
    }
  }
  private linearOffset(d: number): { x: number; y: number } {
    switch (this.hbDirection()) {
      case 'down':
        return { x: 0, y: d };
      case 'left':
        return { x: -d, y: 0 };
      case 'right':
        return { x: d, y: 0 };
      default:
        return { x: 0, y: -d };
    }
  }
  private semiRange(): [number, number] {
    switch (this.hbDirection()) {
      case 'down':
        return [0, Math.PI];
      case 'left':
        return [Math.PI / 2, (3 * Math.PI) / 2];
      case 'right':
        return [-Math.PI / 2, Math.PI / 2];
      default:
        return [Math.PI, 2 * Math.PI];
    }
  }
  private quarterRange(): [number, number] {
    switch (this.hbDirection()) {
      case 'up-left':
        return [Math.PI, (3 * Math.PI) / 2];
      case 'down-right':
        return [0, Math.PI / 2];
      case 'down-left':
        return [Math.PI / 2, Math.PI];
      default:
        return [-Math.PI / 2, 0];
    }
  }

  protected toggle(): void {
    this.visible() ? this.close() : this.open();
  }
  protected open(): void {
    if (this.visible()) return;
    this.hbVisible.set(true);
    this.hbShow.emit();
  }
  protected close(): void {
    if (!this.visible()) return;
    this.hbVisible.set(false);
    this.hbHide.emit();
  }
  protected onItemClick(item: HbSpeedDialItem): void {
    if (item.disabled) return;
    item.command?.(item);
    this.hbItemClick.emit(item);
    this.close();
  }
  protected onDocumentClick(event: MouseEvent): void {
    if (!this.hbHideOnClickOutside() || !this.visible()) return;
    if (!this.host.nativeElement.contains(event.target as Node)) this.close();
  }
  protected onKeydown(event: KeyboardEvent): void {
    if (this.visible() && event.key === 'Escape') this.close();
  }
}
