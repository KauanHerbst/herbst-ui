import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbFieldImports, HbFormComponent, HbInputDirective } from '@herbst/ui';

@Component({
  selector: 'hb-demo-form-basic',
  imports: [HbFormComponent, HbFieldImports, HbInputDirective, HbButtonComponent],
  template: `
    <form hb-form class="w-full max-w-sm" (submit)="onSubmit($event)">
      <hb-field>
        <label hb-field-label hbRequired>Photo title</label>
        <input hb-input name="title" placeholder="Autumn in the Black Forest" />
        <hb-field-description>A short title for your photo.</hb-field-description>
      </hb-field>

      <hb-field>
        <label hb-field-label hbRequired>City</label>
        <input hb-input name="city" placeholder="Freiburg" />
      </hb-field>

      <div class="flex items-center justify-end gap-2">
        <button hb-button hbType="ghost" type="reset">Reset</button>
        <button hb-button type="submit">Save</button>
      </div>

      <p class="font-mono text-[12px] text-muted-foreground">{{ status() }}</p>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoFormBasicComponent {
  protected readonly status = signal('Awaiting submission.');

  protected onSubmit(event: Event): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    this.status.set('Submitted: ' + (data.get('title') || '—'));
  }
}
