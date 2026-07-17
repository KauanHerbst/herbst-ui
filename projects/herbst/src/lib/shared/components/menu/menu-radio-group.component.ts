import { ChangeDetectionStrategy, Component, model, ViewEncapsulation } from '@angular/core';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { CdkMenuGroup } from '@angular/cdk/menu';

@Component({
  selector: 'hb-menu-radio-group',
  hostDirectives: [CdkMenuGroup],
  providers: [{ provide: UniqueSelectionDispatcher, useClass: UniqueSelectionDispatcher }],
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'menu-radio-group'" },
  exportAs: 'hbMenuRadioGroup',
})
export class HbMenuRadioGroupComponent {
  readonly hbValue = model<unknown>(null);
  isSelected(value: unknown): boolean {
    return this.hbValue() === value;
  }
  select(value: unknown): void {
    this.hbValue.set(value);
  }
}
