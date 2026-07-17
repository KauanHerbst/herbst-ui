import { Component, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbScrollAreaComponent } from './scroll-area.component';
import { HbScrollAreaImports } from './scroll-area.imports';
import type { HbScrollAreaOrientation, HbScrollAreaType } from './scroll-area.variants';

@Component({
  imports: [HbScrollAreaImports],
  template: `
    <hb-scroll-area
      [hbOrientation]="orientation()"
      [hbType]="type()"
      [hbFade]="fade()"
      [hbVariant]="variant()"
      [hbSize]="size()"
      class="h-40 w-60"
    >
      <div style="height: 800px; width: 800px">content</div>
    </hb-scroll-area>
  `,
})
class Host {
  readonly area = viewChild.required(HbScrollAreaComponent);
  readonly orientation = signal<HbScrollAreaOrientation>('vertical');
  readonly type = signal<HbScrollAreaType>('hover');
  readonly fade = signal(false);
  readonly variant = signal<'default' | 'subtle' | 'solid'>('default');
  readonly size = signal<'sm' | 'md' | 'lg'>('md');
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const all = (sel: string) => fixture.debugElement.queryAll(By.css(sel)).map((d) => d.nativeElement as HTMLElement);
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, el, all };
}

describe('HbScrollAreaComponent', () => {
  it('renders root, viewport and projected content', () => {
    const { el } = render();
    expect(el('[data-slot="scroll-area"]')).toBeTruthy();
    expect(el('[data-slot="scroll-area-viewport"]')).toBeTruthy();
    expect(el('[data-slot="scroll-area-content"]').textContent).toContain('content');
  });

  it('shows only the vertical scrollbar by default', () => {
    const { all } = render();
    const bars = all('[data-slot="scroll-area-scrollbar"]');
    expect(bars.length).toBe(1);
    expect(bars[0].getAttribute('data-orientation')).toBe('vertical');
  });

  it('shows only the horizontal scrollbar when orientation="horizontal"', () => {
    const { fixture, all } = render();
    fixture.componentInstance.orientation.set('horizontal');
    fixture.detectChanges();
    const bars = all('[data-slot="scroll-area-scrollbar"]');
    expect(bars.length).toBe(1);
    expect(bars[0].getAttribute('data-orientation')).toBe('horizontal');
  });

  it('shows both scrollbars when orientation="both"', () => {
    const { fixture, all } = render();
    fixture.componentInstance.orientation.set('both');
    fixture.detectChanges();
    const bars = all('[data-slot="scroll-area-scrollbar"]');
    expect(bars.length).toBe(2);
    expect(bars.map((b) => b.getAttribute('data-orientation')).sort()).toEqual(['horizontal', 'vertical']);
  });

  it('reflects orientation on the host', () => {
    const { fixture, el } = render();
    expect(el('[data-slot="scroll-area"]').getAttribute('data-orientation')).toBe('vertical');
    fixture.componentInstance.orientation.set('both');
    fixture.detectChanges();
    expect(el('[data-slot="scroll-area"]').getAttribute('data-orientation')).toBe('both');
  });

  it('keeps the scrollbar visible when hbType="always"', () => {
    const { fixture, el } = render();
    fixture.componentInstance.type.set('always');
    fixture.detectChanges();
    expect(el('[data-slot="scroll-area-scrollbar"]').getAttribute('data-state')).toBe('visible');
  });

  it('applies a mask-image on the viewport only when hbFade is set', () => {
    const { fixture, el } = render();
    expect(el('[data-slot="scroll-area-viewport"]').style.getPropertyValue('mask-image')).toBe('');
    fixture.componentInstance.fade.set(true);
    fixture.detectChanges();
    expect(el('[data-slot="scroll-area-viewport"]').style.getPropertyValue('mask-image')).toContain('linear-gradient');
  });

  it('applies the size variant to the scrollbar thickness', () => {
    const { fixture, el } = render();
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(el('[data-slot="scroll-area-scrollbar"]').className).toContain('w-3.5');
  });

  it('applies the visual variant to the thumb', () => {
    const { fixture, el } = render();
    fixture.componentInstance.variant.set('solid');
    fixture.detectChanges();
    expect(el('[data-slot="scroll-area-thumb"]').className).toContain('bg-muted-foreground/60');
  });

  it('exposes the public scroll API via exportAs', () => {
    const { host } = render();
    const area = host.area();
    expect(typeof area.scrollToTop).toBe('function');
    expect(typeof area.scrollToBottom).toBe('function');
    expect(typeof area.scrollTo).toBe('function');
    expect(typeof area.atBottom).toBe('function');
  });
});
