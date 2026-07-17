import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  model,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMinus, phosphorPlus } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbCheckboxComponent } from '../checkbox';
import { HbOrgChartNodeDirective } from './org-chart-node.directive';
import {
  type HbOrgChartIndexEntry,
  type HbOrgChartKey,
  type HbOrgChartLayout,
  type HbOrgChartNode,
  type HbOrgChartSelectionMode,
} from './org-chart.types';
import { orgChartNodeVariants } from './org-chart.variants';

@Component({
  selector: 'hb-org-chart',
  imports: [NgTemplateOutlet, NgIcon, HbCheckboxComponent],
  viewProviders: [provideIcons({ phosphorPlus, phosphorMinus })],
  template: `
    <ng-template #nodeTpl let-node>
      <li class="hb-org-chart-item" role="treeitem" [attr.aria-expanded]="expandedAttr(node)">
        <div class="hb-org-chart-cell">
          <div
            [class]="boxClasses(node)"
            [attr.data-slot]="'org-chart-node'"
            [attr.data-selected]="isSelected(node) || null"
            [attr.aria-selected]="hbSelectionMode() !== 'none' ? isSelected(node) : null"
            [attr.tabindex]="selectableNode(node) ? 0 : null"
            (click)="onNodeClick(node, $event)"
            (keydown)="onNodeKeydown(node, $event)"
          >
            @if (hbSelectionMode() === 'checkbox') {
              <hb-checkbox
                hbSize="sm"
                class="shrink-0"
                [hbChecked]="isChecked(node.key)"
                [hbIndeterminate]="isIndeterminate(node.key)"
                [hbDisabled]="node.selectable === false"
                (hbChange)="toggleCheck(node)"
                (click)="$event.stopPropagation()"
              />
            }
            @if (nodeTemplate(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: node }" />
            } @else {
              <span>{{ node.label }}</span>
            }
          </div>

          @if (togglerVisible(node)) {
            <button
              type="button"
              class="hb-org-chart-toggler"
              [attr.aria-label]="isCollapsed(node.key) ? 'Expand' : 'Collapse'"
              (click)="toggle(node)"
            >
              <ng-icon [name]="isCollapsed(node.key) ? 'phosphorPlus' : 'phosphorMinus'" />
            </button>
          }
        </div>

        @if (childrenVisible(node)) {
          <ul class="hb-org-chart-list">
            @for (child of node.children; track child.key) {
              <ng-container [ngTemplateOutlet]="nodeTpl" [ngTemplateOutletContext]="{ $implicit: child }" />
            }
          </ul>
        }
      </li>
    </ng-template>

    <ul class="hb-org-chart-list" role="tree">
      @for (root of hbNodes(); track root.key) {
        <ng-container [ngTemplateOutlet]="nodeTpl" [ngTemplateOutletContext]="{ $implicit: root }" />
      }
    </ul>
  `,
  styles: `
    .hb-org-chart {
      display: block;
      overflow: auto;
      padding: 0.5rem;
    }
    .hb-org-chart .hb-org-chart-list {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      list-style: none;
      margin: 0;
      padding: 1.5rem 0 0;
      position: relative;
    }
    .hb-org-chart[data-slot='org-chart'] > .hb-org-chart-list {
      padding-top: 0;
    }
    .hb-org-chart .hb-org-chart-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      list-style: none;
      margin: 0;
      padding: 1.5rem 0.75rem 0;
      position: relative;
    }
    .hb-org-chart[data-slot='org-chart'] > .hb-org-chart-list > .hb-org-chart-item {
      padding-top: 0;
    }
    .hb-org-chart .hb-org-chart-item::before,
    .hb-org-chart .hb-org-chart-item::after {
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      width: 50%;
      height: 1.5rem;
      border-top: 2px solid var(--border);
    }
    .hb-org-chart .hb-org-chart-item::after {
      right: auto;
      left: 50%;
      border-left: 2px solid var(--border);
    }
    .hb-org-chart[data-slot='org-chart'] > .hb-org-chart-list > .hb-org-chart-item::before,
    .hb-org-chart[data-slot='org-chart'] > .hb-org-chart-list > .hb-org-chart-item::after {
      display: none;
    }
    .hb-org-chart .hb-org-chart-item:only-child::before,
    .hb-org-chart .hb-org-chart-item:only-child::after {
      display: none;
    }
    .hb-org-chart .hb-org-chart-item:only-child {
      padding-top: 0;
    }
    .hb-org-chart .hb-org-chart-item:first-child::before,
    .hb-org-chart .hb-org-chart-item:last-child::after {
      border: 0 none;
    }
    .hb-org-chart .hb-org-chart-item:last-child::before {
      border-right: 2px solid var(--border);
    }
    .hb-org-chart .hb-org-chart-list .hb-org-chart-list::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 0;
      height: 1.5rem;
      border-left: 2px solid var(--border);
    }
    .hb-org-chart .hb-org-chart-cell {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .hb-org-chart .hb-org-chart-toggler {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.25rem;
      height: 1.25rem;
      margin-top: -0.625rem;
      border-radius: 9999px;
      border: 1px solid var(--border);
      background: var(--background);
      color: var(--muted-foreground);
      cursor: pointer;
      z-index: 1;
    }
    .hb-org-chart .hb-org-chart-toggler:hover {
      background: var(--muted);
      color: var(--foreground);
    }

    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-list {
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 0 0 1.5rem;
    }
    .hb-org-chart[data-layout='horizontal'][data-slot='org-chart'] > .hb-org-chart-list {
      padding-left: 0;
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-item {
      flex-direction: row;
      align-items: center;
      padding: 0.75rem 0 0.75rem 1.5rem;
    }
    .hb-org-chart[data-layout='horizontal'][data-slot='org-chart'] > .hb-org-chart-list > .hb-org-chart-item {
      padding-left: 0;
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-item::before,
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-item::after {
      top: auto;
      bottom: 50%;
      left: 0;
      right: auto;
      width: 1.5rem;
      height: 50%;
      border-top: 0;
      border-left: 2px solid var(--border);
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-item::after {
      bottom: auto;
      top: 50%;
      border-left: 2px solid var(--border);
      border-top: 2px solid var(--border);
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-item:last-child::before {
      border-right: 0;
      border-bottom: 2px solid var(--border);
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-item:only-child {
      padding-left: 0;
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-list .hb-org-chart-list::before {
      top: 50%;
      left: 0;
      width: 1.5rem;
      height: 0;
      border-left: 0;
      border-top: 2px solid var(--border);
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-cell {
      flex-direction: row;
    }
    .hb-org-chart[data-layout='horizontal'] .hb-org-chart-toggler {
      margin-top: 0;
      margin-left: -0.625rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'hb-org-chart',
    '[attr.data-slot]': "'org-chart'",
    '[attr.data-layout]': 'hbLayout()',
  },
  exportAs: 'hbOrgChart',
})
export class HbOrgChartComponent {
  readonly hbNodes = input<HbOrgChartNode[]>([]);
  readonly hbSelectionMode = input<HbOrgChartSelectionMode>('none');
  readonly hbSelection = model<HbOrgChartKey[]>([]);
  readonly hbMetaKeySelection = input(false, { transform: booleanAttribute });
  readonly hbCollapsible = input(true, { transform: booleanAttribute });
  readonly hbCollapsedKeys = model<HbOrgChartKey[]>([]);
  readonly hbLayout = input<HbOrgChartLayout>('vertical');
  readonly class = input<ClassValue>('');

  readonly hbNodeSelect = output<HbOrgChartNode>();
  readonly hbNodeUnselect = output<HbOrgChartNode>();
  readonly hbNodeExpand = output<HbOrgChartNode>();
  readonly hbNodeCollapse = output<HbOrgChartNode>();

  protected readonly nodeTemplate = contentChild(HbOrgChartNodeDirective, { read: TemplateRef });

  private readonly index = computed(() => {
    const map = new Map<HbOrgChartKey, HbOrgChartIndexEntry>();
    const walk = (nodes: HbOrgChartNode[], parentKey: HbOrgChartKey | null): void => {
      for (const node of nodes) {
        const childKeys = (node.children ?? []).map((c) => c.key);
        const entry: HbOrgChartIndexEntry = { node, parentKey, childKeys, descendantKeys: [] };
        map.set(node.key, entry);
        if (node.children?.length) {
          walk(node.children, node.key);
          entry.descendantKeys = node.children.flatMap((c) => [
            c.key,
            ...(map.get(c.key)?.descendantKeys ?? []),
          ]);
        }
      }
    };
    walk(this.hbNodes(), null);
    return map;
  });

  private readonly selectionSet = computed(() => new Set(this.hbSelection()));
  private readonly collapsedSet = computed(() => new Set(this.hbCollapsedKeys()));

  protected selectableNode(node: HbOrgChartNode): boolean {
    const mode = this.hbSelectionMode();
    return mode !== 'none' && mode !== 'checkbox' && node.selectable !== false;
  }
  protected isSelected(node: HbOrgChartNode): boolean {
    if (this.hbSelectionMode() === 'checkbox') return this.isChecked(node.key);
    return this.selectionSet().has(node.key);
  }
  protected boxClasses(node: HbOrgChartNode): string {
    return cn(
      orgChartNodeVariants({
        selectable: this.selectableNode(node),
        selected: this.isSelected(node) && this.hbSelectionMode() !== 'checkbox',
      }),
      node.styleClass,
      this.class(),
    );
  }

  protected onNodeClick(node: HbOrgChartNode, event: MouseEvent): void {
    if (!this.selectableNode(node)) return;
    this.select(node, event);
  }
  protected onNodeKeydown(node: HbOrgChartNode, event: KeyboardEvent): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (this.hbSelectionMode() === 'checkbox') this.toggleCheck(node);
    else if (this.selectableNode(node)) this.select(node);
  }

  private select(node: HbOrgChartNode, event?: MouseEvent): void {
    const key = node.key;
    const mode = this.hbSelectionMode();
    if (mode === 'single') {
      const was = this.selectionSet().has(key);
      this.hbSelection.set(was ? [] : [key]);
      this.emitSelect(node, !was);
      return;
    }
    const current = this.hbSelection();
    const additive = !this.hbMetaKeySelection() || !!(event && (event.ctrlKey || event.metaKey));
    if (additive) {
      const has = current.includes(key);
      this.hbSelection.set(has ? current.filter((k) => k !== key) : [...current, key]);
      this.emitSelect(node, !has);
    } else {
      const only = current.length === 1 && current[0] === key;
      this.hbSelection.set(only ? [] : [key]);
      this.emitSelect(node, !only);
    }
  }
  private emitSelect(node: HbOrgChartNode, selected: boolean): void {
    (selected ? this.hbNodeSelect : this.hbNodeUnselect).emit(node);
  }

  protected isChecked(key: HbOrgChartKey): boolean {
    return this.selectionSet().has(key);
  }
  protected isIndeterminate(key: HbOrgChartKey): boolean {
    if (this.selectionSet().has(key)) return false;
    const desc = this.index().get(key)?.descendantKeys ?? [];
    const set = this.selectionSet();
    return desc.some((k) => set.has(k));
  }
  protected toggleCheck(node: HbOrgChartNode): void {
    if (node.selectable === false) return;
    const key = node.key;
    const set = new Set(this.hbSelection());
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
    this.hbSelection.set([...set]);
    this.emitSelect(node, value);
  }

  protected isCollapsed(key: HbOrgChartKey): boolean {
    return this.collapsedSet().has(key);
  }
  protected togglerVisible(node: HbOrgChartNode): boolean {
    return (
      this.hbCollapsible() &&
      node.collapsible !== false &&
      (node.children?.length ?? 0) > 0
    );
  }
  protected childrenVisible(node: HbOrgChartNode): boolean {
    return (node.children?.length ?? 0) > 0 && !this.isCollapsed(node.key);
  }
  protected expandedAttr(node: HbOrgChartNode): boolean | null {
    if ((node.children?.length ?? 0) === 0) return null;
    return !this.isCollapsed(node.key);
  }
  protected toggle(node: HbOrgChartNode): void {
    const key = node.key;
    const set = new Set(this.hbCollapsedKeys());
    if (set.has(key)) {
      set.delete(key);
      this.hbCollapsedKeys.set([...set]);
      this.hbNodeExpand.emit(node);
    } else {
      set.add(key);
      this.hbCollapsedKeys.set([...set]);
      this.hbNodeCollapse.emit(node);
    }
  }
}
