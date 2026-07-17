import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSpinnerGap } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { spinnerVariants, type HbSpinnerSize, type HbSpinnerVariant } from './spinner.variants';

@Component({
  selector: 'hb-spinner',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorSpinnerGap })],
  template: `
    @if (hbVariant() === 'bars') {
      <span class="relative left-1/2 top-1/2 block h-[inherit] w-[inherit]">
        @for (bar of bars; track $index) {
          <span
            class="animate-hb-spinner-bar absolute -left-[10%] -top-[3.9%] h-[8%] w-[24%] rounded-md bg-current"
            [style.animationDelay]="barDelay($index)"
            [style.transform]="barTransform($index)"
          ></span>
        }
      </span>
    } @else {
      <ng-icon [name]="hbIcon()" [class]="iconClasses()" />
    }
  `,
  styles: `
    @keyframes hb-spinner-bar {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0.15;
      }
    }
    .animate-hb-spinner-bar {
      animation: hb-spinner-bar 1.2s linear infinite;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    role: 'status',
    '[attr.aria-label]': 'hbLabel()',
    '[attr.data-slot]': "'spinner'",
    '[attr.data-variant]': 'hbVariant()',
  },
  exportAs: 'hbSpinner',
})
export class HbSpinnerComponent {
  readonly hbVariant = input<HbSpinnerVariant>('icon');
  readonly hbSize = input<HbSpinnerSize>('md');
  readonly hbIcon = input('phosphorSpinnerGap');
  readonly hbSpin = input(true, { transform: booleanAttribute });
  readonly hbLabel = input('Loading');
  readonly class = input<ClassValue>('');

  protected readonly bars = Array.from({ length: 12 });

  protected readonly classes = computed(() => cn(spinnerVariants({ size: this.hbSize() }), this.class()));
  protected readonly iconClasses = computed(() => (this.hbSpin() ? 'animate-spin' : ''));
  protected readonly barDelay = (index: number): string => `-${(1.3 - index * 0.1).toFixed(1)}s`;
  protected readonly barTransform = (index: number): string => `rotate(${30 * index}deg) translate(146%)`;
}
