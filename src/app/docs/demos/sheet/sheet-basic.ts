import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbFieldImports, HbInputDirective, HbSheetImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-sheet-basic',
  imports: [HbSheetImports, HbButtonComponent, HbFieldImports, HbInputDirective],
  template: `
    <div class="flex flex-col items-start gap-2">
      <hb-sheet
        hbTitle="Edit photo"
        hbDescription="Update the record for IMG·019."
        hbOkText="Save"
        hbCancelText="Discard"
        (hbOk)="log.set('saved')"
        (hbCancel)="log.set('discarded')"
      >
        <button hbSheetTrigger hb-button hbType="outline">Open sheet</button>

        <div hbSheetContent class="flex flex-col gap-4">
          <hb-field>
            <label hb-field-label>Title</label>
            <input hb-input value="Oak leaves" />
          </hb-field>
          <hb-field>
            <label hb-field-label>City</label>
            <input hb-input value="Freiburg" />
          </hb-field>
        </div>
      </hb-sheet>

      <p class="font-mono text-[12px] text-muted-foreground">Last action: {{ log() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSheetBasicComponent {
  protected readonly log = signal('—');
}
