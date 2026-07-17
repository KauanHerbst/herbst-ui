import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCardImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-card-sizes',
  imports: [HbCardImports],
  template: `
    <div class="flex flex-wrap items-start gap-4">
      @for (size of sizes; track size) {
        <hb-card [hbSize]="size" class="w-44">
          <hb-card-header>
            <hb-card-title>Size {{ size }}</hb-card-title>
          </hb-card-header>
          <hb-card-content>Padding scales with the card size.</hb-card-content>
        </hb-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCardSizesComponent {
  protected readonly sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
}
