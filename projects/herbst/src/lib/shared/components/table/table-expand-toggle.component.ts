import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { HB_TABLE_ROW } from './table.token';

@Component({
  selector: 'hb-table-expand-toggle',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorCaretRight })],
  template: `
    <button
      type="button"
      class="inline-flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      [attr.aria-expanded]="row.isExpanded()"
      aria-label="Toggle row"
      (click)="onToggle($event)"
    >
      <ng-icon
        name="phosphorCaretRight"
        [class]="row.isExpanded() ? 'rotate-90 transition-transform' : 'transition-transform'"
      />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'inline-flex', '[attr.data-slot]': "'table-expand-toggle'" },
})
export class HbTableExpandToggleComponent {
  protected readonly row = inject(HB_TABLE_ROW);

  protected onToggle(event: MouseEvent): void {
    event.stopPropagation();
    this.row.toggleExpanded();
  }
}
