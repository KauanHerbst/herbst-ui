import { DOCUMENT } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

import { HbBadgeImports, HbButtonComponent, HbSegmentedImports } from '@herbst/ui';

import { DocsSearchComponent } from './docs-search.component';
import { LocaleService } from './locale.service';
import { TranslatePipe } from './t.pipe';

@Component({
  selector: 'app-docs-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIcon,
    HbBadgeImports,
    HbButtonComponent,
    HbSegmentedImports,
    DocsSearchComponent,
    TranslatePipe,
  ],
  template: `
    <header class="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div class="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 lg:px-6">
        @if (menu()) {
          <a
            href="#docs-content"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-16 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-background focus:px-3 focus:py-2 focus:text-sm"
          >
            {{ 'a11y.skip' | t }}
          </a>
        }
        @if (menu()) {
          <button
            hb-button
            hbType="ghost"
            hbSize="icon"
            class="lg:hidden"
            [attr.aria-label]="'a11y.menu' | t"
            (click)="menuToggle.emit()"
          >
            <ng-icon name="phosphorList" />
          </button>
        }

        <a routerLink="/" class="flex shrink-0 items-baseline gap-2">
          <span class="self-center text-lg leading-none" aria-hidden="true">🍂</span>
          <span class="font-display text-lg font-semibold italic tracking-[-0.01em]"
            >Herbst UI</span
          >
          <span hb-badge hbType="outline" hbSize="xs" class="font-mono uppercase tracking-[0.08em]">
            beta
          </span>
        </a>

        <nav
          class="hidden items-center gap-1 text-sm md:flex"
          [attr.aria-label]="'a11y.mainNav' | t"
        >
          @for (link of navLinks; track link[0]) {
            <a
              [routerLink]="loc.docsLink(link[0])"
              routerLinkActive="text-foreground"
              ariaCurrentWhenActive="page"
              class="rounded-md px-2 py-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {{ link[1] | t }}
            </a>
          }
        </nav>

        <div class="ml-auto flex items-center gap-2">
          <app-docs-search />

          <hb-segmented
            hbSize="sm"
            [hbValue]="loc.locale()"
            (hbValueChange)="loc.switchLocale($event)"
            class="hidden font-mono md:inline-flex"
            [attr.aria-label]="'a11y.language' | t"
          >
            <hb-segmented-item value="en" label="EN"></hb-segmented-item>
            <hb-segmented-item value="pt" label="PT"></hb-segmented-item>
          </hb-segmented>

          <a
            hb-button
            hbType="ghost"
            hbSize="icon"
            href="https://github.com/KauanHerbst/herbst-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <ng-icon name="phosphorGithubLogo" />
          </a>
          <button
            hb-button
            hbType="ghost"
            hbSize="icon"
            [attr.aria-label]="'a11y.theme' | t"
            [attr.aria-pressed]="dark()"
            (click)="toggleDark()"
          >
            <ng-icon [name]="dark() ? 'phosphorSun' : 'phosphorMoon'" />
          </button>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsHeaderComponent {
  private readonly document = inject(DOCUMENT);
  protected readonly loc = inject(LocaleService);

  readonly menu = input(true, { transform: booleanAttribute });
  readonly menuToggle = output<void>();

  protected readonly navLinks = [
    ['introduction', 'nav.docs'],
    ['components', 'nav.components'],
    ['theme', 'nav.theme'],
    ['colors', 'nav.colors'],
  ] as const;

  protected readonly dark = signal(this.document.documentElement.classList.contains('dark'));

  protected toggleDark(): void {
    this.dark.update((value) => !value);
    this.document.documentElement.classList.toggle('dark', this.dark());
    try {
      localStorage.setItem('herbst-theme', this.dark() ? 'dark' : 'light');
    } catch {
      return;
    }
  }
}
