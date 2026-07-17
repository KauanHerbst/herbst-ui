import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCodeBlockImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-code-block-lines',
  imports: [HbCodeBlockImports],
  template: `
    <hb-code-block
      class="w-full max-w-2xl"
      hbLanguage="typescript"
      hbFilename="leaf.ts"
      hbLineNumbers
      [hbHighlightLines]="[3, 4]"
      [hbCode]="code"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCodeBlockLinesComponent {
  protected readonly code =
    'export function fallingLeaves(tree: string): Record<string, string> {\n' +
    '  return {\n' +
    '    tree,\n' +
    "    season: 'Autumn',\n" +
    "    city: 'Freiburg',\n" +
    '  };\n' +
    '}';
}
