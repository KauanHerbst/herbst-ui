import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbBreadcrumbImports } from './breadcrumb.imports';

@Component({
  imports: [HbBreadcrumbImports],
  template: `
    <hb-breadcrumb [hbSeparator]="sep()" [hbMaxItems]="max()">
      <hb-breadcrumb-item hbHref="#">Home</hb-breadcrumb-item>
      <hb-breadcrumb-item hbHref="#">Docs</hb-breadcrumb-item>
      <hb-breadcrumb-item hbHref="#">Components</hb-breadcrumb-item>
      <hb-breadcrumb-item hbCurrent>Breadcrumb</hb-breadcrumb-item>
    </hb-breadcrumb>
  `,
})
class Host {
  readonly sep = signal('');
  readonly max = signal<number | null>(null);
}

describe('HbBreadcrumb', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const nav = () => fixture.nativeElement.querySelector('hb-breadcrumb') as HTMLElement;
    const separators = () => nav().querySelectorAll('[role="presentation"][aria-hidden="true"]');
    return { fixture, nav, separators };
  }

  it('inserts a separator between items but not after the last', () => {
    const { separators } = render();
    expect(separators().length).toBe(3);
  });

  it('marks the current item with aria-current', () => {
    const { nav } = render();
    expect(nav().querySelector('[aria-current="page"]')?.textContent).toContain('Breadcrumb');
  });

  it('uses a custom string separator', () => {
    const { fixture, separators } = render();
    fixture.componentInstance.sep.set('/');
    fixture.detectChanges();
    expect(separators()[0].textContent?.trim()).toBe('/');
  });

  it('auto-collapses middle items with hbMaxItems', () => {
    const { fixture, nav } = render();
    fixture.componentInstance.max.set(3);
    fixture.detectChanges();
    const text = nav().textContent ?? '';
    expect(text).toContain('Home');
    expect(text).toContain('Components');
    expect(text).toContain('Breadcrumb');
    expect(text).not.toContain('Docs');
  });
});
