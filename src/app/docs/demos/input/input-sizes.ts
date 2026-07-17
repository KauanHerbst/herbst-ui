import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-input-sizes',
  imports: [HbInputDirective],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-3">
      <input hb-input hbSize="xs" placeholder="Extra small" />
      <input hb-input hbSize="sm" placeholder="Small" />
      <input hb-input hbSize="md" placeholder="Medium (default)" />
      <input hb-input hbSize="lg" placeholder="Large" />
      <input hb-input hbSize="xl" placeholder="Extra large" />
      <input hb-input hbFluid placeholder="Fluid — fills its container" />
      <textarea hb-input hbFluid placeholder="Textarea auto-grows with content"></textarea>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInputSizesComponent {}
