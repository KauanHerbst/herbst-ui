import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HbButtonComponent, HbToastService } from '@herbst/ui';

@Component({
  selector: 'hb-demo-toast-promise',
  imports: [HbButtonComponent],
  template: `
    <div class="flex flex-wrap gap-2">
      <button hb-button hbType="secondary" (click)="save()">Promise → resolve</button>
      <button hb-button hbType="secondary" (click)="save(true)">Promise → reject</button>
      <button hb-button hbType="outline" (click)="manual()">Manual update</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoToastPromiseComponent {
  private readonly toast = inject(HbToastService);

  private wait(fail: boolean): Promise<{ count: number }> {
    return new Promise((resolve, reject) =>
      setTimeout(() => (fail ? reject(new Error('Network error')) : resolve({ count: 42 })), 1600),
    );
  }

  protected save(fail = false): void {
    this.toast.promise(this.wait(fail), {
      loading: 'Syncing photos…',
      success: (r) => `Synced ${r.count} photos`,
      error: (e) => `Sync failed: ${(e as Error).message}`,
    });
  }

  protected manual(): void {
    const ref = this.toast.loading('Preparing export…', { closable: false });
    setTimeout(
      () => ref.update({ type: 'success', title: 'Export ready', duration: 3000, closable: true }),
      1800,
    );
  }
}
