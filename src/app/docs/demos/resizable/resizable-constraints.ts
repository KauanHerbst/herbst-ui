import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbResizableImports, type HbResizeEvent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-resizable-constraints',
  imports: [HbResizableImports],
  template: `
    <div class="flex w-full max-w-xl flex-col gap-2">
      <hb-resizable-group
        class="h-56 overflow-hidden rounded-md border border-border"
        [hbKeyboardStep]="10"
        (hbResize)="onResize($event)"
      >
        <hb-resizable-panel
          [hbDefaultSize]="25"
          [hbMin]="15"
          hbCollapsible
          class="flex items-center justify-center bg-muted/40 p-4 text-sm"
        >
          Files
        </hb-resizable-panel>

        <hb-resizable-handle hbWithHandle />

        <hb-resizable-panel
          [hbDefaultSize]="50"
          [hbMin]="30"
          class="flex items-center justify-center p-4 text-sm"
        >
          Editor
        </hb-resizable-panel>

        <hb-resizable-handle hbDisabled />

        <hb-resizable-panel
          [hbDefaultSize]="25"
          [hbMax]="40"
          class="flex items-center justify-center bg-muted/40 p-4 text-sm"
        >
          Preview
        </hb-resizable-panel>
      </hb-resizable-group>

      <p class="font-mono text-[12px] text-muted-foreground">sizes: {{ sizes() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoResizableConstraintsComponent {
  protected readonly sizes = signal('25, 50, 25');

  protected onResize(event: HbResizeEvent): void {
    this.sizes.set(event.sizes.map((s) => Math.round(s)).join(', '));
  }
}
