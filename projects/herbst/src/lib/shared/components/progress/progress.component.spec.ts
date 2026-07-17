import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbProgressImports } from './progress.imports';
import type { HbProgressFormat, HbProgressValuePosition } from './progress.variants';

@Component({
  imports: [HbProgressImports],
  template: `
    <hb-progress
      [hbValue]="value()"
      [hbMax]="max()"
      [hbShowValue]="true"
      [hbFormat]="format()"
      [hbValuePosition]="position()"
      [hbIndeterminate]="indeterminate()"
      hbLabel="Uploading"
    />
  `,
})
class Host {
  readonly value = signal(30);
  readonly max = signal(100);
  readonly format = signal<HbProgressFormat>('percent');
  readonly position = signal<HbProgressValuePosition>('outside');
  readonly indeterminate = signal(false);
}

describe('HbProgressComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      el,
      track: el.querySelector('[role="progressbar"]') as HTMLElement,
      bar: el.querySelector('[role="progressbar"] > div') as HTMLElement,
    };
  }

  it('exposes progressbar a11y state and fills to the percentage', () => {
    const { track, bar } = render();
    expect(track.getAttribute('aria-valuenow')).toBe('30');
    expect(track.getAttribute('aria-valuemax')).toBe('100');
    expect(bar.style.width).toBe('30%');
  });

  it('updates dynamically when the value changes', () => {
    const { fixture, track, bar } = render();
    fixture.componentInstance.value.set(75);
    fixture.detectChanges();
    expect(bar.style.width).toBe('75%');
    expect(track.getAttribute('aria-valuenow')).toBe('75');
  });

  it('renders the label and percent value outside by default', () => {
    const { el } = render();
    expect(el.textContent).toContain('Uploading');
    expect(el.textContent).toContain('30%');
  });

  it('formats the value as a fraction', () => {
    const { fixture, el } = render();
    fixture.componentInstance.format.set('fraction');
    fixture.componentInstance.value.set(7);
    fixture.componentInstance.max.set(10);
    fixture.detectChanges();
    expect(el.textContent).toContain('7/10');
  });

  it('clamps the value between 0 and max', () => {
    const { fixture, bar } = render();
    fixture.componentInstance.value.set(150);
    fixture.detectChanges();
    expect(bar.style.width).toBe('100%');
  });

  it('drops aria-valuenow and animates when indeterminate', () => {
    const { fixture, track } = render();
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();
    expect(track.getAttribute('aria-valuenow')).toBeNull();
    const animBar = track.querySelector('div') as HTMLElement;
    expect(animBar.className).toContain('animate-[hb-progress-indeterminate');
  });
});
