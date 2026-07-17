import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSlidersHorizontal } from '@ng-icons/phosphor-icons/regular';

import { HbCheckboxComponent } from '../checkbox';
import { HbPopoverImports } from '../popover';
import { HB_TABLE, type HbTableContext } from './table.token';

@Component({
  selector: 'hb-table-column-toggle',
  imports: [NgIcon, HbPopoverImports, HbCheckboxComponent],
  viewProviders: [provideIcons({ phosphorSlidersHorizontal })],
  template: `
    <hb-popover hbTrigger="click" hbSide="bottom" hbAlign="end">
      <button
        hbPopoverTrigger
        type="button"
        class="inline-flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
      >
        <ng-icon name="phosphorSlidersHorizontal" />
        {{ hbLabel() }}
      </button>
      <div hbPopoverContent class="flex min-w-40 flex-col gap-0.5 p-1">
        @for (col of ctx()?.columns() ?? []; track col.key) {
          <label
            class="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm hover:bg-accent"
          >
            <hb-checkbox
              hbSize="sm"
              [hbChecked]="ctx()!.isColumnVisible(col.key)"
              (hbChange)="ctx()!.toggleColumn(col.key)"
            />
            <span>{{ col.label }}</span>
          </label>
        }
      </div>
    </hb-popover>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'inline-flex', '[attr.data-slot]': "'table-column-toggle'" },
  exportAs: 'hbTableColumnToggle',
})
export class HbTableColumnToggleComponent {
  private readonly injected = inject(HB_TABLE, { optional: true });
  readonly hbTable = input<HbTableContext | null>(null);
  readonly hbLabel = input('Columns');
  protected readonly ctx = computed<HbTableContext | null>(() => this.hbTable() ?? this.injected);
}
