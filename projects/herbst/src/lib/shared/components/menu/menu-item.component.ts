import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CdkMenuItem } from '@angular/cdk/menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbMenuTriggerDirective } from './menu-trigger.directive';
import { menuItemVariants, type HbMenuItemVariant } from './menu.variants';

@Component({
  selector: 'hb-menu-item, button[hb-menu-item], a[hb-menu-item]',
  imports: [NgIcon],
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled: hbDisabled'],
      outputs: ['cdkMenuItemTriggered: hbSelect'],
    },
  ],
  viewProviders: [provideIcons({ phosphorCaretRight })],
  template: `
    <ng-content />
    @if (isSubmenu) {
      <ng-icon name="phosphorCaretRight" class="ml-auto size-4" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-disabled]': "cdkItem.disabled ? '' : null" },
  exportAs: 'hbMenuItem',
})
export class HbMenuItemComponent {
  protected readonly cdkItem = inject(CdkMenuItem);
  protected readonly isSubmenu = !!inject(HbMenuTriggerDirective, { optional: true, self: true });

  readonly hbVariant = input<HbMenuItemVariant>('default');
  readonly hbInset = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(menuItemVariants({ variant: this.hbVariant(), inset: this.hbInset() }), this.class()),
  );
}
