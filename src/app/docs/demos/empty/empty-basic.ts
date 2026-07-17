import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent, HbEmptyImports } from '@herbst/ui';

@Component({
  selector: 'hb-demo-empty-basic',
  imports: [HbEmptyImports, HbButtonComponent, NgIcon],
  providers: [provideIcons({ phosphorMagnifyingGlass })],
  template: `
    <hb-empty class="w-full max-w-md rounded-lg border border-border">
      <hb-empty-header>
        <hb-empty-media hbVariant="icon">
          <ng-icon name="phosphorMagnifyingGlass" />
        </hb-empty-media>
        <hb-empty-title>No photos found</hb-empty-title>
        <hb-empty-description>
          Try a different search, or add a new autumn photo.
        </hb-empty-description>
      </hb-empty-header>

      <hb-empty-content>
        <button hb-button hbSize="sm">Add photo</button>
      </hb-empty-content>
    </hb-empty>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoEmptyBasicComponent {}
