import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldLegendVariants, type HbFieldLegendVariant } from './field.variants';

@Component({
  selector: 'hb-field-legend, legend[hb-field-legend]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'field-legend'" },
  exportAs: 'hbFieldLegend',
})
export class HbFieldLegendComponent {
  readonly hbVariant = input<HbFieldLegendVariant>('legend');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(fieldLegendVariants({ variant: this.hbVariant() }), this.class()),
  );
}
