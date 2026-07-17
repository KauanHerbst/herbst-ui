import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbScrollAreaImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-scroll-area-basic',
  imports: [HbScrollAreaImports],
  template: `
    <hb-scroll-area hbFade class="h-64 w-full max-w-xs rounded-md border border-border">
      <div class="flex flex-col gap-2 p-4">
        @for (n of items; track n) {
          <div class="rounded-md border border-border px-3 py-2 text-sm">Autumn photo #{{ n }}</div>
        }
      </div>
    </hb-scroll-area>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoScrollAreaBasicComponent {
  protected readonly items = Array.from({ length: 20 }, (_, i) => i + 1);
}
