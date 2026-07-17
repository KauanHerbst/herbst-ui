import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbButtonComponent, HbCommandImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-command-dialog',
  imports: [HbCommandImports, HbButtonComponent],
  template: `
    <button hb-button hbType="outline" (click)="open.set(true)">
      Open palette
      <span hb-command-shortcut class="ml-1">⌘K</span>
    </button>

    <hb-command-dialog hbHotkey="k" [hbOpen]="open()" (hbOpenChange)="open.set($event)">
      <hb-command (hbSelect)="open.set(false)">
        <hb-command-input hbPlaceholder="Type a command…" />
        <hb-command-list>
          <hb-command-empty>No results found.</hb-command-empty>
          <hb-command-group hbHeading="Actions">
            <hb-command-item [hbValue]="'new'" hbLabel="New photo">
              New photo
              <span hb-command-shortcut>⌘N</span>
            </hb-command-item>
            <hb-command-item [hbValue]="'search'" hbLabel="Search album"
              >Search album</hb-command-item
            >
            <hb-command-item [hbValue]="'theme'" hbLabel="Toggle theme"
              >Toggle theme</hb-command-item
            >
          </hb-command-group>
        </hb-command-list>
      </hb-command>
    </hb-command-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCommandDialogComponent {
  protected readonly open = signal(false);
}
