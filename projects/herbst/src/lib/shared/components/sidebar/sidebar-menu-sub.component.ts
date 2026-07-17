import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_SIDEBAR_MENU_ITEM } from './sidebar.token';
import { sidebarMenuSubClass } from './sidebar.variants';

@Component({
  selector: 'hb-sidebar-menu-sub',
  template: `
    <div class="min-h-0 overflow-hidden">
      <ul [class]="ulClasses()" data-slot="sidebar-menu-sub-list" role="menu">
        <ng-content />
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-menu-sub'",
  },
  exportAs: 'hbSidebarMenuSub',
})
export class HbSidebarMenuSubComponent {
  readonly class = input<ClassValue>('');

  private readonly item = inject(HB_SIDEBAR_MENU_ITEM, { optional: true });

  private readonly hidden = computed(() => !!this.item?.collapsibleItem() && !this.item.open());

  protected readonly classes = computed(() =>
    cn(
      'grid transition-[grid-template-rows] duration-200 ease-out',
      this.hidden() ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
    ),
  );
  protected readonly ulClasses = computed(() => cn(sidebarMenuSubClass, this.class()));
}
