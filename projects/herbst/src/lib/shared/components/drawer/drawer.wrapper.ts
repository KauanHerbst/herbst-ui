import { DestroyRef, Directive, ElementRef, Injectable, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class HbDrawerScaleService {
  private wrapper: HTMLElement | null = null;
  private depth = 0;

  register(el: HTMLElement): void {
    this.wrapper = el;
  }

  unregister(el: HTMLElement): void {
    if (this.wrapper === el) {
      this.reset();
      this.wrapper = null;
    }
  }

  push(): void {
    this.depth++;
    this.apply();
  }

  pop(): void {
    this.depth = Math.max(0, this.depth - 1);
    this.apply();
  }

  private apply(): void {
    const el = this.wrapper;
    if (!el) return;
    if (this.depth > 0) {
      el.style.transformOrigin = 'center top';
      el.style.transition =
        'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-radius 0.4s cubic-bezier(0.32, 0.72, 0, 1)';
      el.style.overflow = 'hidden';
      el.style.borderRadius = '0.75rem';
      el.style.transform = 'scale(0.96) translateY(0.5rem)';
    } else {
      this.reset();
    }
  }

  private reset(): void {
    const el = this.wrapper;
    if (!el) return;
    el.style.transform = '';
    el.style.borderRadius = '';
  }
}

@Directive({ selector: '[hbDrawerWrapper]' })
export class HbDrawerWrapperDirective {
  private readonly service = inject(HbDrawerScaleService);
  private readonly el = inject(ElementRef).nativeElement as HTMLElement;

  constructor() {
    this.service.register(this.el);
    inject(DestroyRef).onDestroy(() => this.service.unregister(this.el));
  }
}
