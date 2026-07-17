import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbNavigationMenuItemComponent } from './navigation-menu-item.component';

@Component({
  selector: 'hb-navigation-menu-content',
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #tpl><ng-content /></ng-template>
    @if (!item.useViewport() && item.isOpen()) {
      <div
        [class]="panelClasses()"
        data-state="open"
        (pointerenter)="item.cancelClose()"
        (pointerleave)="item.scheduleClose()"
      >
        <ng-container [ngTemplateOutlet]="tpl" />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'contents',
    '[attr.data-slot]': "'navigation-menu-content'",
  },
  exportAs: 'hbNavigationMenuContent',
})
export class HbNavigationMenuContentComponent {
  protected readonly item = inject(HbNavigationMenuItemComponent);
  private readonly tplRef = viewChild.required<TemplateRef<unknown>>('tpl');

  readonly class = input<ClassValue>('');

  protected readonly panelClasses = computed(() => {
    const pos = {
      bottom: 'left-0 top-full mt-1.5',
      top: 'left-0 bottom-full mb-1.5',
      right: 'left-full top-0 ml-1.5',
      left: 'right-full top-0 mr-1.5',
    }[this.item.side()];
    return cn(
      'absolute z-50 min-w-56 max-w-[calc(100vw-1rem)] rounded-md border border-border bg-popover p-2 text-popover-foreground shadow-lg',
      pos,
      this.class(),
    );
  });

  constructor() {
    afterNextRender(() => this.item.setContent(this.tplRef()));
  }
}
