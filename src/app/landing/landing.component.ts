import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgIcon } from '@ng-icons/core';

import {
  HbAlertComponent,
  HbAvatarImports,
  HbBadgeImports,
  HbBreadcrumbImports,
  HbButtonComponent,
  HbCarouselImports,
  HbCheckboxImports,
  HbHoverCardImports,
  HbInputDirective,
  HbKbdImports,
  HbPaginationImports,
  HbProgressImports,
  HbRadioImports,
  HbSegmentedImports,
  HbSkeletonImports,
  HbSwitchImports,
  HbTabsImports,
} from '@herbst/ui';

import herbstPkg from '../../../projects/herbst/package.json';

import { DocsHeaderComponent } from '../docs/docs-header.component';
import { LocaleService } from '../docs/locale.service';
import { TranslatePipe } from '../docs/t.pipe';
import { HbLeavesComponent } from './hb-leaves.component';

@Component({
  selector: 'app-landing',
  imports: [
    RouterLink,
    NgIcon,
    HbAlertComponent,
    HbButtonComponent,
    HbAvatarImports,
    HbBadgeImports,
    HbBreadcrumbImports,
    HbCarouselImports,
    HbCheckboxImports,
    HbHoverCardImports,
    HbInputDirective,
    HbKbdImports,
    HbPaginationImports,
    HbProgressImports,
    HbRadioImports,
    HbSegmentedImports,
    HbSkeletonImports,
    HbSwitchImports,
    HbTabsImports,
    DocsHeaderComponent,
    HbLeavesComponent,
    TranslatePipe,
  ],
  templateUrl: './landing.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:scroll)': 'onScroll()',
    '(window:resize)': 'onScroll()',
  },
  styles: `
    @keyframes hbBob {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(7px);
      }
    }
    @keyframes hbBlink {
      0%,
      49% {
        opacity: 1;
      }
      50%,
      100% {
        opacity: 0;
      }
    }
    @keyframes hbBlurFade {
      from {
        opacity: 0;
        filter: blur(6px);
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        filter: blur(0);
        transform: translateY(0);
      }
    }
    .hb-blur-fade {
      animation: hbBlurFade 0.7s ease-out both;
    }
    .hb-hero-hint {
      animation:
        hbBlurFade 0.7s ease-out 0.48s both,
        hbBob 2.4s ease-in-out 1.2s infinite;
    }
    .hb-blink {
      animation: hbBlink 1.1s step-end infinite;
    }
    @media (prefers-reduced-motion: reduce) {
      .hb-blur-fade,
      .hb-hero-hint,
      .hb-blink {
        animation: none;
      }
    }
  `,
})
export class Landing {
  protected readonly loc = inject(LocaleService);
  private readonly leaves = viewChild(HbLeavesComponent);

  protected readonly libName = herbstPkg.name;
  protected readonly libVersion = herbstPkg.version;

  protected readonly heroImages = [
    '/images/landing/autumn-1.jpg',
    '/images/landing/autumn-2.jpg',
    '/images/landing/autumn-3.jpg',
    '/images/landing/autumn-4.jpg',
  ];
  protected readonly heroImg = signal(0);
  protected readonly heroP = signal(0);
  protected readonly reduceMotion = signal(false);
  private isMobile = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    destroyRef.onDestroy(() => {
      if (this.copyTimer) clearTimeout(this.copyTimer);
    });
    afterNextRender(() => {
      this.onScroll();
      if (
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        this.reduceMotion.set(true);
        return;
      }
      const timer = setInterval(
        () => this.heroImg.update((i) => (i + 1) % this.heroImages.length),
        3500,
      );
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  protected onScroll(): void {
    this.isMobile = window.innerWidth < 768;
    this.heroP.set(Math.min(2, Math.max(0, window.scrollY / window.innerHeight)));
  }

  protected heroImgBox(): Record<string, string> {
    const p = this.heroP();
    const t1 = Math.min(1, p);
    const t2 = Math.max(0, p - 1);
    return {
      left: `${58 * (1 - t1)}vw`,
      top: `${16 * (1 - t1)}vh`,
      width: `${34 + 66 * t1 - 50 * t2}vw`,
      height: `${68 + 32 * t1}vh`,
      'border-radius': `${12 * (1 - t1)}px`,
      filter: `grayscale(${1 - t1})`,
      opacity: `${0.3 + 0.7 * t1}`,
    };
  }

  protected heroCopyStyle(): Record<string, string> {
    if (this.isMobile) return {};
    const p = this.heroP();
    const o = Math.max(0, 1 - p * 2.5);
    return {
      opacity: `${o}`,
      visibility: o <= 0.01 ? 'hidden' : 'visible',
      'pointer-events': p > 0.2 ? 'none' : 'auto',
    };
  }

  protected heroArrivedStyle(): Record<string, string> {
    const p = this.heroP();
    const o = Math.min(1, Math.max(0, (p - 0.7) / 0.3));
    return {
      opacity: `${o}`,
      filter: `blur(${6 * (1 - o)}px)`,
      transform: `translateY(${8 * (1 - o)}px)`,
    };
  }

  protected heroPanelStyle(delay = 0): Record<string, string> {
    const p = this.heroP();
    const o = Math.min(1, Math.max(0, (p - 1.35 - delay) / 0.45));
    return {
      opacity: `${o}`,
      visibility: o <= 0.01 ? 'hidden' : 'visible',
      filter: `blur(${6 * (1 - o)}px)`,
      transform: `translateY(${8 * (1 - o)}px)`,
      'pointer-events': o > 0.5 ? 'auto' : 'none',
    };
  }

  protected readonly copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly specTab = signal<unknown>('overview');
  protected readonly specView = signal('grid');
  protected readonly specPlan = signal('walk');
  protected readonly specPage = signal(2);

  protected readonly themeSwatches = [
    { cls: 'bg-background', name: 'background' },
    { cls: 'bg-foreground', name: 'foreground' },
    { cls: 'bg-card', name: 'card' },
    { cls: 'bg-primary', name: 'primary' },
    { cls: 'bg-secondary', name: 'secondary' },
    { cls: 'bg-muted', name: 'muted' },
    { cls: 'bg-accent', name: 'accent' },
    { cls: 'bg-border', name: 'border' },
    { cls: 'bg-ring', name: 'ring' },
    { cls: 'bg-destructive', name: 'destructive' },
    { cls: 'bg-success', name: 'success' },
    { cls: 'bg-warning', name: 'warning' },
  ];

  protected gust(): void {
    this.leaves()?.gust();
  }

  protected copyCli(): void {
    void navigator.clipboard
      ?.writeText('npx herbst-ui add button calendar command')
      .catch(() => undefined);
    this.copied.set(true);
    if (this.copyTimer) clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(false), 1500);
  }
}
