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

@Injectable({ providedIn: 'root' })
export class DocsTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly loc = inject(LocaleService);

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
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
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
