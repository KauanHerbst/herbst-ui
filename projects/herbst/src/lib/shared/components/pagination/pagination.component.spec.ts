import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbPaginationImports } from './pagination.imports';

@Component({
  imports: [HbPaginationImports],
  template: `
    <hb-pagination
      [(hbPage)]="page"
      [hbTotal]="total()"
      [hbPageSize]="pageSize()"
      [hbSiblings]="1"
      [hbDisabled]="disabled()"
    />
  `,
})
class Host {
  readonly page = signal(1);
  readonly total = signal(240);
  readonly pageSize = signal(10);
  readonly disabled = signal(false);
}

describe('HbPaginationComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const numberButtons = () =>
      Array.from(el.querySelectorAll('button[aria-label^="Go to page"]')) as HTMLButtonElement[];
    return {
      fixture,
      el,
      root: el.querySelector('[data-slot="pagination"]') as HTMLElement,
      numberButtons,
      prev: () => el.querySelector('button[aria-label="Go to previous page"]') as HTMLButtonElement,
      next: () => el.querySelector('button[aria-label="Go to next page"]') as HTMLButtonElement,
      active: () => el.querySelector('button[aria-current="page"]') as HTMLButtonElement,
    };
  }

  it('derives the page count from total / pageSize and marks the current page', () => {
    const p = render();
    expect(p.root.getAttribute('role')).toBe('navigation');
    const labels = p.numberButtons().map((b) => b.textContent?.trim());
    expect(labels).toContain('1');
    expect(labels).toContain('24');
    expect(p.active().textContent?.trim()).toBe('1');
  });

  it('renders an ellipsis for large page counts', () => {
    const p = render();
    expect(p.el.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('disables previous on the first page and enables next', () => {
    const p = render();
    expect(p.prev().disabled).toBe(true);
    expect(p.next().disabled).toBe(false);
  });

  it('navigates on click and updates the two-way page', () => {
    const p = render();
    p.next().click();
    p.fixture.detectChanges();
    expect(p.fixture.componentInstance.page()).toBe(2);
    expect(p.active().textContent?.trim()).toBe('2');
  });

  it('disables the last page and next when navigated to the end', () => {
    const p = render();
    p.fixture.componentInstance.page.set(24);
    p.fixture.detectChanges();
    expect(p.next().disabled).toBe(true);
    expect(p.prev().disabled).toBe(false);
  });

  it('disables everything when hbDisabled is set', () => {
    const p = render();
    p.fixture.componentInstance.disabled.set(true);
    p.fixture.detectChanges();
    expect(p.prev().disabled).toBe(true);
    expect(p.next().disabled).toBe(true);
    expect(p.numberButtons().every((b) => b.disabled)).toBe(true);
  });
});
