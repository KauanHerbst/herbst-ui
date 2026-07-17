import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  HB_BUTTON_GROUP,
  type HbButtonGroupContext,
  type HbButtonGroupOrientation,
  type HbButtonGroupSize,
} from '../../core';
import { buttonGroupVariants } from './button-group.variants';

@Component({
  selector: 'hb-button-group, [hb-button-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: HB_BUTTON_GROUP, useExisting: HbButtonGroupComponent }],
  host: {
    '[class]': 'classes()',
    role: 'group',
    '[attr.data-slot]': "'button-group'",
    '[attr.data-orientation]': 'hbOrientation()',
  },
  exportAs: 'hbButtonGroup',
})
export class HbButtonGroupComponent implements HbButtonGroupContext {
  readonly hbOrientation = input<HbButtonGroupOrientation>('horizontal');
  readonly hbSize = input<HbButtonGroupSize | null>(null);
  readonly class = input<ClassValue>('');

  readonly size = this.hbSize;
  readonly orientation = this.hbOrientation;

  protected readonly classes = computed(() =>
    cn(buttonGroupVariants({ orientation: this.hbOrientation() }), this.class()),
  );
}
