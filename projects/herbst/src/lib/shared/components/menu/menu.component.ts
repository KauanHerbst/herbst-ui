import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import {
  CDK_MENU,
  CdkMenu,
  CdkMenuGroup,
  PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER,
} from '@angular/cdk/menu';

import { cn, type ClassValue } from '../../utils';
import { menuVariants } from './menu.variants';

@Component({
  selector: 'hb-menu',
  hostDirectives: [CdkMenu],
  providers: [
    { provide: CdkMenuGroup, useExisting: CdkMenu },
    { provide: CDK_MENU, useExisting: CdkMenu },
    PARENT_OR_NEW_INLINE_MENU_STACK_PROVIDER('vertical'),
  ],
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'menu'" },
  exportAs: 'hbMenu',
})
export class HbMenuComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(menuVariants(), this.class()));
}
