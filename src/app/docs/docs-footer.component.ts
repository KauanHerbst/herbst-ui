import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

import { LocaleService } from './locale.service';
import { TranslatePipe } from './t.pipe';

@Component({
  selector: 'app-docs-footer',
  imports: [RouterLink, NgIcon, TranslatePipe],
  template: `
    <footer class="border-t border-border">
      <div
        class="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex items-center gap-3 text-muted-foreground">
          <span class="text-sm leading-none" aria-hidden="true">🍂</span>
          <span class="font-display text-sm italic tracking-[-0.01em] text-foreground"
            >Herbst UI</span
          >
          <span class="font-mono text-[11px]">{{ 'landing.footer.credit' | t }}</span>
        </div>
        <div class="flex items-center gap-4 text-sm text-muted-foreground">
          <a
            [routerLink]="loc.docsLink('introduction')"
            class="transition-colors hover:text-foreground"
          >
            {{ 'footer.docs' | t }}
          </a>
          <a
            [routerLink]="loc.docsLink('components')"
            class="transition-colors hover:text-foreground"
          >
            {{ 'footer.components' | t }}
          </a>
          <a
            href="https://github.com/KauanHerbst/herbst-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            class="inline-flex transition-colors hover:text-foreground [&>ng-icon>svg]:size-[18px]"
          >
            <ng-icon name="phosphorGithubLogo" />
          </a>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsFooterComponent {
  protected readonly loc = inject(LocaleService);
}
