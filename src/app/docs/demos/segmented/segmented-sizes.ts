import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSegmentedImports, type HbSegmentedOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-segmented-sizes',
  imports: [HbSegmentedImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-segmented hbSize="xs" [hbOptions]="options" [hbValue]="'all'" />
      <hb-segmented hbSize="sm" [hbOptions]="options" [hbValue]="'all'" />
      <hb-segmented hbSize="lg" [hbOptions]="options" [hbValue]="'all'" />
      <hb-segmented hbSize="xl" [hbOptions]="options" [hbValue]="'all'" />

      <hb-segmented hbFluid [hbOptions]="options" [hbValue]="'photos'" />
      <hb-segmented hbDisabled [hbOptions]="options" [hbValue]="'videos'" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSegmentedSizesComponent {
  protected readonly options: HbSegmentedOption[] = [
    { value: 'all', label: 'All' },
    { value: 'photos', label: 'Photos' },
    { value: 'videos', label: 'Videos' },
  ];
}
