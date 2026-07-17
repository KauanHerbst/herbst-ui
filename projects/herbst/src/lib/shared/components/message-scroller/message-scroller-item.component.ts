import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { HB_MESSAGE_SCROLLER, type HbMessageScrollerItemRef } from './message-scroller.token';

@Component({
  selector: 'hb-message-scroller-item',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.data-slot]': "'message-scroller-item'",
    '[attr.data-message-id]': 'hbMessageId() || null',
    '[attr.data-anchor]': 'hbScrollAnchor() || null',
  },
  exportAs: 'hbMessageScrollerItem',
})
export class HbMessageScrollerItemComponent {
  private readonly ctx = inject(HB_MESSAGE_SCROLLER);
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly hbMessageId = input('');
  readonly hbScrollAnchor = input(false, { transform: booleanAttribute });

  private readonly ref: HbMessageScrollerItemRef = {
    messageId: () => this.hbMessageId(),
    anchor: () => this.hbScrollAnchor(),
    element: () => this.el.nativeElement,
  };

  constructor() {
    this.ctx.registerItem(this.ref);
    this.destroyRef.onDestroy(() => this.ctx.unregisterItem(this.ref));
  }
}
