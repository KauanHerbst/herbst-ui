import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HB_MESSAGE_SCROLLER, type HbMessageScrollerContext } from './message-scroller.token';

@Component({
  selector: 'hb-message-scroller-button',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorCaretDown })],
  template: `
    <button
      type="button"
      [class]="buttonClasses()"
      [attr.data-visible]="visible() || null"
      [attr.aria-hidden]="!visible()"
      [tabindex]="visible() ? 0 : -1"
      aria-label="Scroll to latest messages"
      (click)="ctx.scrollToEnd(true)"
    >
      <ng-icon [name]="hbIcon()" />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center',
    '[attr.data-slot]': "'message-scroller-button'",
  },
  exportAs: 'hbMessageScrollerButton',
})
export class HbMessageScrollerButtonComponent {
  protected readonly ctx = inject<HbMessageScrollerContext>(HB_MESSAGE_SCROLLER);

  readonly hbIcon = input('phosphorCaretDown');
  readonly class = input<ClassValue>('');

  protected readonly visible = computed(() => this.ctx.scrollableEnd());
  protected readonly buttonClasses = computed(() =>
    cn(
      'pointer-events-auto inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-all hover:bg-accent',
      'opacity-0 translate-y-2 data-[visible]:translate-y-0 data-[visible]:opacity-100',
      !this.visible() && 'pointer-events-none',
      this.class(),
    ),
  );
}
