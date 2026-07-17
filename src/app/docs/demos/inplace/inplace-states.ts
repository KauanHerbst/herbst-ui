import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbButtonComponent, HbInplaceImports, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-inplace-states',
  imports: [HbInplaceImports, HbInputDirective, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-4">
      <hb-inplace hbDisabled>
        <ng-template hbInplaceDisplay>
          <span class="text-sm text-muted-foreground">Locked field — clicking does nothing</span>
        </ng-template>
        <ng-template hbInplaceContent>
          <input hb-input value="never reached" />
        </ng-template>
      </hb-inplace>

      <hb-inplace hbPreventClick #ref="hbInplace">
        <ng-template hbInplaceDisplay>
          <div class="flex items-center gap-2">
            <span class="text-sm">Notes: oak leaves turning amber</span>
            <button hb-button hbType="ghost" hbSize="sm" (click)="ref.activate()">Edit</button>
          </div>
        </ng-template>
        <ng-template hbInplaceContent>
          <div class="flex items-center gap-2">
            <input hb-input value="oak leaves turning amber" />
            <button hb-button hbType="outline" hbInplaceCloser>Close</button>
          </div>
        </ng-template>
      </hb-inplace>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInplaceStatesComponent {}
