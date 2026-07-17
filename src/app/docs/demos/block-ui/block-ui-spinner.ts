import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbBlockUiComponent, HbButtonComponent } from '@herbst/ui';

@Component({
  selector: 'hb-demo-block-ui-spinner',
  imports: [HbBlockUiComponent, HbButtonComponent],
  template: `
    <div class="w-full max-w-sm">
      <hb-block-ui [hbBlocked]="loading()" hbSpinner class="rounded-lg border border-border">
        <div class="flex flex-col gap-1 p-6">
          <h3 class="font-medium">Autumn walk</h3>
          <p class="text-sm text-muted-foreground">Oak leaves along the river — Freiburg.</p>
          <p class="text-sm text-muted-foreground">Taken Nov 3, 2026 · Black Forest.</p>
        </div>
      </hb-block-ui>

      <button hb-button hbSize="sm" class="mt-3" [hbDisabled]="loading()" (click)="reload()">
        Reload
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBlockUiSpinnerComponent {
  protected readonly loading = signal(false);

  protected reload(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }
}
