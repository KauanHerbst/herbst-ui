import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbSpeedDialImports, type HbSpeedDialItem } from '@herbst/ui';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorDownloadSimple,
  phosphorEnvelope,
  phosphorTag,
  phosphorTrash,
} from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'hb-demo-speed-dial-basic',
  imports: [HbSpeedDialImports],
  viewProviders: [
    provideIcons({ phosphorTag, phosphorEnvelope, phosphorDownloadSimple, phosphorTrash }),
  ],
  template: `
    <div class="flex h-64 w-full items-end justify-center pb-2">
      <hb-speed-dial
        [hbModel]="items"
        hbRotateIcon
        hbAriaLabel="Actions"
        (hbItemClick)="log.set($any($event).label)"
      />
    </div>
    <p class="text-center font-mono text-[12px] text-muted-foreground">Clicked: {{ log() }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoSpeedDialBasicComponent {
  protected readonly log = signal('—');
  protected readonly items: HbSpeedDialItem[] = [
    { icon: 'phosphorTag', label: 'Tag' },
    { icon: 'phosphorEnvelope', label: 'Share' },
    { icon: 'phosphorDownloadSimple', label: 'Download' },
    { icon: 'phosphorTrash', label: 'Delete', disabled: true },
  ];
}
