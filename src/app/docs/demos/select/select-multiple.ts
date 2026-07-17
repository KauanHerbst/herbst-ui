import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSelectImports, type HbSelectOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-select-multiple',
  imports: [HbSelectImports],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-2">
      <hb-select
        hbFluid
        hbMultiple
        hbSelectAll
        hbClearable
        [hbSelectionLimit]="3"
        [hbMaxChips]="2"
        hbDisplay="chip"
        [hbOptions]="options"
        [(hbValue)]="tags"
        hbPlaceholder="Pick up to 3 tags"
      />
      <p class="font-mono text-[12px] text-muted-foreground">{{ $any(tags()).length }} selected</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSelectMultipleComponent {
  protected readonly tags = signal<unknown>(['photos', 'videos']);
  protected readonly options: HbSelectOption[] = [
    { value: 'photos', label: 'Photos' },
    { value: 'videos', label: 'Videos' },
    { value: 'forests', label: 'Forests' },
    { value: 'cities', label: 'Cities' },
    { value: 'archived', label: 'Archived' },
  ];
}
