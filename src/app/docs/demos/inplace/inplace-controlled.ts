import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbInplaceImports, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-inplace-controlled',
  imports: [HbInplaceImports, HbInputDirective, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-sm flex-col gap-2">
      <div class="flex items-center gap-2">
        <button hb-button hbType="secondary" (click)="active.set(!active())">
          {{ active() ? 'Collapse' : 'Edit' }}
        </button>
        <span class="font-mono text-[12px] text-muted-foreground">{{ log() }}</span>
      </div>

      <hb-inplace
        [(hbActive)]="active"
        (hbActivate)="log.set('activated')"
        (hbDeactivate)="log.set('deactivated')"
      >
        <ng-template hbInplaceDisplay>
          <span class="text-sm">City: <span class="font-medium">Freiburg</span></span>
        </ng-template>
        <ng-template hbInplaceContent>
          <div class="flex items-center gap-2">
            <input hb-input value="Freiburg" />
            <button hb-button hbType="outline" hbInplaceCloser>Done</button>
          </div>
        </ng-template>
      </hb-inplace>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInplaceControlledComponent {
  protected readonly active = signal(false);
  protected readonly log = signal('idle');
}
