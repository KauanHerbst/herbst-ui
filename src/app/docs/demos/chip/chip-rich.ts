import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { provideIcons } from '@ng-icons/core';
import { phosphorTag } from '@ng-icons/phosphor-icons/regular';

import { HbChipComponent } from '@herbst/ui';

const avatar =
  'data:image/svg+xml,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'>" +
      "<rect width='48' height='48' fill='#A64B2A'/></svg>",
  );

@Component({
  selector: 'hb-demo-chip-rich',
  imports: [HbChipComponent],
  providers: [provideIcons({ phosphorTag })],
  template: `
    <div class="flex flex-wrap items-center gap-2">
      <span hb-chip hbIcon="phosphorTag">Tagged</span>
      <span hb-chip hbType="outline" [hbImage]="avatar" hbImageAlt="Kauan">Kauan</span>

      @if (!removed()) {
        <span hb-chip hbType="outline" hbRemovable (hbRemove)="removed.set(true)">Removable</span>
      }

      <span hb-chip hbDisabled>Disabled</span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoChipRichComponent {
  protected readonly avatar = avatar;
  protected readonly removed = signal(false);
}
