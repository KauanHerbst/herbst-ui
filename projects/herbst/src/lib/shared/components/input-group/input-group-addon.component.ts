import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { inputGroupAddonVariants, type HbInputGroupAlign } from './input-group.variants';

@Component({
  selector: 'hb-input-group-addon, [hb-input-group-addon]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-align]': 'hbAlign()',
    '[attr.data-slot]': "'input-group-addon'",
  },
  exportAs: 'hbInputGroupAddon',
})
export class HbInputGroupAddonComponent {
  readonly hbAlign = input<HbInputGroupAlign>('inline-start');
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() =>
    cn(inputGroupAddonVariants({ align: this.hbAlign() }), this.class()),
  );
}
