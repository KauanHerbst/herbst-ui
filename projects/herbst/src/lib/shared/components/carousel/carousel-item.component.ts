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
import { carouselItemVariants } from './carousel.variants';

@Component({
  selector: 'hb-carousel-item, [hb-carousel-item]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.padding-left.px]': 'padLeft()',
    '[style.padding-top.px]': 'padTop()',
    role: 'group',
    'aria-roledescription': 'slide',
    '[attr.data-slot]': "'carousel-item'",
  },
  exportAs: 'hbCarouselItem',
})
export class HbCarouselItemComponent {
  private readonly root = inject(HbCarouselComponent);
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(carouselItemVariants(), this.class()));
  protected readonly padLeft = computed(() =>
    this.root.hbOrientation() === 'horizontal' ? this.root.hbSpacing() : null,
  );
  protected readonly padTop = computed(() =>
    this.root.hbOrientation() === 'vertical' ? this.root.hbSpacing() : null,
  );
}
