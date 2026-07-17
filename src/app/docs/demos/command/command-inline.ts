import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbCommandImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-command-inline',
  imports: [HbCommandImports],
  template: `
    <div class="flex w-full max-w-md flex-col gap-2">
      <hb-command
        class="block rounded-lg border border-border"
        (hbSelect)="last.set($event)"
        (hbCommandChange)="query.set($event)"
      >
        <hb-command-input hbPlaceholder="Search actions…" />
        <hb-command-list>
          <hb-command-empty>No results found.</hb-command-empty>

          <hb-command-group hbHeading="Photos">
            <hb-command-item [hbValue]="'new'" hbLabel="New photo" [hbKeywords]="['add', 'create']">
              New photo
              <span hb-command-shortcut>⌘N</span>
            </hb-command-item>
            <hb-command-item [hbValue]="'search'" hbLabel="Search album">
              Search album
              <span hb-command-shortcut>⌘F</span>
            </hb-command-item>
          </hb-command-group>

          <hb-command-separator />

          <hb-command-group hbHeading="Manage">
            <hb-command-item [hbValue]="'archive'" hbLabel="Archive">Archive</hb-command-item>
            <hb-command-item [hbValue]="'delete'" hbLabel="Delete" hbDisabled
              >Delete (locked)</hb-command-item
            >
          </hb-command-group>
        </hb-command-list>

        <div hb-command-footer class="px-3 py-2 text-[11px] text-muted-foreground">
          Enter to run
        </div>
      </hb-command>

      <p class="font-mono text-[12px] text-muted-foreground">
        Selected: {{ last() ?? '—' }} · Query: {{ query() || '—' }}
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoCommandInlineComponent {
  protected readonly last = signal<unknown>(null);
  protected readonly query = signal('');
}
