import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HbButtonComponent, HbToastService } from '@herbst/ui';

@Component({
  selector: 'hb-demo-toast-rich',
  imports: [HbButtonComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hb-button (click)="withActions()">Description & actions</button>
      <button hb-button hbType="outline" (click)="topCenter()">Top-center · progress</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoToastRichComponent {
  private readonly toast = inject(HbToastService);

  protected withActions(): void {
    this.toast.success('Photo archived', {
      description: 'Oak leaves moved to the album.',
      icon: 'phosphorCheckCircle',
      duration: 8000,
      closable: true,
      actions: [
        { label: 'Undo', type: 'default', onClick: () => this.toast.info('Restored') },
        { label: 'View', type: 'ghost', closeOnClick: false },
      ],
    });
  }

  protected topCenter(): void {
    this.toast.warning('Storage almost full', {
      description: '92% of the Herbst storage is used.',
      position: 'top-center',
      progressBar: true,
      pauseOnHover: true,
      duration: 6000,
      class: 'w-80',
    });
  }
}
