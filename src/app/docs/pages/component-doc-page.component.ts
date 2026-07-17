import { NgComponentOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { HbCodePreviewImports, HbTableImports } from '@herbst/ui';

import { COMPONENT_DOCS, type LocalizedText } from '../component-docs';
import { titleFromSlug } from '../docs-nav';
import { DocsPagerComponent } from '../docs-pager.component';
import { LocaleService } from '../locale.service';
import { TranslatePipe } from '../t.pipe';

@Component({
  selector: 'app-component-doc-page',
  imports: [
    NgComponentOutlet,
    RouterLink,
    HbCodePreviewImports,
    HbTableImports,
    TranslatePipe,
    DocsPagerComponent,
  ],
  template: `
    <div class="docs-prose">
      <p
        class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {{ 'doc.eyebrow' | t }}
      </p>
      <h1>{{ title() }}</h1>
    </div>

    @if (doc(); as d) {
      <p class="mt-3 max-w-[60ch] text-[15px] leading-[1.7] text-foreground">{{ description() }}</p>

      <div class="mt-10 flex flex-col gap-12">
        @for (demo of d.demos; track demo.id) {
          <section>
            <h2 class="mb-3 font-display text-xl font-semibold tracking-tight">
              {{ text(demo.title) }}
            </h2>
            <hb-code-preview
              [hbCode]="demo.source"
              [hbLanguage]="demo.language ?? 'angular-ts'"
              [hbAlign]="demo.align ?? 'center'"
              [hbExpanded]="!!demo.expanded"
            >
              <ng-container *ngComponentOutlet="demo.component" />
            </hb-code-preview>
          </section>
        }
      </div>

      <section class="mt-14">
        <h2 class="mb-5 font-display text-2xl font-semibold tracking-tight">
          {{ 'api.reference' | t }}
        </h2>
        <div class="flex flex-col gap-8">
          @for (table of d.api; track table.title) {
            <div>
              <h3 class="mb-3 font-mono text-sm text-primary">{{ table.title }}</h3>
              <hb-table>
                <thead hb-table-header>
                  <tr hb-table-row>
                    <th hb-table-head>{{ 'api.property' | t }}</th>
                    <th hb-table-head>{{ 'api.description' | t }}</th>
                    <th hb-table-head>{{ 'api.type' | t }}</th>
                    <th hb-table-head>{{ 'api.default' | t }}</th>
                  </tr>
                </thead>
                <tbody hb-table-body>
                  @for (row of table.rows; track row.property) {
                    <tr hb-table-row>
                      <td hb-table-cell class="font-mono whitespace-nowrap text-primary">
                        {{ row.property }}
                      </td>
                      <td hb-table-cell class="text-foreground">{{ text(row.description) }}</td>
                      <td hb-table-cell class="font-mono whitespace-nowrap text-muted-foreground">
                        {{ row.type }}
                      </td>
                      <td hb-table-cell class="font-mono whitespace-nowrap text-muted-foreground">
                        {{ row.default }}
                      </td>
                    </tr>
                  }
                </tbody>
              </hb-table>
            </div>
          }
        </div>
      </section>

      <app-docs-pager [slug]="name()" />
    } @else {
      <div class="docs-prose mt-3">
        <p>{{ 'placeholder.body' | t }}</p>
        <p>
          <a [routerLink]="loc.docsLink('components')">{{ 'placeholder.back' | t }}</a>
        </p>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentDocPageComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly loc = inject(LocaleService);

  protected readonly name = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('name') ?? '')),
    { initialValue: '' },
  );

  protected readonly doc = computed(() => COMPONENT_DOCS[this.name()]);
  protected readonly title = computed(() => this.doc()?.title ?? titleFromSlug(this.name()));
  protected readonly description = computed(() => {
    const doc = this.doc();
    return doc ? this.text(doc.description) : '';
  });

  protected text(value: LocalizedText): string {
    return value[this.loc.locale()];
  }
}
