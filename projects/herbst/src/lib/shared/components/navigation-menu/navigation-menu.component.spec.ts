import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it, vi } from 'vitest';

import { HbNavigationMenuImports } from './navigation-menu.imports';

@Component({
  imports: [HbNavigationMenuImports],
  template: `
    <hb-navigation-menu [hbViewport]="viewport()">
      <hb-navigation-menu-list>
        <hb-navigation-menu-item hbValue="products">
          <hb-navigation-menu-trigger>Products</hb-navigation-menu-trigger>
          <hb-navigation-menu-content>
            <ul data-slot="panel-a"><li><a hbNavigationMenuLink href="/a">Analytics</a></li></ul>
          </hb-navigation-menu-content>
        </hb-navigation-menu-item>
        <hb-navigation-menu-item hbValue="docs">
          <a hbNavigationMenuLink href="/docs">Docs</a>
        </hb-navigation-menu-item>
        <hb-navigation-menu-indicator />
      </hb-navigation-menu-list>
    </hb-navigation-menu>
  `,
})
class Host {
  readonly viewport = signal(true);
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  const trigger = () =>
    fixture.debugElement.query(By.css('[data-slot="navigation-menu-trigger"] button'))
      .nativeElement as HTMLButtonElement;
  return { fixture, host: fixture.componentInstance, el, trigger };
}

describe('HbNavigationMenuComponent', () => {
  it('renders the frame parts with their data-slots', () => {
    const { el } = render();
    expect(el('[data-slot="navigation-menu"]')).toBeTruthy();
    expect(el('[data-slot="navigation-menu-list"]')).toBeTruthy();
    expect(el('[data-slot="navigation-menu-item"]')).toBeTruthy();
    expect(el('[data-slot="navigation-menu-trigger"]')).toBeTruthy();
    expect(el('[data-slot="navigation-menu-indicator"]')).toBeTruthy();
  });

  it('starts closed (trigger data-state=closed, no viewport content)', () => {
    const { trigger, el } = render();
    expect(trigger().getAttribute('data-state')).toBe('closed');
    expect(el('[data-slot="navigation-menu-viewport"]').getAttribute('data-state')).toBe('closed');
  });

  it('toggles the item open on click and shows the shared viewport', () => {
    const { fixture, trigger, el } = render();
    trigger().click();
    fixture.detectChanges();
    expect(trigger().getAttribute('data-state')).toBe('open');
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
    expect(el('[data-slot="navigation-menu-viewport"]').getAttribute('data-state')).toBe('open');
    expect(el('[data-slot="panel-a"]')).toBeTruthy();
    trigger().click();
    fixture.detectChanges();
    expect(trigger().getAttribute('data-state')).toBe('closed');
  });

  it('opens on hover after the delay', () => {
    vi.useFakeTimers();
    try {
      const { fixture, trigger } = render();
      trigger().dispatchEvent(new Event('pointerenter'));
      fixture.detectChanges();
      expect(trigger().getAttribute('data-state')).toBe('closed');
      vi.advanceTimersByTime(200);
      fixture.detectChanges();
      expect(trigger().getAttribute('data-state')).toBe('open');
    } finally {
      vi.useRealTimers();
    }
  });

  it('closes on Escape', () => {
    const { fixture, trigger } = render();
    trigger().click();
    fixture.detectChanges();
    trigger().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(trigger().getAttribute('data-state')).toBe('closed');
  });

  it('renders content inline (no shared viewport) when hbViewport is false', () => {
    const { fixture, trigger, el } = render();
    fixture.componentInstance.viewport.set(false);
    fixture.detectChanges();
    expect(el('[data-slot="navigation-menu-viewport"]')).toBeFalsy();
    trigger().click();
    fixture.detectChanges();
    expect(el('[data-slot="navigation-menu-content"] [data-slot="panel-a"]')).toBeTruthy();
  });

  it('styles projected links via the hbNavigationMenuLink directive', () => {
    const { el } = render();
    const docs = el('a[href="/docs"]');
    expect(docs.getAttribute('data-slot')).toBe('navigation-menu-link');
  });
});
