import { DOCUMENT } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

import { slugify } from './docs-nav';
import { LocaleService } from './locale.service';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

@Component({
  selector: 'app-docs-toc',
  template: `
    @if (items().length) {
      <nav class="py-8" [attr.aria-label]="title()">
        <p
          class="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground"
        >
          {{ title() }}
        </p>
        <ul class="flex flex-col border-l border-border text-sm">
          @for (item of items(); track item.id) {
            <li>
              <a
                [href]="href(item.id)"
                class="-ml-px block border-l-2 border-l-transparent py-1 transition-colors"
                [class.pl-3]="item.level === 2"
                [class.pl-6]="item.level === 3"
                [class]="
                  active() === item.id
                    ? 'border-l-primary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                "
                [attr.aria-current]="active() === item.id ? 'location' : null"
                (click)="scrollTo($event, item.id)"
              >
                {{ item.text }}
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsTocComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly locale = inject(LocaleService);

  protected readonly items = signal<TocItem[]>([]);
  protected readonly active = signal('');
  protected readonly title = computed(() => this.locale.t('toc.title'));

  constructor() {
    afterNextRender(() => {
      const content = this.document.getElementById('docs-content');
      if (!content) return;
      const scan = (): void => this.build(content);
      const observer = new MutationObserver(scan);
      observer.observe(content, { childList: true, subtree: true, characterData: true });
      const scroller: EventTarget = content.closest('main') ?? window;
      let ticking = false;
      const onScroll = (): void => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          this.spy();
        });
      };
      scroller.addEventListener('scroll', onScroll, { passive: true });
      scan();
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        scroller.removeEventListener('scroll', onScroll);
      });
    });
  }

  private build(content: HTMLElement): void {
    const headings = Array.from(content.querySelectorAll('h2, h3')) as HTMLElement[];
    const items = headings.map((el) => {
      if (!el.id) el.id = slugify(el.textContent ?? '');
      return {
        id: el.id,
        text: (el.textContent ?? '').trim(),
        level: el.tagName === 'H2' ? 2 : 3,
      };
    });
    this.items.set(items);
    this.spy();
  }

  private spy(): void {
    let current = '';
    for (const item of this.items()) {
      const el = this.document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= 120) current = item.id;
    }
    this.active.set(current || this.items()[0]?.id || '');
  }

  protected href(id: string): string {
    return `${this.document.location?.pathname ?? ''}#${id}`;
  }

  protected scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', this.href(id));
  }
}
