import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkMenuItemRadio } from '@angular/cdk/menu';

import { cn, type ClassValue } from '../../utils';
import { HbMenuRadioGroupComponent } from './menu-radio-group.component';
import { menuIndicatorVariants, menuItemVariants, type HbMenuItemVariant } from './menu.variants';

@Component({
  selector: 'hb-menu-radio-item',
  hostDirectives: [CdkMenuItemRadio],
  template: `
    <span [class]="indicatorClasses">
      @if (checked()) {
        <span class="size-2 rounded-full bg-current"></span>
      }
    </span>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-disabled]': "cdk.disabled ? '' : null" },
  exportAs: 'hbMenuRadioItem',
})
export class HbMenuRadioItemComponent {
  private readonly group = inject(HbMenuRadioGroupComponent);
  protected readonly cdk = inject(CdkMenuItemRadio);

  readonly hbValue = input<unknown>(null);
  readonly hbVariant = input<HbMenuItemVariant>('default');
  readonly class = input<ClassValue>('');

  protected readonly checked = computed(() => this.group.isSelected(this.hbValue()));
  protected readonly indicatorClasses = cn(menuIndicatorVariants());
  protected readonly classes = computed(() =>
    cn(menuItemVariants({ variant: this.hbVariant(), inset: true }), this.class()),
  );

  constructor() {
    effect(() => (this.cdk.checked = this.checked()));
    this.cdk.triggered
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.group.select(this.hbValue()));
  }
}
