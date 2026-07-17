import { Injectable } from '@angular/core';
import type { Highlighter, ShikiTransformer } from 'shiki';

import { herbstShikiTheme } from './code-block.theme';

const LANGS = ['angular-ts', 'typescript', 'html', 'css', 'json', 'bash'] as const;

const ALIASES: Record<string, string> = { ts: 'typescript' };

let instance: Promise<Highlighter> | undefined;

@Injectable({ providedIn: 'root' })
export class HbHighlightService {
  async highlight(code: string, language: string, highlightLines: number[] = []): Promise<string> {
    const highlighter = await this.load();
    const lang = this.resolveLang(language);
    const transformers: ShikiTransformer[] = highlightLines.length
      ? [this.lineHighlighter(highlightLines)]
      : [];

    return highlighter.codeToHtml(code, { lang, theme: 'herbst', transformers });
  }

  private load(): Promise<Highlighter> {
    if (!instance) {
      instance = import('shiki').then(({ createHighlighter }) =>
        createHighlighter({ themes: [herbstShikiTheme], langs: [...LANGS] }),
      );
    }
    return instance;
  }

  private resolveLang(language: string): string {
    const key = language.toLowerCase();
    const resolved = ALIASES[key] ?? key;
    return (LANGS as readonly string[]).includes(resolved) ? resolved : 'text';
  }

  private lineHighlighter(lines: number[]): ShikiTransformer {
    const set = new Set(lines);
    return {
      name: 'herbst:line-highlight',
      line(node, line) {
        if (set.has(line)) this.addClassToHast(node, 'highlighted');
      },
    };
  }
}
