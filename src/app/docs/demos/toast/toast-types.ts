import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HbButtonComponent, HbToastService } from '@herbst/ui';

@Component({
  selector: 'hb-demo-toast-types',
  imports: [HbButtonComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hb-button hbType="secondary" (click)="toast.default('Photo saved')">Default</button>
      <button hb-button hbType="secondary" (click)="toast.success('Uploaded to Freiburg album')">
        Success
      </button>
      <button hb-button hbType="secondary" (click)="toast.info('Sync scheduled for tonight')">
        Info
      </button>
      <button hb-button hbType="secondary" (click)="toast.warning('Low light — blurry shot')">
        Warning
      </button>
      <button hb-button hbType="secondary" (click)="toast.destructive('Failed to save')">
        Destructive
      </button>
      <button hb-button hbType="secondary" (click)="toast.loading('Uploading photos…')">
        Loading
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoToastTypesComponent {
  protected readonly toast = inject(HbToastService);
}
