import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HB_SIDEBAR_LAYOUT } from './sidebar.token';

@Component({
  selector: 'hb-sidebar-main',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'sidebar-main'",
    '(click)': 'onClick($event)',
  },
  exportAs: 'hbSidebarMain',
})
export class HbSidebarMainComponent {
  readonly class = input<ClassValue>('');

  private readonly layout = inject(HB_SIDEBAR_LAYOUT, { optional: true });

  protected readonly classes = computed(() => {
    const sidebar = this.layout?.first();
    const inset = sidebar?.variant() === 'inset';
    return cn(
      'relative flex min-w-0 flex-1 flex-col',
      inset && 'm-2 overflow-hidden rounded-xl border border-border bg-background shadow-sm',
      this.class(),
    );
  });

  protected onClick(event: Event): void {
    this.layout?.first()?.requestOutsideClose(event);
  }
}
