import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbFileUploadImports, type HbUploadFile } from '@herbst/ui';

@Component({
  selector: 'hb-demo-file-upload-advanced',
  imports: [HbFileUploadImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-2">
      <hb-file-upload
        hbMultiple
        hbAccept="image/*,.pdf"
        hbChooseLabel="Choose files"
        hbUploadLabel="Upload"
        hbClearLabel="Clear"
        hbDropLabel="Drop autumn photos here"
        (hbSelect)="onSelect($event)"
        (hbClear)="names.set('')"
      />

      <p class="font-mono text-[12px] text-muted-foreground">Selected: {{ names() || '—' }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFileUploadAdvancedComponent {
  protected readonly names = signal('');

  protected onSelect(files: HbUploadFile[]): void {
    this.names.set(files.map((file) => file.name).join(', '));
  }
}
