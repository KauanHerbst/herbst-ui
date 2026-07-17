import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { HbMarkerImports } from './marker.imports';
import type { HbMarkerVariant } from './marker.variants';

@Component({
  imports: [HbMarkerImports],
  template: `
    <hb-marker [hbVariant]="variant()" [hbLoading]="loading()" [hbShimmer]="shimmer()">
      <hb-marker-icon><span class="test-icon">*</span></hb-marker-icon>
      <hb-marker-content>Deploying to production</hb-marker-content>
    </hb-marker>
    <button hb-marker type="button">Retry</button>
  `,
})
class Host {
  readonly variant = signal<HbMarkerVariant>('default');
  readonly loading = signal(false);
  readonly shimmer = signal(false);
}

describe('HbMarkerComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    const marker = root.querySelector('hb-marker') as HTMLElement;
    const content = marker.querySelector('[data-slot="marker-content"]') as HTMLElement;
    return { fixture, host: fixture.componentInstance, root, marker, content };
  }

  it('renders a default marker with the text and slot markers', () => {
    const { marker, content } = render();
    expect(marker.getAttribute('data-slot')).toBe('marker');
    expect(marker.getAttribute('data-variant')).toBe('default');
    expect(marker.className).toContain('text-muted-foreground');
    expect(content.textContent).toContain('Deploying to production');
    expect(marker.querySelector('[data-slot="marker-icon"]')?.getAttribute('aria-hidden')).toBe(
      'true',
    );
  });

  it('applies a bottom border for the border variant', () => {
    const { fixture, host, marker } = render();
    host.variant.set('border');
    fixture.detectChanges();
    expect(marker.getAttribute('data-variant')).toBe('border');
    expect(marker.className).toContain('border-b');
  });

  it('renders flanking divider lines for the separator variant', () => {
    const { fixture, host, marker } = render();
    host.variant.set('separator');
    fixture.detectChanges();
    const lines = marker.querySelectorAll('span.bg-border');
    expect(lines.length).toBe(2);
    expect(marker.className).toContain('w-full');
  });

  it('swaps the icon for a spinner and announces via role="status" while loading', () => {
    const { fixture, host, marker } = render();
    host.loading.set(true);
    fixture.detectChanges();
    expect(marker.querySelector('hb-spinner')).toBeTruthy();
    expect(marker.querySelector('[data-slot="marker-icon"]')).toBeNull();
    expect(marker.getAttribute('role')).toBe('status');
    expect(marker.getAttribute('aria-busy')).toBe('true');
  });

  it('adds the shimmer animation class to the content wrapper when hbShimmer is set', () => {
    const { fixture, host, marker } = render();
    expect(marker.querySelector('.hb-marker-shimmer')).toBeNull();
    host.shimmer.set(true);
    fixture.detectChanges();
    const shimmer = marker.querySelector('.hb-marker-shimmer') as HTMLElement;
    expect(shimmer).toBeTruthy();
    expect(shimmer.querySelector('[data-slot="marker-content"]')).toBeTruthy();
  });

  it('renders as a <button> when applied to a button element (interactive)', () => {
    const { root } = render();
    const btn = root.querySelector('button[hb-marker]') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.tagName).toBe('BUTTON');
    expect(btn.getAttribute('data-slot')).toBe('marker');
    expect(btn.className).toContain('cursor-pointer');
  });
});
