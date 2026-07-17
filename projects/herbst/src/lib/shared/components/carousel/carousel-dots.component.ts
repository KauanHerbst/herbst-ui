import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbCarouselComponent } from './carousel.component';
import { carouselDotVariants } from './carousel.variants';

@Component({
  selector: 'hb-carousel-dots',
  template: `
    @for (snap of root.scrollSnaps(); track $index) {
      <button
        type="button"
        [class]="dotClass($index)"
        [attr.aria-label]="'Go to slide ' + ($index + 1)"
        [attr.aria-current]="root.selectedIndex() === $index"
        (click)="root.scrollTo($index)"
      ></button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'carousel-dots'" },
  exportAs: 'hbCarouselDots',
})
export class HbCarouselDotsComponent {
  protected readonly root = inject(HbCarouselComponent);
  readonly class = input<ClassValue>('');
  protected readonly hostClasses = computed(() =>
    cn('flex items-center justify-center gap-2', this.class()),
  );
  protected dotClass(index: number): string {
    return cn(
      carouselDotVariants({ size: this.root.hbSize(), active: this.root.selectedIndex() === index }),
    );
  }
}
