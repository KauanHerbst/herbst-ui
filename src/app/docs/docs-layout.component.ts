import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';

import { HbSheetImports } from '@herbst/ui';

import { DocsFooterComponent } from './docs-footer.component';
import { DocsHeaderComponent } from './docs-header.component';
import { DocsSidebarComponent } from './docs-sidebar.component';
import { DocsTocComponent } from './docs-toc.component';
import { isLocale, LocaleService } from './locale.service';

@Component({
  selector: 'app-docs-layout',
  imports: [
    RouterOutlet,
    HbSheetImports,
    DocsHeaderComponent,
    DocsSidebarComponent,
    DocsTocComponent,
    DocsFooterComponent,
  ],
  template: `
    <div class="fixed inset-0 flex flex-col overflow-hidden bg-background text-foreground">
      @if (navigating()) {
        <div class="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-primary"></div>
      }
      <app-docs-header class="shrink-0" (menuToggle)="sidebarOpen.set(true)" />

      <div class="mx-auto flex w-full max-w-[1400px] min-h-0 flex-1 overflow-hidden px-4 lg:px-6">
        <aside class="hidden h-full w-60 shrink-0 lg:block">
          <app-docs-sidebar />
        </aside>

        <main #scroller class="min-w-0 flex-1 overflow-y-auto">
          <div
            id="docs-content"
            tabindex="-1"
            class="mx-auto max-w-[46rem] py-10 outline-none lg:px-10"
          >
            <router-outlet />
          </div>
          <app-docs-footer />
        </main>

        <aside class="hidden h-full w-64 shrink-0 overflow-y-auto pl-8 xl:block">
          <app-docs-toc />
        </aside>
      </div>
    </div>

    <hb-sheet
      hbSide="left"
      [hbOpen]="sidebarOpen()"
      (hbOpenChange)="sidebarOpen.set($event)"
      [hbShowFooter]="false"
    >
      <div hbSheetContent class="h-full">
        <app-docs-sidebar (navigate)="sidebarOpen.set(false)" />
      </div>
    </hb-sheet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsLayoutComponent {
  protected readonly sidebarOpen = signal(false);
  protected readonly navigating = signal(false);
  private readonly scroller = viewChild<ElementRef<HTMLElement>>('scroller');

  constructor() {
    const locale = inject(LocaleService);
    inject(ActivatedRoute)
      .paramMap.pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const lang = params.get('lang');
        if (isLocale(lang)) locale.setLocale(lang);
      });

    let initial = true;
    inject(Router)
      .events.pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.navigating.set(true);
          return;
        }
        if (event instanceof NavigationCancel || event instanceof NavigationError) {
          this.navigating.set(false);
          return;
        }
        if (!(event instanceof NavigationEnd)) return;
        this.navigating.set(false);
        const scroller = this.scroller()?.nativeElement;
        scroller?.scrollTo?.({ top: 0 });
        if (initial) {
          initial = false;
          return;
        }
        scroller?.querySelector<HTMLElement>('#docs-content')?.focus?.({ preventScroll: true });
      });
  }
}
