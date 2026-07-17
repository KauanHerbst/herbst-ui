import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbTabsImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-tabs-advanced',
  imports: [HbTabsImports],
  template: `
    <hb-tabs
      class="w-full max-w-sm"
      [(hbValue)]="tab"
      hbActivationMode="manual"
      hbShowArrows
      [hbScrollThreshold]="4"
      hbIndicatorClass="bg-destructive"
    >
      <hb-tab-list>
        <ng-template hbTabsIndicator>
          <span
            class="absolute inset-x-0 -bottom-1 mx-auto h-1 w-1 rounded-full bg-destructive"
          ></span>
        </ng-template>
        @for (m of months; track m) {
          <hb-tab [hbValue]="m">{{ m }}</hb-tab>
        }
      </hb-tab-list>

      @for (m of months; track m) {
        <hb-tab-panel [hbValue]="m" hbLazy>
          <p class="text-sm text-muted-foreground">Collections logged in {{ m }}.</p>
        </hb-tab-panel>
      }
    </hb-tabs>

    <p class="mt-3 font-mono text-[12px] text-muted-foreground">
      manual activation — arrow to move focus, Enter/Space to open · {{ tab() }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTabsAdvancedComponent {
  protected readonly tab = signal<unknown>('Jan');
  protected readonly months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
}
