import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMinus, phosphorPlus } from '@ng-icons/phosphor-icons/regular';

import { HbTreeImports, type HbTreeKey, type HbTreeNode } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tree-advanced',
  imports: [HbTreeImports, NgIcon],
  viewProviders: [provideIcons({ phosphorPlus, phosphorMinus })],
  template: `
    <div class="w-full max-w-xs">
      <hb-tree
        [hbNodes]="nodes"
        [(hbSelection)]="selection"
        hbSelectionMode="multiple"
        hbMetaKeySelection
        hbShowFilter
        hbFilterMode="lenient"
        hbFilterPlaceholder="Search trees…"
        [hbIndent]="20"
      >
        <ng-template hbTreeToggle let-expanded>
          <ng-icon [name]="expanded ? 'phosphorMinus' : 'phosphorPlus'" />
        </ng-template>

        <ng-template hbTreeNodeContent let-node>
          <span class="truncate">{{ node.label }}</span>
          @if (node.data) {
            <span
              class="ml-auto rounded-full bg-muted px-1.5 text-[0.625rem] text-muted-foreground"
            >
              {{ node.data }}
            </span>
          }
        </ng-template>
      </hb-tree>

      <p class="mt-3 font-mono text-[12px] text-muted-foreground">
        selected: [{{ selection().join(', ') }}]
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTreeAdvancedComponent {
  protected readonly selection = signal<HbTreeKey[]>([]);

  protected readonly nodes: HbTreeNode[] = [
    {
      key: 'europe',
      label: 'Europe',
      data: 3,
      children: [
        { key: 'betula', label: 'Birch' },
        { key: 'quercus', label: 'Oak' },
        { key: 'fagus', label: 'Beech' },
      ],
    },
    {
      key: 'asia',
      label: 'Asia',
      data: 2,
      children: [
        { key: 'ginkgo', label: 'Ginkgo' },
        { key: 'acer', label: 'Maple' },
      ],
    },
  ];
}
