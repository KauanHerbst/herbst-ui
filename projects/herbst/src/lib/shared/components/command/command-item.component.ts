import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { commandItemVariants } from './command.variants';
import { HB_COMMAND } from './command.token';

@Component({
  selector: 'hb-command-item, [hb-command-item]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'option',
    '[class]': 'classes()',
    '[style.display]': "matches() ? null : 'none'",
    '[attr.data-active]': 'active() || null',
    '[attr.data-disabled]': 'hbDisabled() || null',
    '[attr.aria-disabled]': 'hbDisabled() || null',
    '[attr.data-slot]': "'command-item'",
    '(click)': 'onClick()',
    '(mouseenter)': 'onEnter()',
  },
  exportAs: 'hbCommandItem',
})
export class HbCommandItemComponent {
  private readonly command = inject(HB_COMMAND);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbValue = input<unknown>(null);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbLabel = input('');
  readonly hbKeywords = input<string[]>([]);
  readonly hbSelect = output<unknown>();

  private readonly textLabel = signal('');
  readonly label = computed(() => this.hbLabel() || this.textLabel());
  readonly matches = computed(() => this.command.matchesFilter(this.label(), this.hbKeywords()));
  protected readonly active = computed(() => this.command.isActive(this));
  protected readonly classes = computed(() => commandItemVariants({ size: this.command.hbSize() }));

  constructor() {
    afterNextRender(() => this.textLabel.set((this.host.nativeElement.textContent ?? '').trim()));
  }
  protected onClick(): void {
    this.command.selectItem(this);
  }
  protected onEnter(): void {
    if (!this.hbDisabled()) this.command.setActive(this);
  }
  scrollIntoView(): void {
    this.host.nativeElement.scrollIntoView({ block: 'nearest' });
  }
}
