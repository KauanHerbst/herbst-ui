import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbTypographyImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-typography-modifiers',
  imports: [HbTypographyImports],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-4">
      <div class="flex flex-col gap-1">
        <p hbTypography="p" hbColor="primary">Primary — saved</p>
        <p hbTypography="p" hbColor="success">Success — uploaded</p>
        <p hbTypography="p" hbColor="warning">Warning — low light</p>
        <p hbTypography="p" hbColor="destructive">Destructive — deleted</p>
        <p hbTypography="p" hbColor="muted">Muted — archived</p>
      </div>

      <div class="flex flex-col gap-1">
        <p hbTypography="large" hbWeight="normal">Weight normal</p>
        <p hbTypography="large" hbWeight="medium">Weight medium</p>
        <p hbTypography="large" hbWeight="semibold">Weight semibold</p>
        <p hbTypography="large" hbWeight="bold">Weight bold</p>
      </div>

      <div class="flex flex-col gap-1">
        <p hbTypography="small" hbAlign="left">Aligned left</p>
        <p hbTypography="small" hbAlign="center">Aligned center</p>
        <p hbTypography="small" hbAlign="right">Aligned right</p>
        <p hbTypography="muted" hbAlign="justify">
          Justified paragraph that stretches each line to both edges so the autumn notes form a tidy
          rectangular block of text.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTypographyModifiersComponent {}
