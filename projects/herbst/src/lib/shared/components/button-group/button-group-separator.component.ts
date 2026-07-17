import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_BUTTON_GROUP } from '../../core';
import {
  buttonGroupSeparatorVariants,
  type HbButtonGroupSeparatorOrientation,
} from './button-group.variants';

@Component({
  selector: 'hb-button-group-separator, [hb-button-group-separator]',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    role: 'separator',
    '[attr.aria-orientation]': 'effectiveOrientation()',
    '[attr.data-slot]': "'button-group-separator'",
  },
  exportAs: 'hbButtonGroupSeparator',
})
export class HbButtonGroupSeparatorComponent {
  private readonly group = inject(HB_BUTTON_GROUP, { optional: true });

  readonly hbOrientation = input<HbButtonGroupSeparatorOrientation | undefined>(undefined);
  readonly class = input<ClassValue>('');

  protected readonly effectiveOrientation = computed<HbButtonGroupSeparatorOrientation>(() => {
    const own = this.hbOrientation();
    if (own) return own;
    const groupOrientation = this.group?.orientation() ?? 'horizontal';
    return groupOrientation === 'horizontal' ? 'vertical' : 'horizontal';
  });

  protected readonly classes = computed(() =>
    cn(buttonGroupSeparatorVariants({ orientation: this.effectiveOrientation() }), this.class()),
  );
}
