import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';

import { HbTabListComponent } from './tab-list.component';
import { HbTabsBase } from './tabs.base';
import { HB_TABS } from './tabs.token';

@Component({
  selector: 'hb-tab-menu',
  imports: [HbTabListComponent],
  template: `<hb-tab-list [class]="class()"><ng-content /></hb-tab-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'block', '[attr.data-slot]': "'tab-menu'" },
  providers: [{ provide: HB_TABS, useExisting: forwardRef(() => HbTabMenuComponent) }],
  exportAs: 'hbTabMenu',
})
export class HbTabMenuComponent extends HbTabsBase {}
