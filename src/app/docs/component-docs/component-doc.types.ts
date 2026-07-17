import type { Type } from '@angular/core';

import type { HbCodeLanguage } from '@herbst/ui';

import type { Locale } from '../i18n';

export type LocalizedText = Record<Locale, string>;

export interface DemoEntry {
  id: string;
  title: LocalizedText;
  component: Type<unknown>;
  source: string;
  language?: HbCodeLanguage;
  align?: 'center' | 'start';
  expanded?: boolean;
}

export interface ApiRow {
  property: string;
  description: LocalizedText;
  type: string;
  default: string;
}

export interface ApiTable {
  title: string;
  rows: ApiRow[];
}

export interface ComponentDoc {
  slug: string;
  title: string;
  description: LocalizedText;
  demos: DemoEntry[];
  api: ApiTable[];
}

export function sourceText(mod: unknown): string {
  return (mod as { default: string }).default;
}
