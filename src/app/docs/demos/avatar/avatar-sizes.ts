import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAvatarImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-avatar-sizes',
  imports: [HbAvatarImports],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <hb-avatar hbFallback="XS" hbSize="xs" />
      <hb-avatar hbFallback="SM" hbSize="sm" />
      <hb-avatar hbFallback="MD" hbSize="md" />
      <hb-avatar hbFallback="LG" hbSize="lg" />
      <hb-avatar hbFallback="XL" hbSize="xl" />
      <hb-avatar hbFallback="72" [hbSize]="72" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAvatarSizesComponent {}
