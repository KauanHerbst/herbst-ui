import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretLeft, phosphorCaretUp } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbCarouselComponent } from './carousel.component';
import { carouselNavVariants } from './carousel.variants';

@Component({
  selector: 'hb-carousel-previous',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorCaretLeft, phosphorCaretUp })],
  template: `
    <button
      type="button"
      [class]="btnClasses()"
      [disabled]="!root.canScrollPrev()"
      aria-label="Previous slide"
      (click)="root.scrollPrev()"
    >
      <ng-icon [name]="root.hbOrientation() === 'vertical' ? 'phosphorCaretUp' : 'phosphorCaretLeft'" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'carousel-previous'" },
  exportAs: 'hbCarouselPrevious',
})
export class HbCarouselPreviousComponent {
  protected readonly root = inject(HbCarouselComponent);
  readonly class = input<ClassValue>('');
  protected readonly btnClasses = computed(() =>
    cn(
      carouselNavVariants({ size: this.root.hbSize() }),
      this.root.hbOrientation() === 'vertical'
        ? 'left-1/2 top-3 -translate-x-1/2'
        : 'left-3 top-1/2 -translate-y-1/2',
      this.class(),
    ),
  );
}
