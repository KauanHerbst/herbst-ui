import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import EmblaCarousel, { type EmblaCarouselType, type EmblaPluginType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretLeft, phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';

@Directive({ selector: '[hbGalleryItem]' })
export class HbGalleryItemDirective {}
@Directive({ selector: '[hbGalleryThumb]' })
export class HbGalleryThumbDirective {}

export type HbGalleryThumbsPosition = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'hb-gallery',
  imports: [NgIcon, NgTemplateOutlet],
  viewProviders: [provideIcons({ phosphorCaretLeft, phosphorCaretRight })],
  template: `
    <div [class]="layoutClasses()">
      <div class="relative min-w-0 flex-1">
        <div #mainViewport class="overflow-hidden rounded-lg">
          <div class="flex">
            @for (item of hbItems(); track $index) {
              <div class="min-w-0 shrink-0 grow-0 basis-full">
                <ng-container
                  [ngTemplateOutlet]="itemTpl() ?? null"
                  [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
                />
              </div>
            }
          </div>
        </div>

        @if (hbShowItemNavigators()) {
          <button
            type="button"
            class="absolute left-3 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-input bg-background/80 shadow-xs backdrop-blur transition-colors hover:bg-accent [&_ng-icon]:size-4"
            aria-label="Previous"
            (click)="prev()"
          >
            <ng-icon name="phosphorCaretLeft" />
          </button>
          <button
            type="button"
            class="absolute right-3 top-1/2 z-10 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-input bg-background/80 shadow-xs backdrop-blur transition-colors hover:bg-accent [&_ng-icon]:size-4"
            aria-label="Next"
            (click)="next()"
          >
            <ng-icon name="phosphorCaretRight" />
          </button>
        }

        @if (hbShowIndicators()) {
          <div class="absolute inset-x-0 bottom-3 flex items-center justify-center gap-2">
            @for (item of hbItems(); track $index) {
              <button
                type="button"
                class="size-2 rounded-full transition-colors"
                [class.bg-primary]="selectedIndex() === $index"
                [class.bg-background]="selectedIndex() !== $index"
                [attr.aria-current]="selectedIndex() === $index"
                (click)="scrollTo($index)"
              ></button>
            }
          </div>
        }
      </div>

      @if (hbShowThumbnails()) {
        <div
          #thumbViewport
          class="overflow-hidden"
          [style.height.px]="isVertical() ? hbThumbViewport() : null"
          [style.width.px]="isVertical() ? hbThumbWidth() : null"
        >
          <div [class]="isVertical() ? 'flex flex-col gap-2' : 'flex gap-2'">
            @for (item of hbItems(); track $index) {
              <button
                type="button"
                class="shrink-0 grow-0 overflow-hidden rounded-md border-2 opacity-60 transition-all data-[active=true]:border-primary data-[active=true]:opacity-100"
                [style.width.px]="isVertical() ? null : hbThumbSize()"
                [attr.data-active]="selectedIndex() === $index"
                (click)="scrollTo($index)"
              >
                <ng-container
                  [ngTemplateOutlet]="thumbTpl() ?? null"
                  [ngTemplateOutletContext]="{ $implicit: item, index: $index }"
                />
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'gallery'" },
  exportAs: 'hbGallery',
})
export class HbGalleryComponent {
  readonly hbItems = input<unknown[]>([]);
  readonly hbShowThumbnails = input(true, { transform: booleanAttribute });
  readonly hbThumbnailsPosition = input<HbGalleryThumbsPosition>('bottom');
  readonly hbShowIndicators = input(false, { transform: booleanAttribute });
  readonly hbShowItemNavigators = input(true, { transform: booleanAttribute });
  readonly hbLoop = input(false, { transform: booleanAttribute });
  readonly hbAutoplay = input(false, { transform: booleanAttribute });
  readonly hbDelay = input(4000, { transform: numberAttribute });
  readonly hbThumbSize = input(72, { transform: numberAttribute });
  readonly hbThumbWidth = input(88, { transform: numberAttribute });
  readonly hbThumbViewport = input(320, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  readonly hbSelect = output<number>();

  protected readonly itemTpl = contentChild(HbGalleryItemDirective, { read: TemplateRef });
  protected readonly thumbTpl = contentChild(HbGalleryThumbDirective, { read: TemplateRef });
  private readonly mainViewport = viewChild.required<ElementRef<HTMLElement>>('mainViewport');
  private readonly thumbViewport = viewChild<ElementRef<HTMLElement>>('thumbViewport');

  readonly selectedIndex = signal(0);
  private mainApi: EmblaCarouselType | null = null;
  private thumbApi: EmblaCarouselType | null = null;

  protected readonly isVertical = computed(
    () => this.hbThumbnailsPosition() === 'left' || this.hbThumbnailsPosition() === 'right',
  );
  protected readonly hostClasses = computed(() => cn('block', this.class()));
  protected readonly layoutClasses = computed(() => {
    switch (this.hbThumbnailsPosition()) {
      case 'top':
        return 'flex flex-col-reverse gap-3';
      case 'left':
        return 'flex flex-row gap-3';
      case 'right':
        return 'flex flex-row-reverse gap-3';
      default:
        return 'flex flex-col gap-3';
    }
  });

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.mainApi?.destroy();
      this.thumbApi?.destroy();
    });
    afterNextRender(() => this.initialize());
  }

  private buildPlugins(): EmblaPluginType[] {
    return this.hbAutoplay()
      ? [Autoplay({ delay: this.hbDelay(), stopOnMouseEnter: true, stopOnInteraction: false })]
      : [];
  }
  private initialize(): void {
    this.mainApi = EmblaCarousel(
      this.mainViewport().nativeElement,
      { loop: this.hbLoop(), align: 'center' },
      this.buildPlugins(),
    );
    const thumbEl = this.thumbViewport()?.nativeElement;
    if (thumbEl) {
      this.thumbApi = EmblaCarousel(thumbEl, {
        axis: this.isVertical() ? 'y' : 'x',
        containScroll: 'keepSnaps',
        dragFree: true,
      });
    }
    const onSelect = (): void => {
      const index = this.mainApi?.selectedScrollSnap() ?? 0;
      this.selectedIndex.set(index);
      this.thumbApi?.scrollTo(index);
      this.hbSelect.emit(index);
    };
    this.mainApi.on('select', onSelect);
    this.mainApi.on('reInit', onSelect);
    onSelect();
  }

  scrollTo(index: number): void {
    this.mainApi?.scrollTo(index);
  }
  prev(): void {
    this.mainApi?.scrollPrev();
  }
  next(): void {
    this.mainApi?.scrollNext();
  }
}
