import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { HbScrollAreaImports, HbSegmentedImports } from '@herbst/ui';

import { COMPONENT_NAMES, DOCS_GROUPS, titleFromSlug } from './docs-nav';
import { LocaleService } from './locale.service';
import { TranslatePipe } from './t.pipe';

@Component({
  selector: 'app-docs-sidebar',
  imports: [RouterLink, RouterLinkActive, HbScrollAreaImports, HbSegmentedImports, TranslatePipe],
  template: `
    <hb-scroll-area class="h-full">
      <nav class="flex flex-col gap-6 py-6 pr-3">
        <div class="lg:hidden">
          <p
            class="mb-2 px-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
          >
            {{ 'a11y.language' | t }}
          </p>
          <hb-segmented
            hbSize="sm"
            hbFluid
            [hbValue]="loc.locale()"
            (hbValueChange)="switchLocale($event)"
            class="font-mono"
            [attr.aria-label]="'a11y.language' | t"
          >
            <hb-segmented-item value="en" label="EN"></hb-segmented-item>
            <hb-segmented-item value="pt" label="PT"></hb-segmented-item>
          </hb-segmented>
        </div>

        @for (group of groups; track group.key) {
          <div>
            <p
              class="mb-2 px-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
            >
              {{ group.key | t }}
            </p>
            <ul class="flex flex-col">
              @for (slug of group.slugs; track slug) {
                <li>
                  <a
                    [routerLink]="loc.docsLink(slug)"
                    routerLinkActive="border-l-primary bg-accent/60 font-medium text-foreground"
                    class="block border-l-2 border-l-transparent py-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    (click)="navigate.emit()"
                  >
                    {{ 'page.' + slug | t }}
                  </a>
                </li>
              }
            </ul>
          </div>
        }

        <div>
          <p
            class="mb-2 px-2 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
          >
            {{ 'group.components' | t }}
          </p>
          <ul class="flex flex-col">
            @for (name of components; track name) {
              <li>
                <a
                  [routerLink]="loc.docsLink('components', name)"
                  routerLinkActive="border-l-primary bg-accent/60 font-medium text-foreground"
                  class="block border-l-2 border-l-transparent py-1.5 pl-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  (click)="navigate.emit()"
                >
                  {{ title(name) }}
                </a>
              </li>
            }
          </ul>
        </div>
      </nav>
    </hb-scroll-area>
  `,
  host: { class: 'block h-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSidebarComponent {
  readonly navigate = output<void>();

  protected readonly loc = inject(LocaleService);
  protected readonly groups = DOCS_GROUPS;
  protected readonly components = COMPONENT_NAMES;
  protected readonly title = titleFromSlug;

  protected switchLocale(next: string): void {
    this.loc.switchLocale(next);
    this.navigate.emit();
  }
}
