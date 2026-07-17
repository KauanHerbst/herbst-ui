import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCodeBlockImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-code-block-basic',
  imports: [HbCodeBlockImports],
  template: `
    <hb-code-block
      class="w-full max-w-2xl"
      hbLanguage="typescript"
      hbFilename="classes.ts"
      [hbCode]="code"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCodeBlockBasicComponent {
  protected readonly code =
    "import { cn } from '@herbst/ui';\n" +
    '\n' +
    "export const classes = cn('px-4 py-2', active && 'bg-primary');";
}
