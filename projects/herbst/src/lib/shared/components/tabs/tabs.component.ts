import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '../../utils';
import { HbTabsBase } from './tabs.base';
import { HB_TABS } from './tabs.token';
import { tabsRootVariants } from './tabs.variants';

@Component({
  selector: 'hb-tabs',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'rootClasses()',
    '[attr.data-slot]': "'tabs'",
    '[attr.data-position]': 'hbPosition()',
  },
  providers: [{ provide: HB_TABS, useExisting: forwardRef(() => HbTabsComponent) }],
  exportAs: 'hbTabs',
})
export class HbTabsComponent extends HbTabsBase {
  protected readonly rootClasses = computed(() =>
    cn(
      tabsRootVariants({ position: this.hbPosition() }),
      this.orientation() === 'vertical' && 'items-start',
      this.class(),
    ),
  );
}
