import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import EmblaCarousel, {
  type EmblaCarouselType,
  type EmblaOptionsType,
  type EmblaPluginType,
} from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

import { cn, type ClassValue } from '../../utils';
import { type HbCarouselSize } from './carousel.variants';

@Component({
  selector: 'hb-carousel',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    role: 'region',
    'aria-roledescription': 'carousel',
    '[attr.data-slot]': "'carousel'",
  },
  exportAs: 'hbCarousel',
})
export class HbCarouselComponent {
  readonly hbOrientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly hbAlign = input<'start' | 'center' | 'end'>('start');
  readonly hbLoop = input(false, { transform: booleanAttribute });
  readonly hbDragFree = input(false, { transform: booleanAttribute });
  readonly hbSpacing = input(16, { transform: numberAttribute });
  readonly hbSize = input<HbCarouselSize>('md');
  readonly hbAutoplay = input(false, { transform: booleanAttribute });
  readonly hbDelay = input(4000, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  readonly hbSelect = output<number>();

  readonly api = signal<EmblaCarouselType | null>(null);
  readonly canScrollPrev = signal(false);
  readonly canScrollNext = signal(false);
  readonly selectedIndex = signal(0);
  readonly scrollSnaps = signal<number[]>([]);

  private readonly options = computed<EmblaOptionsType>(() => ({
    axis: this.hbOrientation() === 'vertical' ? 'y' : 'x',
    align: this.hbAlign(),
    loop: this.hbLoop(),
    dragFree: this.hbDragFree(),
    containScroll: 'trimSnaps',
  }));
  private buildPlugins(): EmblaPluginType[] {
    return this.hbAutoplay()
      ? [Autoplay({ delay: this.hbDelay(), stopOnMouseEnter: true, stopOnInteraction: false })]
      : [];
  }

  protected readonly hostClasses = computed(() => cn('relative', this.class()));

  constructor() {
    inject(DestroyRef).onDestroy(() => this.api()?.destroy());
    effect(() => {
      const opts = this.options();
      const autoplay = this.hbAutoplay();
      const delay = this.hbDelay();
      void autoplay;
      void delay;
      const api = untracked(() => this.api());
      api?.reInit(opts, this.buildPlugins());
    });
  }

  initialize(viewport: HTMLElement): void {
    const embla = EmblaCarousel(viewport, this.options(), this.buildPlugins());
    const update = (): void => {
      this.canScrollPrev.set(embla.canScrollPrev());
      this.canScrollNext.set(embla.canScrollNext());
      this.selectedIndex.set(embla.selectedScrollSnap());
      this.scrollSnaps.set(embla.scrollSnapList());
      this.hbSelect.emit(embla.selectedScrollSnap());
    };
    embla.on('select', update);
    embla.on('reInit', update);
    update();
    this.api.set(embla);
  }
  scrollPrev(): void {
    this.api()?.scrollPrev();
  }
  scrollNext(): void {
    this.api()?.scrollNext();
  }
  scrollTo(index: number): void {
    this.api()?.scrollTo(index);
  }
}
