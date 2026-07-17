import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbTimelineConnectorComponent } from './timeline-connector.component';
import { HbTimelineMarkerComponent } from './timeline-marker.component';
import { HbTimelineOppositeComponent } from './timeline-opposite.component';
import { HbTimelineComponent } from './timeline.component';

@Component({
  selector: 'hb-timeline-item',
  template: `
    @if (hasOpposite()) {
      <div data-slot="timeline-opposite-zone" [class]="oppositeZoneClasses()">
        <ng-content select="hb-timeline-opposite" />
      </div>
    }
    <div [class]="separatorClasses()">
      <div class="relative z-10 flex shrink-0 items-center justify-center">
        <ng-content select="hb-timeline-marker" />
        @if (!hasMarker()) {
          <span class="size-3 shrink-0 rounded-full bg-muted-foreground/40"></span>
        }
      </div>
      <div data-slot="timeline-connector" [class]="connectorZoneClasses()">
        <ng-content select="hb-timeline-connector" />
        @if (!hasConnector()) {
          <span [class]="defaultLineClasses()"></span>
        }
      </div>
    </div>
    <div data-slot="timeline-content-zone" [class]="contentZoneClasses()">
      <ng-content select="hb-timeline-content" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'itemClasses()',
    '[attr.data-slot]': "'timeline-item'",
    '[attr.data-interactive]': 'hbInteractive() || null',
    '[attr.role]': "hbInteractive() ? 'button' : 'listitem'",
    '[attr.tabindex]': 'hbInteractive() ? 0 : null',
    '(click)': 'onActivate()',
    '(keydown)': 'onKeydown($event)',
  },
  exportAs: 'hbTimelineItem',
})
export class HbTimelineItemComponent {
  private readonly timeline = inject(HbTimelineComponent);

  readonly hbInteractive = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');
  readonly hbSelect = output<void>();

  private readonly markerQuery = contentChild(HbTimelineMarkerComponent);
  private readonly oppositeQuery = contentChild(HbTimelineOppositeComponent);
  private readonly connectorQuery = contentChild(HbTimelineConnectorComponent);
  protected readonly hasMarker = computed(() => !!this.markerQuery());
  protected readonly hasOpposite = computed(() => !!this.oppositeQuery());
  protected readonly hasConnector = computed(() => !!this.connectorQuery());

  private readonly vertical = computed(() => this.timeline.layout() === 'vertical');

  protected readonly itemClasses = computed(() => {
    const v = this.vertical();
    const align = this.timeline.align();
    return cn(
      'group/timeline-item relative flex',
      v ? 'flex-row' : 'shrink-0 flex-col',
      v && align === 'left' && 'flex-row-reverse',
      !v && align === 'top' && 'flex-col-reverse',
      align === 'alternate' &&
        (v ? '[&:nth-child(even)]:flex-row-reverse' : '[&:nth-child(even)]:flex-col-reverse'),
      v &&
        align === 'alternate' &&
        '[&>[data-slot=timeline-opposite-zone]]:text-right [&>[data-slot=timeline-content-zone]]:text-left [&:nth-child(even)>[data-slot=timeline-opposite-zone]]:text-left [&:nth-child(even)>[data-slot=timeline-content-zone]]:text-right',
      this.hbInteractive() &&
        'cursor-pointer rounded-md outline-none transition-colors hover:bg-accent/40 focus-visible:ring-[3px] focus-visible:ring-ring/50',
      this.class(),
    );
  });

  protected readonly separatorClasses = computed(() =>
    cn(
      'flex shrink-0 self-stretch',
      this.vertical() ? 'flex-col items-center px-2' : 'flex-row items-center py-3',
    ),
  );
  protected readonly connectorZoneClasses = computed(() =>
    cn(
      'flex flex-1 items-center justify-center',
      this.vertical() ? 'flex-col' : 'flex-row',
    ),
  );
  protected readonly defaultLineClasses = computed(() =>
    cn('bg-border', this.vertical() ? 'w-0.5 flex-1' : 'h-0.5 flex-1'),
  );
  protected readonly oppositeZoneClasses = computed(() => {
    const align = this.timeline.align();
    if (!this.vertical()) return 'flex-1 px-3 pb-3 text-center';
    const base = 'flex-1 basis-0 px-3 py-1.5';
    if (align === 'right') return cn(base, 'text-right');
    if (align === 'left') return cn(base, 'text-left');
    return base;
  });
  protected readonly contentZoneClasses = computed(() => {
    const align = this.timeline.align();
    if (!this.vertical()) return 'min-w-0 flex-1 px-3 pt-3 text-center';
    const base = 'min-w-0 flex-1 basis-0 px-3 pb-8';
    if (align === 'right') return cn(base, 'text-left');
    if (align === 'left') return cn(base, 'text-right');
    return base;
  });

  protected onActivate(): void {
    if (this.hbInteractive()) this.hbSelect.emit();
  }
  protected onKeydown(event: KeyboardEvent): void {
    if (this.hbInteractive() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.hbSelect.emit();
    }
  }
}
