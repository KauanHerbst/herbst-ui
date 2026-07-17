import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'hb-command-list',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': "'max-h-[300px] overflow-y-auto overflow-x-hidden p-1'", '[attr.data-slot]': "'command-list'" },
  exportAs: 'hbCommandList',
})
export class HbCommandListComponent {}
