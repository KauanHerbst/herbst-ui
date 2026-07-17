import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbDividerImports } from './divider.imports';

@Component({
  imports: [HbDividerImports],
  template: `
    <hb-divider [hbOrientation]="orientation()" [hbVariant]="variant()" />
    <hb-divider hbLabel="OR" />
  `,
})
class Host {
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  readonly variant = signal<'solid' | 'dashed' | 'dotted'>('solid');
}

describe('HbDividerComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const dividers = fixture.nativeElement.querySelectorAll('[data-slot="divider"]') as NodeListOf<HTMLElement>;
    return { fixture, plain: dividers[0], labeled: dividers[1] };
  }

  it('renders a horizontal separator with role + aria-orientation', () => {
    const { plain } = render();
    expect(plain.getAttribute('role')).toBe('separator');
    expect(plain.getAttribute('aria-orientation')).toBe('horizontal');
    expect(plain.className).toContain('border-t');
    expect(plain.className).toContain('w-full');
  });

  it('switches to a vertical rule', () => {
    const { fixture, plain } = render();
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(plain.getAttribute('aria-orientation')).toBe('vertical');
    expect(plain.className).toContain('border-l');
  });

  it('applies the line variant', () => {
    const { fixture, plain } = render();
    fixture.componentInstance.variant.set('dashed');
    fixture.detectChanges();
    expect(plain.className).toContain('border-dashed');
  });

  it('renders a labeled divider with lines around the text', () => {
    const { labeled } = render();
    expect(labeled.textContent?.trim()).toBe('OR');
    expect(labeled.className).toContain('flex');
    expect(labeled.className).toContain("before:content-['']");
  });
});
