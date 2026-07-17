import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbLayoutSidebarComponent } from './layout-sidebar.component';
import { layoutClass, type HbLayoutDirection } from './layout.variants';

@Component({
  selector: 'hb-layout',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'layout'",
    '[attr.data-direction]': 'direction()',
  },
  exportAs: 'hbLayout',
})
export class HbLayoutComponent {
  readonly hbDirection = input<HbLayoutDirection>('auto');
  readonly class = input<ClassValue>('');

  private readonly sidebars = contentChildren(HbLayoutSidebarComponent);

  protected readonly direction = computed<'horizontal' | 'vertical'>(() => {
    const dir = this.hbDirection();
    if (dir !== 'auto') return dir;
    return this.sidebars().length > 0 ? 'horizontal' : 'vertical';
  });

  protected readonly classes = computed(() =>
    cn(layoutClass, this.direction() === 'horizontal' ? 'flex-row' : 'flex-col', this.class()),
  );
}
