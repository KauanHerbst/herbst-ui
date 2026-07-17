import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretDown,
  phosphorCaretRight,
  phosphorCaretUp,
  phosphorCaretUpDown,
} from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HB_TABLE } from './table.token';
import { tableHeadVariants } from './table.variants';

@Component({
  selector: 'th[hb-table-head]',
  imports: [NgIcon],
  viewProviders: [
    provideIcons({ phosphorCaretUp, phosphorCaretDown, phosphorCaretUpDown, phosphorCaretRight }),
  ],
  template: `
    <span class="inline-flex items-center gap-1">
      <ng-content />
      @if (sortable()) {
        <ng-icon [name]="sortIcon()" [class]="order() === 0 ? 'text-muted-foreground/60' : ''" />
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'table-head'",
    '[attr.aria-sort]': 'ariaSort()',
    '[attr.data-column]': 'hbColumn() || null',
    '[hidden]': 'isHidden()',
    '(click)': 'onClick()',
  },
  exportAs: 'hbTableHead',
})
export class HbTableHeadComponent {
  private readonly table = inject(HB_TABLE, { optional: true });
  private readonly destroyRef = inject(DestroyRef);

  readonly hbSortField = input<string>('');
  readonly hbColumn = input<string>('');
  readonly hbColumnLabel = input<string>('');
  readonly class = input<ClassValue>('');

  protected readonly isHidden = computed(
    () => !!this.hbColumn() && !!this.table && !this.table.isColumnVisible(this.hbColumn()),
  );

  constructor() {
    let key = '';
    effect(() => {
      const col = this.hbColumn();
      if (col && col !== key && this.table) {
        if (key) this.table.unregisterColumn(key);
        key = col;
        this.table.registerColumn({ key: col, label: this.hbColumnLabel() || col });
      }
    });
    this.destroyRef.onDestroy(() => {
      if (key) this.table?.unregisterColumn(key);
    });
  }

  protected readonly sortable = computed(() => !!this.hbSortField() && !!this.table);
  protected readonly order = computed<0 | 1 | -1>(() =>
    this.sortable() ? this.table!.sortOrderOf(this.hbSortField()) : 0,
  );
  protected readonly sortIcon = computed(() =>
    this.order() === 1
      ? 'phosphorCaretUp'
      : this.order() === -1
        ? 'phosphorCaretDown'
        : 'phosphorCaretUpDown',
  );
  protected readonly ariaSort = computed(() => {
    if (!this.sortable()) return null;
    return this.order() === 1 ? 'ascending' : this.order() === -1 ? 'descending' : 'none';
  });
  protected readonly classes = computed(() =>
    cn(tableHeadVariants({ sortable: this.sortable() }), this.class()),
  );

  protected onClick(): void {
    if (this.sortable()) this.table!.sortBy(this.hbSortField());
  }
}
