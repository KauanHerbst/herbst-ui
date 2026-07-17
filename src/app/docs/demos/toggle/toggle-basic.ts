import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorBell, phosphorStar, phosphorTextB } from '@ng-icons/phosphor-icons/regular';

import { HbToggleImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-toggle-basic',
  imports: [HbToggleImports],
  viewProviders: [provideIcons({ phosphorTextB, phosphorStar, phosphorBell })],
  template: `
    <div class="flex flex-wrap items-center gap-3">
      <hb-toggle [(hbPressed)]="bold" hbIcon="phosphorTextB" (hbChange)="last.set($event)">
        Bold
      </hb-toggle>

      <hb-toggle hbVariant="outline" hbIcon="phosphorStar" hbSize="lg">Star</hb-toggle>

      <hb-toggle hbVariant="outline" hbSize="sm" [hbPressed]="true">Subscribed</hb-toggle>

      <hb-toggle hbIcon="phosphorBell" hbDisabled>Muted</hb-toggle>
    </div>

    <p class="mt-3 font-mono text-[12px] text-muted-foreground">
      bold: {{ bold() }} · last change: {{ last() }}
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoToggleBasicComponent {
  protected readonly bold = signal(false);
  protected readonly last = signal<boolean | string>('—');
}
