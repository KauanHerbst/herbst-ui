import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';

import { HbTypographyImports } from './typography.imports';
import type {
  HbTypographyAlign,
  HbTypographyColor,
  HbTypographyVariant,
  HbTypographyWeight,
} from './typography.variants';

@Component({
  imports: [HbTypographyImports],
  template: `
    <h1
      [hbTypography]="variant()"
      [hbColor]="color()"
      [hbAlign]="align()"
      [hbWeight]="weight()"
      [hbTruncate]="truncate()"
      class="custom"
    >
      Heading
    </h1>
  `,
})
class Host {
  readonly variant = signal<HbTypographyVariant>('h1');
  readonly color = signal<HbTypographyColor | undefined>(undefined);
  readonly align = signal<HbTypographyAlign | undefined>(undefined);
  readonly weight = signal<HbTypographyWeight | undefined>(undefined);
  readonly truncate = signal(false);
}

describe('HbTypographyDirective', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('h1') as HTMLElement;
    return { fixture, host: fixture.componentInstance, el };
  }

  it('applies the variant classes (h1) and keeps the static class', () => {
    const { el } = render();
    expect(el.className).toContain('text-4xl');
    expect(el.className).toContain('font-semibold');
    expect(el.className).toContain('custom');
    expect(el.getAttribute('data-slot')).toBe('typography');
  });

  it('switches variant classes when the variant changes', () => {
    const { fixture, host, el } = render();
    host.variant.set('muted');
    fixture.detectChanges();
    expect(el.className).toContain('text-muted-foreground');
    expect(el.className).not.toContain('text-4xl');
  });

  it('layers color / align / weight / truncate modifiers', () => {
    const { fixture, host, el } = render();
    host.color.set('destructive');
    host.align.set('center');
    host.weight.set('bold');
    host.truncate.set(true);
    fixture.detectChanges();
    expect(el.className).toContain('text-destructive');
    expect(el.className).toContain('text-center');
    expect(el.className).toContain('font-bold');
    expect(el.className).toContain('truncate');
  });

  it('renders inline-code styling', () => {
    const { fixture, host, el } = render();
    host.variant.set('inline-code');
    fixture.detectChanges();
    expect(el.className).toContain('font-mono');
    expect(el.className).toContain('bg-muted');
  });
});
