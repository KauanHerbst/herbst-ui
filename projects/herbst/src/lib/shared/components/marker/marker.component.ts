import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { HbSpinnerComponent } from '../spinner';
import { cn, type ClassValue } from '../../utils';
import {
  markerContentVariants,
  markerLineVariants,
  markerVariants,
  type HbMarkerVariant,
} from './marker.variants';

@Component({
  selector: 'hb-marker, a[hb-marker], button[hb-marker], [hb-marker]',
  imports: [HbSpinnerComponent],
  template: `
    @if (isSeparator()) {
      <span [class]="lineClasses" aria-hidden="true"></span>
    }

    @if (hbLoading()) {
      <hb-spinner hbSize="xs" [hbLabel]="hbLoadingLabel()" class="shrink-0" />
    } @else {
      <ng-content select="hb-marker-icon, [hb-marker-icon]" />
    }

    <span [class]="contentClasses()">
      <ng-content select="hb-marker-content, [hb-marker-content]" />
      <ng-content />
    </span>

    @if (isSeparator()) {
      <span [class]="lineClasses" aria-hidden="true"></span>
    }
  `,
  styles: `
    @keyframes hb-marker-shimmer {
      from {
        background-position: 200% 0;
      }
      to {
        background-position: -200% 0;
      }
    }
    .hb-marker-shimmer {
      background-image: linear-gradient(
        90deg,
        currentColor 0%,
        currentColor 35%,
        color-mix(in oklab, currentColor 25%, transparent) 50%,
        currentColor 65%,
        currentColor 100%
      );
      background-size: 200% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: hb-marker-shimmer 1.6s linear infinite;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'marker'",
    '[attr.data-variant]': 'hbVariant()',
    '[attr.role]': 'roleAttr()',
    '[attr.aria-live]': "hbLoading() ? 'polite' : null",
    '[attr.aria-busy]': "hbLoading() ? 'true' : null",
  },
  exportAs: 'hbMarker',
})
export class HbMarkerComponent {
  readonly hbVariant = input<HbMarkerVariant>('default');
  readonly hbLoading = input(false, { transform: booleanAttribute });
  readonly hbLoadingLabel = input('Loading');
  readonly hbShimmer = input(false, { transform: booleanAttribute });
  readonly hbRole = input<string | null>(null);
  readonly class = input<ClassValue>('');

  protected readonly isSeparator = computed(() => this.hbVariant() === 'separator');
  protected readonly lineClasses = markerLineVariants();
  protected readonly classes = computed(() =>
    cn(markerVariants({ variant: this.hbVariant() }), this.class()),
  );
  protected readonly contentClasses = computed(() =>
    cn(markerContentVariants(), this.hbShimmer() && 'hb-marker-shimmer'),
  );
  protected readonly roleAttr = computed(() => (this.hbLoading() ? 'status' : this.hbRole()));
}
