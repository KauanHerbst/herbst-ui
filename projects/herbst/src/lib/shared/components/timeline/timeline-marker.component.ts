import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { cn, type ClassValue } from '../../utils';
import {
  timelineMarkerVariants,
  type HbTimelineColor,
  type HbTimelineMarkerVariant,
} from './timeline.variants';

@Component({
  selector: 'hb-timeline-marker',
  imports: [NgIcon],
  template: `
    @if (hbIcon()) {
      <ng-icon [name]="hbIcon()" />
    } @else {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'timeline-marker'",
  },
  exportAs: 'hbTimelineMarker',
})
export class HbTimelineMarkerComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbIcon = input<string>('');
  readonly hbColor = input<HbTimelineColor>('primary');
  readonly hbVariant = input<HbTimelineMarkerVariant>('solid');
  readonly class = input<ClassValue>('');

  private readonly hasContent = signal(false);

  protected readonly classes = computed(() => {
    const swatch = timelineMarkerVariants({ color: this.hbColor(), variant: this.hbVariant() });
    if (this.hbIcon()) return cn('size-7 text-sm', swatch, this.class());
    if (this.hasContent()) return cn('inline-flex shrink-0 items-center justify-center', this.class());
    return cn('size-3', swatch, this.class());
  });

  constructor() {
    afterNextRender(() => {
      const el = this.host.nativeElement;
      this.hasContent.set(el.childElementCount > 0 || (el.textContent ?? '').trim().length > 0);
    });
  }
}
