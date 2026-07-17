import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbTabComponent } from './tab.component';
import { HbTabsImports } from './tabs.imports';
import type { HbTabsActivationMode, HbTabsPosition } from './tabs.variants';

@Component({
  imports: [HbTabsImports],
  template: `
    <hb-tabs
      [(hbValue)]="value"
      [hbDefaultValue]="'a'"
      [hbPosition]="position()"
      [hbActivationMode]="mode()"
      (hbChange)="changed.set($event)"
    >
      <hb-tab-list>
        <hb-tab hbValue="a">First</hb-tab>
        <hb-tab hbValue="b">Second</hb-tab>
        <hb-tab hbValue="c" hbDisabled>Third</hb-tab>
      </hb-tab-list>
      <hb-tab-panel hbValue="a">Panel A</hb-tab-panel>
      <hb-tab-panel hbValue="b">Panel B</hb-tab-panel>
      <hb-tab-panel hbValue="c" hbLazy>Panel C</hb-tab-panel>
    </hb-tabs>
  `,
})
class Host {
  readonly value = signal<unknown>(undefined);
  readonly position = signal<HbTabsPosition>('top');
  readonly mode = signal<HbTabsActivationMode>('automatic');
  readonly changed = signal<unknown>(null);
}

describe('HbTabsComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const tabs = () =>
      Array.from(fixture.nativeElement.querySelectorAll('[role="tab"]')) as HTMLElement[];
    const panels = () =>
      Array.from(fixture.nativeElement.querySelectorAll('[role="tabpanel"]')) as HTMLElement[];
    return { fixture, host: fixture.componentInstance, tabs, panels };
  }

  it('defaults to hbDefaultValue and shows the matching panel', () => {
    const { tabs, panels } = render();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    expect(panels()[0].hasAttribute('hidden')).toBe(false);
    expect(panels()[1].hasAttribute('hidden')).toBe(true);
  });

  it('switches the active tab and panel on click', () => {
    const { fixture, host, tabs, panels } = render();
    tabs()[1].click();
    fixture.detectChanges();
    expect(host.value()).toBe('b');
    expect(host.changed()).toBe('b');
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');
    expect(panels()[1].hasAttribute('hidden')).toBe(false);
    expect(panels()[0].hasAttribute('hidden')).toBe(true);
  });

  it('does not activate a disabled tab', () => {
    const { fixture, host, tabs } = render();
    tabs()[2].click();
    fixture.detectChanges();
    expect(host.value()).toBeUndefined();
    expect(tabs()[2].getAttribute('aria-disabled')).toBe('true');
  });

  it('links tab and panel via aria (labelledby / controls)', () => {
    const { tabs, panels } = render();
    expect(tabs()[0].getAttribute('aria-controls')).toBe(panels()[0].id);
    expect(panels()[0].getAttribute('aria-labelledby')).toBe(tabs()[0].id);
  });

  it('moves to the next enabled tab with ArrowRight and auto-activates', () => {
    const { fixture, host, tabs } = render();
    tabs()[0].focus();
    tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(host.value()).toBe('b');
    expect(document.activeElement).toBe(tabs()[1]);
  });

  it('manual activation only moves focus, not selection, until Enter', () => {
    const { fixture, host, tabs } = render();
    host.mode.set('manual');
    fixture.detectChanges();
    tabs()[0].focus();
    tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(host.value()).toBeUndefined();
    tabs()[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    fixture.detectChanges();
    expect(host.value()).toBe('b');
  });

  it('reflects orientation from position on the tab-list', () => {
    const { fixture, host } = render();
    host.position.set('left');
    fixture.detectChanges();
    const list = fixture.nativeElement.querySelector('[role="tablist"]') as HTMLElement;
    expect(list.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('lazily renders a panel only after it becomes active', () => {
    const { fixture, host } = render();
    expect(fixture.nativeElement.textContent).not.toContain('Panel C');
    host.value.set('c');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Panel C');
  });
});

describe('HbTabMenuComponent', () => {
  @Component({
    imports: [HbTabsImports],
    template: `
      <hb-tab-menu [(hbValue)]="value">
        <hb-tab hbValue="home">Home</hb-tab>
        <hb-tab hbValue="reports">Reports</hb-tab>
      </hb-tab-menu>
    `,
  })
  class MenuHost {
    readonly value = signal<unknown>('home');
  }

  it('renders a nav-only tablist with no panels', () => {
    const fixture = TestBed.createComponent(MenuHost);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="tablist"]')).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('[role="tab"]').length).toBe(2);
    expect(fixture.nativeElement.querySelector('[role="tabpanel"]')).toBeNull();
  });

  it('selects a menu item on click', () => {
    const fixture = TestBed.createComponent(MenuHost);
    fixture.detectChanges();
    const tabs = fixture.debugElement.queryAll(By.directive(HbTabComponent));
    (tabs[1].nativeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('reports');
  });
});
