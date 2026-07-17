import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorLeaf } from '@ng-icons/phosphor-icons/regular';

import { HbEmptyImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-empty-variants',
  imports: [HbEmptyImports, NgIcon],
  providers: [provideIcons({ phosphorLeaf })],
  template: `
    <div class="flex w-full max-w-md flex-col gap-4">
      <hb-empty hbVariant="outline" class="rounded-lg">
        <hb-empty-header>
          <hb-empty-media hbVariant="icon"><ng-icon name="phosphorLeaf" /></hb-empty-media>
          <hb-empty-title>Outline</hb-empty-title>
          <hb-empty-description>A dashed border frames the empty region.</hb-empty-description>
        </hb-empty-header>
      </hb-empty>

      <hb-empty hbBackground="muted" class="rounded-lg">
        <hb-empty-header>
          <hb-empty-media hbVariant="icon"><ng-icon name="phosphorLeaf" /></hb-empty-media>
          <hb-empty-title>Muted background</hb-empty-title>
          <hb-empty-description>A soft fill sets the region apart.</hb-empty-description>
        </hb-empty-header>
      </hb-empty>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoEmptyVariantsComponent {}
