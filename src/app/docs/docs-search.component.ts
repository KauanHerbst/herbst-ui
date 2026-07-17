import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

import { HbCommandImports, HbKbdImports } from '@herbst/ui';

import { COMPONENT_NAMES, DOCS_GROUPS, titleFromSlug } from './docs-nav';
import { LocaleService } from './locale.service';
import { TranslatePipe } from './t.pipe';

interface SearchItem {
  title: string;
  path: string;
}

@Component({
  selector: 'app-docs-search',
  imports: [NgIcon, HbCommandImports, HbKbdImports, TranslatePipe],
  template: `
    <button
      type="button"
      class="inline-flex h-9 w-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-0 text-sm text-muted-foreground transition-colors hover:bg-accent sm:w-full sm:max-w-[220px] sm:justify-start sm:px-3"
      [attr.aria-label]="'search.trigger' | t"
      (click)="open.set(true)"
    >
      <ng-icon name="phosphorMagnifyingGlass" class="[&>svg]:size-4" />
      <span class="hidden flex-1 text-left sm:block">{{ 'search.trigger' | t }}</span>
      <span class="hidden sm:inline-flex"
        ><hb-kbd hbSize="sm">{{ modKey() }}</hb-kbd></span
      >
    </button>

    <hb-command-dialog [(hbOpen)]="open" hbHotkey="mod+k">
      <hb-command (hbSelect)="go($event)">
        <hb-command-input [hbPlaceholder]="'search.placeholder' | t"></hb-command-input>
        <hb-command-list>
          <hb-command-empty>{{ 'search.empty' | t }}</hb-command-empty>
          <hb-command-group [hbHeading]="'search.pages' | t">
            @for (entry of pages(); track entry.path) {
              <hb-command-item [hbValue]="entry.path">{{ entry.title }}</hb-command-item>
            }
          </hb-command-group>
          <hb-command-group [hbHeading]="'search.components' | t">
            @for (entry of components(); track entry.path) {
              <hb-command-item [hbValue]="entry.path">{{ entry.title }}</hb-command-item>
            }
          </hb-command-group>
        </hb-command-list>
      </hb-command>
    </hb-command-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsSearchComponent {
  private readonly router = inject(Router);
  protected readonly loc = inject(LocaleService);

  protected readonly open = signal(false);
  protected readonly modKey = signal('⌘K');

  constructor() {
    afterNextRender(() => {
      if (!/Mac|iP/.test(navigator.platform ?? '')) this.modKey.set('Ctrl K');
    });
  }

  protected readonly pages = computed<SearchItem[]>(() =>
    DOCS_GROUPS.flatMap((group) =>
      group.slugs.map((slug) => ({
        title: this.loc.t('page.' + slug),
        path: `/${this.loc.locale()}/docs/${slug}`,
      })),
    ),
  );

  protected readonly components = computed<SearchItem[]>(() =>
    COMPONENT_NAMES.map((name) => ({
      title: titleFromSlug(name),
      path: `/${this.loc.locale()}/docs/components/${name}`,
    })),
  );

  protected go(path: unknown): void {
    this.open.set(false);
    if (typeof path === 'string') this.router.navigateByUrl(path);
  }
}
