import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCodeBlockImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-code-block-languages',
  imports: [HbCodeBlockImports],
  template: `
    <div class="flex w-full max-w-2xl flex-col gap-3">
      <hb-code-block hbLanguage="bash" hbFilename="terminal" [hbCode]="bash" />
      <hb-code-block hbLanguage="css" hbFilename="theme.css" [hbCode]="css" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCodeBlockLanguagesComponent {
  protected readonly bash = 'npx herbst-ui@latest add button card';

  protected readonly css =
    ':root {\n' +
    '  --primary: oklch(0.545 0.155 42);\n' +
    '  --background: oklch(0.973 0.005 95);\n' +
    '}';
}
