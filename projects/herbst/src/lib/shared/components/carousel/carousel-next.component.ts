import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown, phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbCarouselComponent } from './carousel.component';
import { carouselNavVariants } from './carousel.variants';

@Component({
  selector: 'hb-carousel-next',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorCaretRight, phosphorCaretDown })],
  template: `
    <button
      type="button"
      [class]="btnClasses()"
      [disabled]="!root.canScrollNext()"
      aria-label="Next slide"
      (click)="root.scrollNext()"
    >
      <ng-icon [name]="root.hbOrientation() === 'vertical' ? 'phosphorCaretDown' : 'phosphorCaretRight'" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'carousel-next'" },
  exportAs: 'hbCarouselNext',
})
export class HbCarouselNextComponent {
  protected readonly root = inject(HbCarouselComponent);
  readonly class = input<ClassValue>('');
  protected readonly btnClasses = computed(() =>
    cn(
      carouselNavVariants({ size: this.root.hbSize() }),
      this.root.hbOrientation() === 'vertical'
        ? 'bottom-3 left-1/2 -translate-x-1/2'
        : 'right-3 top-1/2 -translate-y-1/2',
      this.class(),
    ),
  );
}
