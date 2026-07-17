import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCodeBlockImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-code-block-options',
  imports: [HbCodeBlockImports],
  template: `
    <div class="flex w-full max-w-2xl flex-col gap-2">
      <hb-code-block
        hbLanguage="json"
        [hbShowHeader]="false"
        hbWrap
        [hbMaxHeight]="140"
        [hbCode]="code"
        (hbCopy)="copied.set(true)"
      />

      <p class="font-mono text-[12px] text-muted-foreground">
        {{
          copied()
            ? 'Copied to clipboard'
            : 'No header · hover to copy · wraps · scrolls past 140px'
        }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCodeBlockOptionsComponent {
  protected readonly copied = signal(false);

  protected readonly code =
    '{\n' +
    '  "title": "Autumn in the Black Forest",\n' +
    '  "city": "Freiburg",\n' +
    '  "tree": "Oak",\n' +
    '  "taken": "2026-11-03",\n' +
    '  "notes": "Leaves turning amber and rust; a cool wind off the hills; mist settling over the valley below."\n' +
    '}';
}
