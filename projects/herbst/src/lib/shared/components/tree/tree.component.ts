import { NgTemplateOutlet } from '@angular/common';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbCheckboxComponent } from '../checkbox';
import { HbInputDirective } from '../input';
import { HbSkeletonComponent } from '../skeleton';
import { HbSpinnerComponent } from '../spinner';
import { HbTreeNodeContentDirective } from './tree-node-content.directive';
import { HbTreeToggleDirective } from './tree-toggle.directive';
import { treeRowVariants, treeToggleClass } from './tree.variants';
import {
  type HbTreeFilterMode,
  type HbTreeFlatNode,
  type HbTreeIndexEntry,
  type HbTreeKey,
  type HbTreeNode,
  type HbTreeSelectionMode,
} from './tree.types';

@Component({
  selector: 'hb-tree',
  imports: [
    NgTemplateOutlet,
    NgIcon,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    CdkFixedSizeVirtualScroll,
    HbCheckboxComponent,
    HbInputDirective,
    HbSpinnerComponent,
    HbSkeletonComponent,
  ],
  viewProviders: [provideIcons({ phosphorCaretRight })],
  template: `
    @if (hbShowFilter()) {
      <input
        hbInput
        class="mb-2"
        type="search"
        [placeholder]="hbFilterPlaceholder()"
        [value]="builtinFilter()"
        (input)="builtinFilter.set($any($event.target).value)"
      />
    }

    @if (hbCheckable() && hbShowSelectAll()) {
      <label class="mb-1 flex h-8 items-center gap-2 px-1 text-sm">
        <hb-checkbox
          hbSize="sm"
          [hbChecked]="allChecked()"
          [hbIndeterminate]="someChecked()"
          (hbChange)="toggleAll()"
        />
        <span class="font-medium">Select all</span>
      </label>
    }

    <div
      role="tree"
      class="relative outline-none"
      [attr.aria-label]="hbAriaLabel() || null"
      (keydown)="onKeydown($event)"
    >
      @if (hbLoading()) {
        @for (row of skeletonRows(); track $index) {
          <div class="flex h-8 items-center gap-2 px-1" [style.paddingLeft.px]="12">
            <hb-skeleton hbShape="text" hbSize="md" [hbWidth]="skeletonWidth($index)" />
          </div>
        }
      } @else if (hbVirtualScroll()) {
        <cdk-virtual-scroll-viewport [itemSize]="hbItemSize()" [style.height]="hbScrollHeight()">
          <ng-container *cdkVirtualFor="let flat of flatList(); trackBy: trackByKey">
            <ng-container *ngTemplateOutlet="rowTpl; context: { $implicit: flat }" />
          </ng-container>
        </cdk-virtual-scroll-viewport>
      } @else {
        @for (flat of flatList(); track flat.node.key) {
          <ng-container *ngTemplateOutlet="rowTpl; context: { $implicit: flat }" />
        }
      }
    </div>

    <ng-template #rowTpl let-flat>
      <div
        role="treeitem"
        [class]="rowClasses(flat.node)"
        [attr.data-key]="flat.node.key"
        [attr.data-selected]="isSelected(flat.node.key) || null"
        [attr.data-disabled]="flat.node.disabled || null"
        [attr.aria-level]="flat.level + 1"
        [attr.aria-expanded]="flat.expandable ? flat.expanded : null"
        [attr.aria-selected]="hbSelectionMode() !== 'none' ? isSelected(flat.node.key) : null"
        [attr.tabindex]="isActive(flat.node.key) ? 0 : -1"
        [style.paddingLeft.px]="flat.level * hbIndent() + 4"
        (click)="onRowClick(flat, $event)"
      >
        @if (flat.expandable) {
          <button
            type="button"
            [class]="treeToggleClass"
            [attr.data-expanded]="flat.expanded"
            aria-label="Toggle"
            (click)="onToggle(flat.node, $event)"
          >
            @if (toggleTpl(); as tpl) {
              <ng-container
                *ngTemplateOutlet="tpl; context: { $implicit: flat.expanded, node: flat.node }"
              />
            } @else {
              <ng-icon [name]="hbToggleIcon()" />
            }
          </button>
        } @else {
          <span class="size-5 shrink-0"></span>
        }

        @if (hbCheckable()) {
          <hb-checkbox
            hbSize="sm"
            class="shrink-0"
            [hbChecked]="isChecked(flat.node.key)"
            [hbIndeterminate]="isIndeterminate(flat.node.key)"
            [hbDisabled]="flat.node.disabled || flat.node.selectable === false"
            (hbChange)="toggleCheck(flat.node)"
            (click)="$event.stopPropagation()"
          />
        }

        @if (flat.node.loading) {
          <hb-spinner hbSize="xs" class="shrink-0" />
        } @else if (flat.node.icon) {
          <ng-icon [name]="flat.node.icon" class="shrink-0 text-muted-foreground" />
        }

        @if (nodeTpl(); as tpl) {
          <ng-container
            *ngTemplateOutlet="tpl; context: { $implicit: flat.node, level: flat.level }"
          />
        } @else {
          <span class="truncate">{{ flat.node.label }}</span>
        }
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'tree'" },
  exportAs: 'hbTree',
})
export class HbTreeComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly treeToggleClass = treeToggleClass;

  readonly hbNodes = input<HbTreeNode[]>([]);
  readonly hbExpanded = model<HbTreeKey[]>([]);
  readonly hbSelection = model<HbTreeKey[]>([]);
  readonly hbChecked = model<HbTreeKey[]>([]);

  readonly hbSelectionMode = input<HbTreeSelectionMode>('single');
  readonly hbMetaKeySelection = input(false, { transform: booleanAttribute });
  readonly hbCheckable = input(false, { transform: booleanAttribute });
  readonly hbCheckStrictly = input(false, { transform: booleanAttribute });
  readonly hbShowSelectAll = input(false, { transform: booleanAttribute });

  readonly hbFilter = input('');
  readonly hbShowFilter = input(false, { transform: booleanAttribute });
  readonly hbFilterMode = input<HbTreeFilterMode>('lenient');
  readonly hbFilterPlaceholder = input('Filter…');

  readonly hbVirtualScroll = input(false, { transform: booleanAttribute });
  readonly hbItemSize = input(32, { transform: numberAttribute });
  readonly hbScrollHeight = input('16rem');

  readonly hbLazy = input(false, { transform: booleanAttribute });
  readonly hbLoading = input(false, { transform: booleanAttribute });
  readonly hbSkeletonRows = input(6, { transform: numberAttribute });

  readonly hbToggleIcon = input('phosphorCaretRight');
  readonly hbIndent = input(16, { transform: numberAttribute });
  readonly hbAriaLabel = input('');
  readonly class = input<ClassValue>('');

  readonly hbNodeExpand = output<HbTreeNode>();
  readonly hbNodeCollapse = output<HbTreeNode>();
  readonly hbNodeClick = output<HbTreeNode>();

  protected readonly toggleTpl = contentChild(HbTreeToggleDirective, { read: TemplateRef });
  protected readonly nodeTpl = contentChild(HbTreeNodeContentDirective, { read: TemplateRef });

  protected readonly builtinFilter = signal('');
  private readonly activeKey = signal<HbTreeKey | null>(null);

  protected readonly trackByKey = (_: number, flat: HbTreeFlatNode) => flat.node.key;

  private readonly index = computed(() => {
    const map = new Map<HbTreeKey, HbTreeIndexEntry>();
    const walk = (
      nodes: HbTreeNode[],
      parentKey: HbTreeKey | null,
      level: number,
      ancestors: HbTreeKey[],
    ): void => {
      for (const node of nodes) {
        const childKeys = (node.children ?? []).map((c) => c.key);
        const entry: HbTreeIndexEntry = {
          node,
          parentKey,
          level,
          childKeys,
          descendantKeys: [],
          ancestorKeys: ancestors,
        };
        map.set(node.key, entry);
        if (node.children?.length) {
          walk(node.children, node.key, level + 1, [...ancestors, node.key]);
          entry.descendantKeys = node.children.flatMap((c) => [
            c.key,
            ...(map.get(c.key)?.descendantKeys ?? []),
          ]);
        }
      }
    };
    walk(this.hbNodes(), null, 0, []);
    return map;
  });

  protected isExpandable(node: HbTreeNode): boolean {
    if (node.leaf) return false;
    return (node.children?.length ?? 0) > 0 || this.hbLazy();
  }

  private readonly query = computed(() =>
    (this.hbShowFilter() ? this.builtinFilter() : this.hbFilter()).trim().toLowerCase(),
  );
  private readonly filterResult = computed(() => {
    const q = this.query();
    if (!q) return null;
    const idx = this.index();
    const visible = new Set<HbTreeKey>();
    const forceExpand = new Set<HbTreeKey>();
    for (const [key, entry] of idx) {
      if (!entry.node.label.toLowerCase().includes(q)) continue;
      visible.add(key);
      for (const a of entry.ancestorKeys) {
        visible.add(a);
        forceExpand.add(a);
      }
      if (this.hbFilterMode() === 'lenient') {
        forceExpand.add(key);
        for (const d of entry.descendantKeys) visible.add(d);
      }
    }
    return { visible, forceExpand };
  });

  protected readonly flatList = computed<HbTreeFlatNode[]>(() => {
    const expandedSet = new Set(this.hbExpanded());
    const filter = this.filterResult();
    const out: HbTreeFlatNode[] = [];
    const walk = (nodes: HbTreeNode[], level: number, parentKey: HbTreeKey | null): void => {
      for (const node of nodes) {
        if (filter && !filter.visible.has(node.key)) continue;
        const expandable = this.isExpandable(node);
        const expanded =
          expandable &&
          (expandedSet.has(node.key) || (filter?.forceExpand.has(node.key) ?? false));
        out.push({ node, level, expandable, expanded, parentKey });
        if (expanded && node.children?.length) walk(node.children, level + 1, node.key);
      }
    };
    walk(this.hbNodes(), 0, null);
    return out;
  });

  protected readonly skeletonRows = computed(() =>
    Array.from({ length: Math.max(1, this.hbSkeletonRows()) }),
  );
  protected skeletonWidth(index: number): string {
    return `${[70, 55, 80, 45, 65, 60][index % 6]}%`;
  }

  protected readonly hostClasses = computed(() => cn('block w-full', this.class()));
  protected rowClasses(node: HbTreeNode): string {
    return treeRowVariants({
      selectable: node.selectable !== false && this.hbSelectionMode() !== 'none',
    });
  }

  isSelected(key: HbTreeKey): boolean {
    return this.hbSelection().includes(key);
  }
  private select(node: HbTreeNode, event?: MouseEvent): void {
    if (this.hbSelectionMode() === 'none' || node.selectable === false || node.disabled) return;
    const key = node.key;
    if (this.hbSelectionMode() === 'single') {
      this.hbSelection.set(this.isSelected(key) ? [] : [key]);
    } else {
      const additive = !this.hbMetaKeySelection() || !!(event && (event.ctrlKey || event.metaKey));
      const current = this.hbSelection();
      if (additive) {
        this.hbSelection.set(
          current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
        );
      } else {
        this.hbSelection.set(current.length === 1 && current[0] === key ? [] : [key]);
      }
    }
    this.hbNodeClick.emit(node);
  }

  private readonly checkedSet = computed(() => new Set(this.hbChecked()));
  isChecked(key: HbTreeKey): boolean {
    return this.checkedSet().has(key);
  }
  isIndeterminate(key: HbTreeKey): boolean {
    if (this.hbCheckStrictly() || this.checkedSet().has(key)) return false;
    const desc = this.index().get(key)?.descendantKeys ?? [];
    const set = this.checkedSet();
    return desc.some((k) => set.has(k));
  }
  protected toggleCheck(node: HbTreeNode): void {
    if (node.selectable === false || node.disabled) return;
    const key = node.key;
    const set = new Set(this.hbChecked());
    if (this.hbCheckStrictly()) {
      set.has(key) ? set.delete(key) : set.add(key);
      this.hbChecked.set([...set]);
      return;
    }
    const entry = this.index().get(key);
    const value = !set.has(key);
    for (const k of [key, ...(entry?.descendantKeys ?? [])]) value ? set.add(k) : set.delete(k);
    let parent = entry?.parentKey ?? null;
    while (parent != null) {
      const pe = this.index().get(parent);
      const allChecked = (pe?.childKeys ?? []).every((k) => set.has(k));
      allChecked ? set.add(parent) : set.delete(parent);
      parent = pe?.parentKey ?? null;
    }
    this.hbChecked.set([...set]);
  }

  private readonly allKeys = computed(() => [...this.index().keys()]);
  protected readonly allChecked = computed(() => {
    const keys = this.allKeys();
    const set = this.checkedSet();
    return keys.length > 0 && keys.every((k) => set.has(k));
  });
  protected readonly someChecked = computed(
    () => this.hbChecked().length > 0 && !this.allChecked(),
  );
  protected toggleAll(): void {
    this.hbChecked.set(this.allChecked() ? [] : this.allKeys());
  }

  protected onToggle(node: HbTreeNode, event: Event): void {
    event.stopPropagation();
    const key = node.key;
    const set = new Set(this.hbExpanded());
    if (set.has(key)) {
      set.delete(key);
      this.hbExpanded.set([...set]);
      this.hbNodeCollapse.emit(node);
    } else {
      set.add(key);
      this.hbExpanded.set([...set]);
      this.hbNodeExpand.emit(node);
    }
  }

  protected onRowClick(flat: HbTreeFlatNode, event: MouseEvent): void {
    this.activeKey.set(flat.node.key);
    if (this.hbSelectionMode() !== 'none' && flat.node.selectable !== false) {
      this.select(flat.node, event);
    } else if (flat.expandable) {
      this.onToggle(flat.node, event);
    }
  }

  protected isActive(key: HbTreeKey): boolean {
    const active = this.activeKey();
    return active !== null ? active === key : this.flatList()[0]?.node.key === key;
  }

  protected onKeydown(event: KeyboardEvent): void {
    const list = this.flatList();
    if (!list.length) return;
    const active = this.activeKey() ?? list[0].node.key;
    const i = Math.max(
      0,
      list.findIndex((f) => f.node.key === active),
    );
    const flat = list[i];
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusRow(list[Math.min(i + 1, list.length - 1)]);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusRow(list[Math.max(i - 1, 0)]);
        break;
      case 'Home':
        event.preventDefault();
        this.focusRow(list[0]);
        break;
      case 'End':
        event.preventDefault();
        this.focusRow(list[list.length - 1]);
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (flat.expandable && !flat.expanded) this.onToggle(flat.node, event);
        else if (flat.expandable) this.focusRow(list[Math.min(i + 1, list.length - 1)]);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (flat.expandable && flat.expanded) this.onToggle(flat.node, event);
        else if (flat.parentKey != null) {
          const p = list.find((f) => f.node.key === flat.parentKey);
          if (p) this.focusRow(p);
        }
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (this.hbCheckable()) this.toggleCheck(flat.node);
        else this.select(flat.node);
        break;
    }
  }

  private focusRow(flat: HbTreeFlatNode | undefined): void {
    if (!flat) return;
    this.activeKey.set(flat.node.key);
    const key = String(flat.node.key);
    const rows = this.host.nativeElement.querySelectorAll<HTMLElement>('[data-key]');
    for (const row of Array.from(rows)) {
      if (row.getAttribute('data-key') === key) {
        row.focus();
        return;
      }
    }
  }
}
