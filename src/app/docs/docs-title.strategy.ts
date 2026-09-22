import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  type ActivatedRouteSnapshot,
  type RouterStateSnapshot,
  TitleStrategy,
} from '@angular/router';

import { titleFromSlug } from './docs-nav';
import { type Locale } from './i18n';
import { isLocale, LocaleService } from './locale.service';

const BRAND = 'Herbst UI';
const SITE = 'https://ui.kauanherbst.dev';
const OG_IMAGE = `${SITE}/images/og-cover.jpg`;

@Injectable({ providedIn: 'root' })
export class DocsTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly loc = inject(LocaleService);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const locale = this.localeFrom(snapshot);
    const page = this.pageTitle(this.deepest(snapshot.root), locale);
    const title = page ? `${BRAND} | ${page}` : BRAND;
    this.title.setTitle(title);

    const description = this.loc.t('meta.description', locale);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ property: 'og:image', content: OG_IMAGE });
    this.meta.updateTag({ property: 'og:site_name', content: BRAND });

    const path = snapshot.url.split('#')[0].split('?')[0].replace(/\/$/, '');
    this.meta.updateTag({ property: 'og:url', content: `${SITE}${path}` });
    this.setLink('canonical', `${SITE}${path}`);

    const match = /^\/(en|pt)(\/.*)?$/.exec(path);
    if (!match) return;
    const rest = match[2] ?? '';
    this.setLink('alternate', `${SITE}/en${rest}`, 'en');
    this.setLink('alternate', `${SITE}/pt${rest}`, 'pt');
    this.setLink('alternate', `${SITE}/en${rest}`, 'x-default');
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const head = this.document.head;
    const selector = hreflang
      ? `link[rel="${rel}"][hreflang="${hreflang}"]`
      : `link[rel="${rel}"]:not([hreflang])`;
    const link =
      head.querySelector<HTMLLinkElement>(selector) ?? this.document.createElement('link');
    link.setAttribute('rel', rel);
    link.setAttribute('href', href);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    if (!link.parentNode) head.appendChild(link);
  }

  private deepest(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    let current = route;
    while (current.firstChild) current = current.firstChild;
    return current;
  }

  private localeFrom(snapshot: RouterStateSnapshot): Locale {
    for (
      let route: ActivatedRouteSnapshot | null = snapshot.root;
      route;
      route = route.firstChild
    ) {
      const lang = route.params['lang'];
      if (isLocale(lang)) return lang;
    }
    return this.loc.locale();
  }

  private pageTitle(route: ActivatedRouteSnapshot, locale: Locale): string | null {
    const name = route.params['name'];
    if (name) return titleFromSlug(name);

    const slug = (route.data['slug'] as string | undefined) ?? route.routeConfig?.path;
    if (!slug) return null;

    if (slug === 'components') return this.loc.t('nav.components', locale);

    const key = `page.${slug}`;
    const label = this.loc.t(key, locale);
    return label === key ? titleFromSlug(slug) : label;
  }
}
