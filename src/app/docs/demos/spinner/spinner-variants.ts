import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbSpinnerImports } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import { phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-spinner-variants',
  imports: [HbSpinnerImports],
  viewProviders: [provideIcons({ phosphorLeaf })],
  template: `
    <div class="flex items-center gap-6">
      <hb-spinner hbVariant="bars" hbSize="lg" />
      <hb-spinner hbSize="lg" class="text-primary" />
      <hb-spinner hbSize="lg" hbIcon="phosphorLeaf" class="text-success" />
      <hb-spinner hbSize="lg" [hbSpin]="false" class="text-muted-foreground" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSpinnerVariantsComponent {}
