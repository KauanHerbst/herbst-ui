import { booleanAttribute, computed, Directive, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  TYPOGRAPHY_ALIGN,
  TYPOGRAPHY_COLOR,
  TYPOGRAPHY_WEIGHT,
  typographyVariants,
  type HbTypographyAlign,
  type HbTypographyColor,
  type HbTypographyVariant,
  type HbTypographyWeight,
} from './typography.variants';

@Directive({
  selector: '[hbTypography]',
  host: { '[class]': 'classes()', '[attr.data-slot]': "'typography'" },
  exportAs: 'hbTypography',
})
export class HbTypographyDirective {
  readonly hbTypography = input<HbTypographyVariant>('p');
  readonly hbColor = input<HbTypographyColor>();
  readonly hbAlign = input<HbTypographyAlign>();
  readonly hbWeight = input<HbTypographyWeight>();
  readonly hbTruncate = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      typographyVariants({ variant: this.hbTypography() }),
      this.hbColor() ? TYPOGRAPHY_COLOR[this.hbColor()!] : '',
      this.hbAlign() ? TYPOGRAPHY_ALIGN[this.hbAlign()!] : '',
      this.hbWeight() ? TYPOGRAPHY_WEIGHT[this.hbWeight()!] : '',
      this.hbTruncate() && 'truncate',
      this.class(),
    ),
  );
}
