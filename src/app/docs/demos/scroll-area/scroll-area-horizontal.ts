import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbScrollAreaImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-scroll-area-horizontal',
  imports: [HbScrollAreaImports],
  template: `
    <hb-scroll-area
      hbOrientation="horizontal"
      hbType="always"
      hbSize="lg"
      hbVariant="solid"
      class="w-full max-w-md rounded-md border border-border"
    >
      <div class="flex gap-3 p-4">
        @for (n of items; track n) {
          <div
            class="flex size-28 shrink-0 items-center justify-center rounded-md bg-muted/50 text-sm"
          >
            Plate {{ n }}
          </div>
        }
      </div>
    </hb-scroll-area>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoScrollAreaHorizontalComponent {
  protected readonly items = Array.from({ length: 10 }, (_, i) => i + 1);
}
