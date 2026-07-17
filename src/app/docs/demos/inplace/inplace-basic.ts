import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbInplaceImports, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-inplace-basic',
  imports: [HbInplaceImports, HbInputDirective, HbButtonComponent],
  template: `
    <hb-inplace class="w-full max-w-sm">
      <ng-template hbInplaceDisplay>
        <span class="text-sm">
          Photo title:
          <span class="font-medium">{{ value() }}</span>
          <span class="text-muted-foreground"> — click to edit</span>
        </span>
      </ng-template>

      <ng-template hbInplaceContent>
        <div class="flex items-center gap-2">
          <input hb-input #box [value]="value()" placeholder="Autumn morning" />
          <button hb-button hbInplaceCloser (click)="value.set(box.value)">Save</button>
        </div>
      </ng-template>
    </hb-inplace>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoInplaceBasicComponent {
  protected readonly value = signal('Autumn morning');
}
