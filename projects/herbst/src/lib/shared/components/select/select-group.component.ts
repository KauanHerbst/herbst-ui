import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ViewEncapsulation,
} from '@angular/core';

import { HbSelectItemComponent } from './select-item.component';

@Component({
  selector: 'hb-select-group, [hb-select-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'group',
    '[style.display]': "visible() ? null : 'none'",
    '[attr.data-slot]': "'select-group'",
  },
  exportAs: 'hbSelectGroup',
})
export class HbSelectGroupComponent {
  private readonly groupItems = contentChildren(HbSelectItemComponent, { descendants: true });
  protected readonly visible = computed(() => {
    const items = this.groupItems();
    return items.length === 0 || items.some((i) => i.matches());
  });
}
