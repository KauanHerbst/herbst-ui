import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbLayoutImports } from './layout.imports';

@Component({
  imports: [HbLayoutImports],
  template: `
    <hb-layout>
      <hb-layout-sidebar
        hbCollapsible
        [hbWidth]="240"
        [hbCollapsedWidth]="72"
        [(hbCollapsed)]="collapsed"
        (hbOnCollapsedChange)="lastChange = $event"
      >
        <hb-layout-sidebar-group>
          <hb-layout-sidebar-group-label>Nav</hb-layout-sidebar-group-label>
          <a>Home</a>
        </hb-layout-sidebar-group>
      </hb-layout-sidebar>
      <hb-layout hbDirection="vertical">
        <hb-header [hbHeight]="56">Top</hb-header>
        <hb-content>Body</hb-content>
        <hb-footer>Bottom</hb-footer>
      </hb-layout>
    </hb-layout>
  `,
})
class Host {
  readonly collapsed = signal(false);
  lastChange: boolean | null = null;
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  const all = (sel: string) =>
    fixture.debugElement.queryAll(By.css(sel)).map((d) => d.nativeElement as HTMLElement);
  return { fixture, host: fixture.componentInstance, el, all };
}

describe('HbLayout', () => {
  it('auto-detects horizontal when it contains a sidebar, vertical otherwise', () => {
    const { all } = render();
    const layouts = all('[data-slot="layout"]');
    expect(layouts[0].getAttribute('data-direction')).toBe('horizontal');
    expect(layouts[0].className).toContain('flex-row');
    expect(layouts[1].getAttribute('data-direction')).toBe('vertical');
    expect(layouts[1].className).toContain('flex-col');
  });

  it('applies the header height in pixels', () => {
    const { el } = render();
    expect(el('[data-slot="header"]').style.height).toBe('56px');
  });

  it('renders sidebar body, group and label plus the collapse trigger', () => {
    const { el } = render();
    expect(el('[data-slot="layout-sidebar-body"]')).toBeTruthy();
    expect(el('[data-slot="layout-sidebar-group"]')).toBeTruthy();
    expect(el('[data-slot="layout-sidebar-group-label"]').textContent).toContain('Nav');
    expect(el('[data-slot="layout-sidebar-trigger"]')).toBeTruthy();
  });

  it('starts at the expanded width', () => {
    const { el } = render();
    expect(el('[data-slot="layout-sidebar"]').style.width).toBe('240px');
  });

  it('collapses via the trigger, updates width and emits the change', () => {
    const { fixture, host, el } = render();
    el('[data-slot="layout-sidebar-trigger"]').click();
    fixture.detectChanges();
    expect(host.collapsed()).toBe(true);
    expect(host.lastChange).toBe(true);
    expect(el('[data-slot="layout-sidebar"]').getAttribute('data-collapsed')).toBe('true');
    expect(el('[data-slot="layout-sidebar"]').style.width).toBe('72px');
  });
});
