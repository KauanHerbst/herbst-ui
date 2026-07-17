import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbSkeletonComponent } from './skeleton.component';
import { HbSkeletonImports } from './skeleton.imports';
import type { HbSkeletonAnimation, HbSkeletonShape, HbSkeletonSize } from './skeleton.variants';

@Component({
  imports: [HbSkeletonImports],
  template: `
    <hb-skeleton
      [hbShape]="shape()"
      [hbSize]="size()"
      [hbWidth]="width()"
      [hbAnimation]="animation()"
    />
    <hb-skeleton-text [hbLines]="lines()" />
    <hb-skeleton-table [hbRows]="3" [hbColumns]="4" [hbHeader]="true" />
    <hb-skeleton-form [hbFields]="2" />
    <hb-skeleton-avatar [hbText]="true" />
    <hb-skeleton-button />
    <hb-skeleton-input />
    <hb-skeleton-list [hbItems]="4" />
    <hb-skeleton-card [hbFooter]="true" />
  `,
})
class Host {
  readonly shape = signal<HbSkeletonShape>('circle');
  readonly size = signal<HbSkeletonSize>('md');
  readonly width = signal('');
  readonly animation = signal<HbSkeletonAnimation>('pulse');
  readonly lines = signal(3);
}

describe('HbSkeletonComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture;
  }
  const primitive = (fixture: ReturnType<typeof render>) =>
    fixture.debugElement.query(By.directive(HbSkeletonComponent)).nativeElement as HTMLElement;

  it('renders the primitive with pulse animation and the size-derived box class', () => {
    const fixture = render();
    const el = primitive(fixture);
    expect(el.className).toContain('animate-pulse');
    expect(el.className).toContain('rounded-full');
    expect(el.className).toContain('size-10');
    expect(el.getAttribute('aria-hidden')).toBe('true');
    expect(el.getAttribute('data-slot')).toBe('skeleton');
  });

  it('drops the size class and applies an inline width when hbWidth is set', () => {
    const fixture = render();
    fixture.componentInstance.shape.set('rectangle');
    fixture.componentInstance.width.set('12rem');
    fixture.detectChanges();
    const el = primitive(fixture);
    expect(el.style.width).toBe('12rem');
  });

  it('switches to the wave animation classes', () => {
    const fixture = render();
    fixture.componentInstance.animation.set('wave');
    fixture.detectChanges();
    const el = primitive(fixture);
    expect(el.className).toContain('hb-skeleton-wave');
    expect(el.className).toContain('overflow-hidden');
    expect(el.className).not.toContain('animate-pulse');
  });

  it('renders one skeleton line per hbLines in the text preset', () => {
    const fixture = render();
    fixture.componentInstance.lines.set(5);
    fixture.detectChanges();
    const text = fixture.nativeElement.querySelector('[data-slot="skeleton-text"]') as HTMLElement;
    expect(text.querySelectorAll('[data-slot="skeleton"]').length).toBe(5);
  });

  it('renders header + rows*columns blocks in the table preset', () => {
    const fixture = render();
    const table = fixture.nativeElement.querySelector(
      '[data-slot="skeleton-table"]',
    ) as HTMLElement;
    expect(table.querySelectorAll('[data-slot="skeleton"]').length).toBe(16);
  });

  it('mounts every preset without error', () => {
    const fixture = render();
    for (const slot of [
      'skeleton-text',
      'skeleton-table',
      'skeleton-form',
      'skeleton-avatar',
      'skeleton-button',
      'skeleton-input',
      'skeleton-list',
      'skeleton-card',
    ]) {
      expect(fixture.nativeElement.querySelector(`[data-slot="${slot}"]`)).toBeTruthy();
    }
  });
});
