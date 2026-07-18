import { DOCUMENT } from '@angular/common';
import { afterNextRender, inject, Injectable, Injector, signal } from '@angular/core';
import { Router } from '@angular/router';

import { DEFAULT_LOCALE, type Locale, MESSAGES } from './i18n';

const STORAGE_KEY = 'herbst-docs-lang';

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'en' || value === 'pt';
}

export function preferredLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    return DEFAULT_LOCALE;
  }
  return DEFAULT_LOCALE;
}

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);

  readonly locale = signal<Locale>(DEFAULT_LOCALE);

  constructor() {
    afterNextRender(() => {
      if (/^\/(en|pt)(\/|$)/.test(this.document.location?.pathname ?? '')) return;
      const preferred = preferredLocale();
      if (preferred !== this.locale()) {
        this.locale.set(preferred);
        this.document.documentElement.lang = preferred;
      }
    });
  }

  setLocale(locale: Locale): void {
    this.locale.set(locale);
    this.document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      return;
    }
  }

  t(key: string, locale: Locale = this.locale()): string {
    return MESSAGES[locale][key] ?? MESSAGES[DEFAULT_LOCALE][key] ?? key;
  }

  docsLink(...segments: string[]): unknown[] {
    return ['/', this.locale(), 'docs', ...segments];
  }

  switchLocale(next: string): void {
    if (this.locale() === next || !isLocale(next)) return;
    const router = this.injector.get(Router);
    if (/^\/(en|pt)(\/|$)/.test(router.url)) {
      router.navigateByUrl(router.url.replace(/^\/(en|pt)(\/|$)/, `/${next}$2`));
      return;
    }
    this.setLocale(next);
  }
}
