import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbSidebarImports } from './sidebar.imports';
import type { HbSidebarCollapsible, HbSidebarVariant } from './sidebar.token';

@Component({
  imports: [HbSidebarImports],
  template: `
    <hb-sidebar-layout>
      <hb-sidebar
        hbId="main"
        [(hbOpen)]="open"
        [hbVariant]="variant()"
        [hbCollapsible]="collapsible()"
        (hbOnOpenChange)="lastEvent = $event.value"
      >
        <hb-sidebar-content>
          <hb-sidebar-menu>
            <hb-sidebar-menu-item [hbCollapsible]="true" [(hbOpen)]="itemOpen">
              <a hbSidebarMenuButton [hbActive]="true">Home</a>
              <hb-sidebar-menu-sub>
                <hb-sidebar-menu-sub-item>
                  <a hbSidebarMenuSubButton>Sub</a>
                </hb-sidebar-menu-sub-item>
              </hb-sidebar-menu-sub>
            </hb-sidebar-menu-item>
          </hb-sidebar-menu>
        </hb-sidebar-content>
      </hb-sidebar>
      <hb-sidebar-main>
        <button hbSidebarTrigger target="main">Toggle</button>
      </hb-sidebar-main>
    </hb-sidebar-layout>
  `,
})
class Host {
  readonly open = signal(true);
  readonly itemOpen = signal(false);
  readonly variant = signal<HbSidebarVariant>('sidebar');
  readonly collapsible = signal<HbSidebarCollapsible>('icon');
  lastEvent: boolean | null = null;
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, el };
}

describe('HbSidebar', () => {
  it('renders the container expanded by default', () => {
    const { el } = render();
    const container = el('[data-slot="sidebar-container"]');
    expect(container).toBeTruthy();
    expect(container.getAttribute('data-state')).toBe('expanded');
    expect(container.getAttribute('data-side')).toBe('left');
    expect(container.getAttribute('data-collapsible')).toBe('icon');
  });

  it('collapses to icon state and emits the change event via the trigger', () => {
    const { fixture, host, el } = render();
    el('[data-slot="sidebar-trigger"]').click();
    fixture.detectChanges();
    expect(host.open()).toBe(false);
    expect(host.lastEvent).toBe(false);
    expect(el('[data-slot="sidebar-container"]').getAttribute('data-state')).toBe('collapsed');
    expect(el('[data-slot="sidebar-container"]').getAttribute('data-collapsed')).toBe('true');
  });

  it('reflects variant on the container', () => {
    const { fixture, el } = render();
    fixture.componentInstance.variant.set('floating');
    fixture.detectChanges();
    expect(el('[data-slot="sidebar-container"]').getAttribute('data-variant')).toBe('floating');
  });

  it('does not collapse when collapsible is none', () => {
    const { fixture, host, el } = render();
    fixture.componentInstance.collapsible.set('none');
    fixture.detectChanges();
    el('[data-slot="sidebar-trigger"]').click();
    fixture.detectChanges();
    expect(host.open()).toBe(true);
    expect(el('[data-slot="sidebar-container"]').getAttribute('data-state')).toBe('expanded');
  });

  it('marks the active menu button and toggles the collapsible sub-menu', () => {
    const { fixture, host, el } = render();
    expect(el('[data-slot="sidebar-menu-button"]').getAttribute('data-active')).toBe('true');
    expect(el('[data-slot="sidebar-menu-sub"]').className).toContain('grid-rows-[0fr]');
    el('[data-slot="sidebar-menu-button"]').click();
    fixture.detectChanges();
    expect(host.itemOpen()).toBe(true);
    expect(el('[data-slot="sidebar-menu-sub"]').className).toContain('grid-rows-[1fr]');
  });
});
