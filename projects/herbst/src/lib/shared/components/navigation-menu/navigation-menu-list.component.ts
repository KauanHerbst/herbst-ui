import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_NAV_MENU, type HbNavMenuContext } from './navigation-menu.token';

@Component({
  selector: 'hb-navigation-menu-list',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'list',
    '[class]': 'classes()',
    '[attr.data-slot]': "'navigation-menu-list'",
    '[attr.data-orientation]': 'ctx.orientation()',
  },
  exportAs: 'hbNavigationMenuList',
})
export class HbNavigationMenuListComponent {
  protected readonly ctx = inject<HbNavMenuContext>(HB_NAV_MENU);
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'group/nav-list flex flex-1 list-none items-center justify-center gap-1 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
      this.class(),
    ),
  );
}
