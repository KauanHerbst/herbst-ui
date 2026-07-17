import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CdkMenuItemCheckbox } from '@angular/cdk/menu';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { menuIndicatorVariants, menuItemVariants, type HbMenuItemVariant } from './menu.variants';

@Component({
  selector: 'hb-menu-checkbox-item',
  imports: [NgIcon],
  hostDirectives: [CdkMenuItemCheckbox],
  viewProviders: [provideIcons({ phosphorCheck })],
  template: `
    <span [class]="indicatorClasses">
      @if (hbChecked()) {
        <ng-icon name="phosphorCheck" />
      }
    </span>
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-disabled]': "cdk.disabled ? '' : null" },
  exportAs: 'hbMenuCheckboxItem',
})
export class HbMenuCheckboxItemComponent {
  protected readonly cdk = inject(CdkMenuItemCheckbox);

  readonly hbChecked = model(false);
  readonly hbVariant = input<HbMenuItemVariant>('default');
  readonly class = input<ClassValue>('');

  protected readonly indicatorClasses = cn(menuIndicatorVariants());
  protected readonly classes = computed(() =>
    cn(menuItemVariants({ variant: this.hbVariant(), inset: true }), this.class()),
  );

  constructor() {
    effect(() => (this.cdk.checked = this.hbChecked()));
    this.cdk.triggered.pipe(takeUntilDestroyed()).subscribe(() => this.hbChecked.update((v) => !v));
  }
}
