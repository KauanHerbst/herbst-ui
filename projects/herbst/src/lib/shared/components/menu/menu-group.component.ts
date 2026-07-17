import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hb-menu-group, [hb-menu-group]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { role: 'group', '[attr.data-slot]': "'menu-group'" },
  exportAs: 'hbMenuGroup',
})
export class HbMenuGroupComponent {}
