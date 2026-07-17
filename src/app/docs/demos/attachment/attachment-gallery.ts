import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbAttachmentImports } from '@herbst/ui';

function plate(color: string): string {
  return (
    'data:image/svg+xml,' +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
        "<rect width='160' height='160' fill='" +
        color +
        "'/></svg>",
    )
  );
}

@Component({
  selector: 'hb-demo-attachment-gallery',
  imports: [HbAttachmentImports],
  template: `
    <hb-attachment-group class="max-w-xl flex-wrap">
      @for (item of items; track item.name) {
        <hb-attachment
          hbOrientation="vertical"
          class="w-40"
          [hbSrc]="item.src"
          [hbName]="item.name"
          hbDescription="image"
          hbRemovable
        />
      }
    </hb-attachment-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoAttachmentGalleryComponent {
  protected readonly items = [
    { name: 'oak-leaves.jpg', src: plate('#A64B2A') },
    { name: 'misty-forest.png', src: plate('#6B7A55') },
    { name: 'chestnuts.webp', src: plate('#C79A4E') },
  ];
}
