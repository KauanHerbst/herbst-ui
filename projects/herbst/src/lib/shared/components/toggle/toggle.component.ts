import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { cn, type ClassValue } from '../../utils';
import { HB_TOGGLE_GROUP, type HbToggleGroupContext, type HbToggleItemRef } from './toggle.token';
import {
  toggleVariants,
  type HbToggleSize,
  type HbToggleVariant,
} from './toggle.variants';

@Component({
  selector: 'hb-toggle',
  imports: [NgIcon],
  template: `
    @if (hbIcon()) {
      <ng-icon [name]="hbIcon()" />
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'button',
    '[class]': 'classes()',
    '[attr.data-slot]': "'toggle'",
    '[attr.data-state]': "pressed() ? 'on' : 'off'",
    '[attr.aria-pressed]': 'pressed()',
    '[attr.aria-disabled]': 'isDisabled() || null',
    '[attr.data-disabled]': 'isDisabled() || null',
    '[attr.tabindex]': 'tabindex()',
    '(click)': 'onClick()',
    '(keydown)': 'onKeydown($event)',
  },
  exportAs: 'hbToggle',
})
export class HbToggleComponent {
  protected readonly group = inject<HbToggleGroupContext | null>(HB_TOGGLE_GROUP, {
    optional: true,
  });
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly hbPressed = model(false);
  readonly hbValue = input<unknown>(null);
  readonly hbVariant = input<HbToggleVariant | null>(null);
  readonly hbSize = input<HbToggleSize | null>(null);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbIcon = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<boolean>();

  private readonly ref: HbToggleItemRef = {
    value: () => this.hbValue(),
    element: () => this.el.nativeElement,
    disabled: () => this.hbDisabled(),
  };

  protected readonly pressed = computed(() =>
    this.group ? this.group.isSelected(this.hbValue()) : this.hbPressed(),
  );
  protected readonly isDisabled = computed(
    () => this.hbDisabled() || (this.group?.disabled() ?? false),
  );
  private readonly effVariant = computed<HbToggleVariant>(
    () => this.hbVariant() ?? this.group?.variant() ?? 'default',
  );
  private readonly effSize = computed<HbToggleSize>(
    () => this.hbSize() ?? this.group?.size() ?? 'md',
  );
  protected readonly tabindex = computed(() => {
    if (this.isDisabled()) return -1;
    if (this.group) return this.group.isActiveItem(this.ref) ? 0 : -1;
    return 0;
  });
  protected readonly classes = computed(() =>
    cn(toggleVariants({ variant: this.effVariant(), size: this.effSize() }), this.class()),
  );

  constructor() {
    if (this.group) {
      this.group.registerItem(this.ref);
      this.destroyRef.onDestroy(() => this.group?.unregisterItem(this.ref));
    }
  }

  protected onClick(): void {
    if (this.isDisabled()) return;
    if (this.group) {
      this.group.toggle(this.hbValue());
    } else {
      this.hbPressed.update((v) => !v);
    }
    this.hbChange.emit(this.pressed());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onClick();
      return;
    }
    if (this.group) this.group.onItemKeydown(this.ref, event);
  }
}
