import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbMenuImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-menu-basic',
  imports: [HbMenuImports, HbButtonComponent],
  template: `
    <div class="flex flex-col items-start gap-2">
      <button hb-button [hbMenuTriggerFor]="menu" (hbOpenChange)="open.set($event)">
        {{ open() ? 'Open ▲' : 'Actions ▼' }}
      </button>
      <span class="font-mono text-[12px] text-muted-foreground">Last: {{ last() }}</span>
    </div>

    <ng-template #menu>
      <hb-menu>
        <hb-menu-label>Photo</hb-menu-label>
        <hb-menu-item (hbSelect)="last.set('Edit')">
          Edit
          <hb-menu-shortcut>⌘E</hb-menu-shortcut>
        </hb-menu-item>
        <hb-menu-item (hbSelect)="last.set('Duplicate')">
          Duplicate
          <hb-menu-shortcut>⌘D</hb-menu-shortcut>
        </hb-menu-item>
        <hb-menu-item hbDisabled>Archive (disabled)</hb-menu-item>
        <hb-menu-separator />
        <hb-menu-item hbVariant="destructive" (hbSelect)="last.set('Delete')">
          Delete
          <hb-menu-shortcut>⌫</hb-menu-shortcut>
        </hb-menu-item>
      </hb-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoMenuBasicComponent {
  protected readonly open = signal(false);
  protected readonly last = signal('—');
}
