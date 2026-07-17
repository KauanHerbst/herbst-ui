import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorFile, phosphorFolder, phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

import { HbTreeImports, type HbTreeKey, type HbTreeNode } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tree-basic',
  imports: [HbTreeImports],
  viewProviders: [provideIcons({ phosphorFolder, phosphorFile, phosphorLeaf })],
  template: `
    <div class="w-full max-w-xs">
      <hb-tree
        [hbNodes]="nodes"
        [(hbExpanded)]="expanded"
        [(hbSelection)]="selection"
        hbSelectionMode="single"
        hbAriaLabel="Herbst"
        (hbNodeClick)="clicked.set($any($event).label)"
      />

      <p class="mt-3 font-mono text-[12px] text-muted-foreground">
        selected: [{{ selection().join(', ') }}] · last click: {{ clicked() }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTreeBasicComponent {
  protected readonly expanded = signal<HbTreeKey[]>(['betulaceae']);
  protected readonly selection = signal<HbTreeKey[]>(['betula']);
  protected readonly clicked = signal('—');

  protected readonly nodes: HbTreeNode[] = [
    {
      key: 'betulaceae',
      label: 'Birches',
      icon: 'phosphorFolder',
      children: [
        { key: 'betula', label: 'Birch', icon: 'phosphorLeaf' },
        { key: 'alnus', label: 'Alder', icon: 'phosphorLeaf' },
      ],
    },
    {
      key: 'fagaceae',
      label: 'Oaks & beeches',
      icon: 'phosphorFolder',
      children: [
        { key: 'quercus', label: 'Oak', icon: 'phosphorLeaf' },
        { key: 'fagus', label: 'Beech', icon: 'phosphorLeaf', disabled: true },
      ],
    },
    { key: 'notes', label: 'autumn-notes.txt', icon: 'phosphorFile', leaf: true },
  ];
}
