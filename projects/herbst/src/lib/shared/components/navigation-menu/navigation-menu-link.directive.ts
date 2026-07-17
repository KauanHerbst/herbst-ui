import {
  booleanAttribute,
  computed,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_NAV_MENU } from './navigation-menu.token';
import { navigationMenuLinkClass } from './navigation-menu.variants';

@Directive({
  selector: 'a[hbNavigationMenuLink], [hbNavigationMenuLink]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'navigation-menu-link'",
    '[attr.data-active]': 'hbActive() || null',
    '(click)': 'onClick()',
  },
  exportAs: 'hbNavigationMenuLink',
})
export class HbNavigationMenuLinkDirective {
  private readonly ctx = inject(HB_NAV_MENU, { optional: true });
  private readonly staticClass =
    (inject(ElementRef).nativeElement as HTMLElement).getAttribute('class') ?? '';

  readonly hbActive = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(navigationMenuLinkClass, this.staticClass, this.class()),
  );

  protected onClick(): void {
    this.ctx?.scheduleClose();
  }
}
