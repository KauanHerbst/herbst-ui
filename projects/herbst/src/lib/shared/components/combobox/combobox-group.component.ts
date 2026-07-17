import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ViewEncapsulation,
} from '@angular/core';

import { HbComboboxItemComponent } from './combobox-item.component';

@Component({
  selector: 'hb-combobox-group, [hb-combobox-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'group',
    '[style.display]': "visible() ? null : 'none'",
    '[attr.data-slot]': "'combobox-group'",
  },
  exportAs: 'hbComboboxGroup',
})
export class HbComboboxGroupComponent {
  private readonly groupItems = contentChildren(HbComboboxItemComponent, { descendants: true });
  protected readonly visible = computed(() => {
    const items = this.groupItems();
    return items.length === 0 || items.some((i) => i.matches());
  });
}
