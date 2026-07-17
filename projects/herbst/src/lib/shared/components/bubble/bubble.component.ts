import {
  afterRenderEffect,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbTooltipImports } from '../tooltip';
import { bubbleVariants, type HbBubbleAlign, type HbBubbleVariant } from './bubble.variants';

@Component({
  selector: 'hb-bubble',
  imports: [HbTooltipImports],
  template: `
    <div [class]="bubbleClasses()" [hbTooltip]="hbTooltip()" hbTooltipPosition="top">
      <div #content [style]="clampStyle()">
        <ng-content />
      </div>

      @if (hbCollapsible() && (overflowing() || expanded())) {
        <button
          type="button"
          class="mt-1 text-xs font-medium underline underline-offset-2 opacity-80 hover:opacity-100"
          (click)="expanded.set(!expanded())"
        >
          {{ expanded() ? 'Show less' : 'Show more' }}
        </button>
      }

      <ng-content select="hb-bubble-reactions, hb-bubble-actions, [hbBubbleExtra]" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'flex w-full',
    '[class.justify-end]': "hbAlign() === 'end'",
    '[attr.data-slot]': "'bubble'",
    '[attr.data-align]': 'hbAlign()',
  },
  exportAs: 'hbBubble',
})
export class HbBubbleComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly hbVariant = input<HbBubbleVariant>('secondary');
  readonly hbAlign = input<HbBubbleAlign>('start');
  readonly hbCollapsible = input(false, { transform: booleanAttribute });
  readonly hbClampLines = input(4, { transform: numberAttribute });
  readonly hbExpanded = model(false);
  readonly hbTooltip = input('');
  readonly class = input<ClassValue>('');

  protected readonly expanded = this.hbExpanded;
  private readonly contentEl = viewChild.required<ElementRef<HTMLElement>>('content');
  protected readonly overflowing = signal(false);
  private readonly resizeTick = signal(0);

  protected readonly clamped = computed(() => this.hbCollapsible() && !this.expanded());
  protected readonly clampStyle = computed<Record<string, string> | null>(() =>
    this.clamped()
      ? {
          display: '-webkit-box',
          '-webkit-line-clamp': String(this.hbClampLines()),
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        }
      : null,
  );
  protected readonly bubbleClasses = computed(() =>
    cn(bubbleVariants({ variant: this.hbVariant(), align: this.hbAlign() }), this.class()),
  );

  constructor() {
    afterRenderEffect(() => {
      this.hbCollapsible();
      this.hbClampLines();
      this.expanded();
      this.resizeTick();
      const el = this.contentEl().nativeElement;
      this.overflowing.set(el.scrollHeight - el.clientHeight > 1);
    });

    const RO = (globalThis as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    const ro = RO ? new RO(() => this.resizeTick.update((v) => v + 1)) : null;
    afterRenderEffect(() => ro?.observe(this.contentEl().nativeElement));
    this.destroyRef.onDestroy(() => ro?.disconnect());
  }
}
