import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbTypographyImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-typography-variants',
  imports: [HbTypographyImports],
  template: `
    <div class="flex w-full max-w-lg flex-col gap-3">
      <h1 hbTypography="h1">Autumn in the Black Forest</h1>
      <h2 hbTypography="h2">The turning leaves</h2>
      <h3 hbTypography="h3">Colour & light</h3>
      <h4 hbTypography="h4">What to look for</h4>

      <p hbTypography="lead">A quiet season of mist, wind, and falling leaves.</p>
      <p hbTypography="p">
        Oaks and beeches turn amber and rust, the mornings grow cool and grey, and the forest floor
        fills with colour underfoot.
      </p>

      <blockquote hbTypography="blockquote">“Autumn is a second spring.”</blockquote>

      <ul hbTypography="list">
        <li>Amber oak leaves</li>
        <li>Cool, misty mornings</li>
        <li>Chestnuts underfoot</li>
      </ul>

      <p hbTypography="p">
        The album ID is <code hbTypography="inline-code">IMG·019</code> from Freiburg.
      </p>

      <p hbTypography="large">Large statement text</p>
      <p hbTypography="small">Small helper text</p>
      <p hbTypography="muted">Muted secondary note</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTypographyVariantsComponent {}
