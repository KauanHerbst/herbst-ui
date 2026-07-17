import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '../../utils';
import { HbCarouselComponent } from './carousel.component';

@Component({
  selector: 'hb-carousel-content, [hb-carousel-content]',
  template: `
    <div #viewport class="overflow-hidden">
      <div
        [class]="containerClasses()"
        [style.margin-left.px]="marginLeft()"
        [style.margin-top.px]="marginTop()"
      >
        <ng-content />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'carousel-content'" },
  exportAs: 'hbCarouselContent',
})
export class HbCarouselContentComponent {
  private readonly root = inject(HbCarouselComponent);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');

  protected readonly containerClasses = computed(() =>
    cn('flex', this.root.hbOrientation() === 'vertical' ? 'flex-col' : 'flex-row'),
  );
  protected readonly marginLeft = computed(() =>
    this.root.hbOrientation() === 'horizontal' ? -this.root.hbSpacing() : null,
  );
  protected readonly marginTop = computed(() =>
    this.root.hbOrientation() === 'vertical' ? -this.root.hbSpacing() : null,
  );

  constructor() {
    afterNextRender(() => this.root.initialize(this.viewport().nativeElement));
  }
}
