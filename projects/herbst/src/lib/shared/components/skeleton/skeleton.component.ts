import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  skeletonVariants,
  SKELETON_BOX_SIZE,
  SKELETON_ROUNDED,
  SKELETON_TEXT_SIZE,
  type HbSkeletonAnimation,
  type HbSkeletonRounded,
  type HbSkeletonShape,
  type HbSkeletonSize,
} from './skeleton.variants';

@Component({
  selector: 'hb-skeleton',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: `
    .hb-skeleton-wave::after {
      content: '';
      position: absolute;
      inset: 0;
      transform: translateX(-100%);
      background: linear-gradient(
        90deg,
        transparent,
        color-mix(in oklab, currentColor 8%, transparent),
        transparent
      );
      animation: hb-skeleton-wave 1.6s ease-in-out infinite;
    }
    @keyframes hb-skeleton-wave {
      100% {
        transform: translateX(100%);
      }
    }
  `,
  host: {
    '[class]': 'classes()',
    '[style.width]': 'hbWidth() || null',
    '[style.height]': 'hbHeight() || null',
    '[attr.data-slot]': "'skeleton'",
    '[attr.data-shape]': 'hbShape()',
    'aria-hidden': 'true',
  },
  exportAs: 'hbSkeleton',
})
export class HbSkeletonComponent {
  readonly hbShape = input<HbSkeletonShape>('rectangle');
  readonly hbSize = input<HbSkeletonSize>('md');
  readonly hbWidth = input<string>('');
  readonly hbHeight = input<string>('');
  readonly hbRounded = input<HbSkeletonRounded>();
  readonly hbAnimation = input<HbSkeletonAnimation>('pulse');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => {
    const shape = this.hbShape();
    const hasExplicitSize = !!this.hbWidth() || !!this.hbHeight();
    let dims = '';
    if (shape === 'circle' || shape === 'square') {
      dims = hasExplicitSize ? '' : SKELETON_BOX_SIZE[this.hbSize()];
    } else if (shape === 'text') {
      dims = SKELETON_TEXT_SIZE[this.hbSize()];
    } else {
      dims = this.hbHeight() ? '' : 'h-4';
    }
    const rounded = this.hbRounded() ? SKELETON_ROUNDED[this.hbRounded()!] : '';
    return cn(
      skeletonVariants({ animation: this.hbAnimation(), shape }),
      dims,
      rounded,
      this.class(),
    );
  });
}
