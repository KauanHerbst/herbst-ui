import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbTableImports } from '@herbst/ui';

import { DocsPagerComponent } from '../docs-pager.component';
import { TranslatePipe } from '../t.pipe';

@Component({
  selector: 'app-theme-page',
  imports: [HbTableImports, TranslatePipe, DocsPagerComponent],
  template: `
    <div class="docs-prose">
      <p
        class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {{ 'theme.eyebrow' | t }}
      </p>
      <h1>{{ 'theme.title' | t }}</h1>
      <p>{{ 'theme.intro' | t }}</p>
      <h2>{{ 'theme.h2.tokens' | t }}</h2>
      <p>{{ 'theme.tokens.desc' | t }}</p>
    </div>

    <div class="my-6">
      <hb-table>
        <tbody hb-table-body>
          @for (token of tokens; track token) {
            <tr hb-table-row>
              <td hb-table-cell class="w-10">
                <span
                  class="block size-6 rounded-md border border-border"
                  [style.background]="'var(' + token + ')'"
                ></span>
              </td>
              <td hb-table-cell class="font-mono text-[13px] text-primary">{{ token }}</td>
            </tr>
          }
        </tbody>
      </hb-table>
    </div>

    <div class="docs-prose">
      <h2>{{ 'theme.h2.editing' | t }}</h2>
      <p>{{ 'theme.editing.desc' | t }}</p>
      <h2>{{ 'theme.h2.rest' | t }}</h2>
      <p>{{ 'theme.rest.desc' | t }}</p>
    </div>

    <app-docs-pager slug="theme" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePageComponent {
  protected readonly tokens: string[] = [
    '--background',
    '--foreground',
    '--card',
    '--muted',
    '--muted-foreground',
    '--primary',
    '--accent',
    '--border',
    '--destructive',
    '--success',
    '--warning',
    '--ring',
  ];
}
