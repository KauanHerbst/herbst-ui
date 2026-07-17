import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorFolder, phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

import { HbTreeImports, type HbTreeKey, type HbTreeNode } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tree-checkable',
  imports: [HbTreeImports],
  viewProviders: [provideIcons({ phosphorFolder, phosphorLeaf })],
  template: `
    <div class="w-full max-w-xs">
      <hb-tree
        [hbNodes]="nodes"
        [hbExpanded]="['trees', 'shrubs']"
        [(hbChecked)]="checked"
        hbCheckable
        hbShowSelectAll
        hbSelectionMode="none"
      />

      <p class="mt-3 font-mono text-[12px] text-muted-foreground">
        checked: [{{ checked().join(', ') }}]
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTreeCheckableComponent {
  protected readonly checked = signal<HbTreeKey[]>(['birch']);

  protected readonly nodes: HbTreeNode[] = [
    {
      key: 'trees',
      label: 'Trees',
      icon: 'phosphorFolder',
      children: [
        { key: 'birch', label: 'Birch', icon: 'phosphorLeaf' },
        { key: 'oak', label: 'Oak', icon: 'phosphorLeaf' },
        { key: 'beech', label: 'Beech', icon: 'phosphorLeaf' },
      ],
    },
    {
      key: 'shrubs',
      label: 'Shrubs',
      icon: 'phosphorFolder',
      children: [
        { key: 'hazel', label: 'Hazel', icon: 'phosphorLeaf' },
        { key: 'elder', label: 'Elder', icon: 'phosphorLeaf', disabled: true },
      ],
    },
  ];
}
