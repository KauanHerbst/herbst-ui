import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSelectImports, type HbSelectOption } from '@herbst/ui';

@Component({
  selector: 'hb-demo-select-advanced',
  imports: [HbSelectImports],
  template: `
    <div class="flex w-full max-w-xs flex-col gap-4">
      <hb-select
        hbFluid
        hbFilter
        hbFilterMatchMode="startsWith"
        hbFilterPlaceholder="Type a city…"
        hbClearable
        [hbOptions]="families"
        [(hbValue)]="pick"
        hbPlaceholder="Searchable"
      />

      <hb-select
        hbFluid
        hbSize="sm"
        hbStatus="success"
        [hbOptions]="families"
        [hbValue]="'Freiburg'"
      />

      <hb-select
        hbFluid
        hbSize="lg"
        hbStatus="error"
        hbInvalid
        hbRequired
        [hbOptions]="families"
        hbPlaceholder="Required"
      />

      <hb-select hbFluid hbLoading hbLoadingText="Fetching…" hbPlaceholder="Loading options" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSelectAdvancedComponent {
  protected readonly pick = signal<unknown>(null);
  protected readonly families: HbSelectOption[] = [
    'Freiburg',
    'Munich',
    'Berlin',
    'Hamburg',
    'Cologne',
    'Dresden',
    'Stuttgart',
  ].map((f) => ({ value: f, label: f }));
}
