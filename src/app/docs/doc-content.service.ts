import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';

import { type Locale } from './i18n';
import { LocaleService } from './locale.service';

@Injectable({ providedIn: 'root' })
export class DocContentService {
  private readonly http = inject(HttpClient);
  private readonly locale = inject(LocaleService);

  loadRaw(slug: string, locale: Locale = this.locale.locale()): Observable<string> {
    return this.http.get(`/content/${locale}/${slug}.md`, { responseType: 'text' });
  }
}
