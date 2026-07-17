import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbCardComponent } from './card.component';
import { cardImageVariants, type HbCardImageFit, type HbCardSize } from './card.variants';

@Component({
  selector: 'hb-card-image',
  template: `
    <img
      [src]="hbSrc()"
      [alt]="hbAlt()"
      [class]="imgClasses()"
      [style.aspectRatio]="hbRatio() || null"
      [style.height.px]="hbHeight() || null"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'card-image'" },
  exportAs: 'hbCardImage',
})
export class HbCardImageComponent {
  private readonly card = inject(HbCardComponent);

  readonly hbSrc = input('');
  readonly hbAlt = input('');
  readonly hbPosition = input<'top' | 'bottom'>('top');
  readonly hbFit = input<HbCardImageFit>('cover');
  readonly hbRatio = input<number | null>(null);
  readonly hbHeight = input(0, { transform: numberAttribute });
  readonly class = input<ClassValue>('');

  private readonly bleed: Record<HbCardSize, { top: string; bottom: string }> = {
    xs: { top: '-mt-3', bottom: '-mb-3' },
    sm: { top: '-mt-4', bottom: '-mb-4' },
    md: { top: '-mt-6', bottom: '-mb-6' },
    lg: { top: '-mt-8', bottom: '-mb-8' },
    xl: { top: '-mt-10', bottom: '-mb-10' },
  };

  protected readonly hostClasses = computed(() => {
    const b = this.bleed[this.card.hbSize()];
    return cn('block', this.hbPosition() === 'top' ? b.top : b.bottom);
  });
  protected readonly imgClasses = computed(() =>
    cn(cardImageVariants({ fit: this.hbFit() }), this.class()),
  );
}
