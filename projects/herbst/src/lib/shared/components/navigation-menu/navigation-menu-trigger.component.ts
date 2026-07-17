import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbNavigationMenuItemComponent } from './navigation-menu-item.component';
import { navigationMenuTriggerClass } from './navigation-menu.variants';

@Component({
  selector: 'hb-navigation-menu-trigger',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorCaretDown })],
  template: `
    <button
      #btn
      type="button"
      [class]="triggerClasses()"
      [attr.data-state]="item.isOpen() ? 'open' : 'closed'"
      [attr.aria-expanded]="item.isOpen()"
      (pointerenter)="item.hoverOpen()"
      (pointerleave)="item.scheduleClose()"
      (click)="item.toggle()"
      (keydown)="item.onKeydown($event)"
    >
      <ng-content />
      <ng-icon
        name="phosphorCaretDown"
        class="relative top-px ml-1 size-3 transition-transform duration-200"
        [class.rotate-180]="item.isOpen()"
      />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'inline-flex',
    '[attr.data-slot]': "'navigation-menu-trigger'",
  },
  exportAs: 'hbNavigationMenuTrigger',
})
export class HbNavigationMenuTriggerComponent {
  protected readonly item = inject(HbNavigationMenuItemComponent);
  private readonly btn = viewChild.required<ElementRef<HTMLButtonElement>>('btn');

  readonly class = input<ClassValue>('');

  protected readonly triggerClasses = computed(() =>
    cn(navigationMenuTriggerClass, this.class()),
  );

  constructor() {
    afterNextRender(() => this.item.setTriggerEl(this.btn().nativeElement));
  }
}
