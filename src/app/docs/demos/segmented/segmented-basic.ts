import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSegmentedImports, type HbSegmentedOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-segmented-basic',
  imports: [HbSegmentedImports],
  template: `
    <div class="flex flex-col items-start gap-2">
      <hb-segmented [hbOptions]="options" [(hbValue)]="view" hbAriaLabel="Catalogue view" />
      <p class="font-mono text-[12px] text-muted-foreground">Selected: {{ view() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSegmentedBasicComponent {
  protected readonly view = signal('all');
  protected readonly options: HbSegmentedOption[] = [
    { value: 'all', label: 'All' },
    { value: 'photos', label: 'Photos' },
    { value: 'videos', label: 'Videos' },
    { value: 'archived', label: 'Archived', disabled: true },
  ];
}
