import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbPanelImports } from './panel.imports';
import type { HbPanelToggler } from './panel.variants';

@Component({
  imports: [HbPanelImports],
  template: `
    <hb-panel
      [hbHeader]="header()"
      [hbToggleable]="toggleable()"
      [hbToggler]="toggler()"
      [(hbCollapsed)]="collapsed"
      (hbToggle)="lastToggle = $event"
    >
      <ng-template hbPanelIcons><button type="button" data-slot="my-action">A</button></ng-template>
      <p data-slot="body">Body content</p>
      <ng-template hbPanelFooter>Footer here</ng-template>
    </hb-panel>
  `,
})
class Host {
  readonly header = signal('Order Summary');
  readonly toggleable = signal(true);
  readonly toggler = signal<HbPanelToggler>('icon');
  readonly collapsed = signal(false);
  lastToggle: boolean | null = null;
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, el };
}

describe('HbPanelComponent', () => {
  it('renders header, content, footer and header actions', () => {
    const { el } = render();
    expect(el('[data-slot="panel-header"]').textContent).toContain('Order Summary');
    expect(el('[data-slot="body"]')).toBeTruthy();
    expect(el('[data-slot="panel-footer"]').textContent).toContain('Footer here');
    expect(el('[data-slot="my-action"]')).toBeTruthy();
  });

  it('toggles via the toggle button and emits hbToggle (controlled)', () => {
    const { fixture, host, el } = render();
    const region = el('[role="region"]');
    expect(region.getAttribute('data-state')).toBe('open');
    el('[data-slot="panel-toggle"]').click();
    fixture.detectChanges();
    expect(host.collapsed()).toBe(true);
    expect(host.lastToggle).toBe(true);
    expect(el('[role="region"]').getAttribute('data-state')).toBe('closed');
    expect(el('[data-slot="panel-toggle"]').getAttribute('aria-expanded')).toBe('false');
  });

  it('does not toggle by clicking the header when toggler="icon"', () => {
    const { fixture, host, el } = render();
    el('[data-slot="panel-header"]').click();
    fixture.detectChanges();
    expect(host.collapsed()).toBe(false);
  });

  it('toggles by clicking the whole header when toggler="header"', () => {
    const { fixture, host, el } = render();
    fixture.componentInstance.toggler.set('header');
    fixture.detectChanges();
    el('[data-slot="panel-header"]').click();
    fixture.detectChanges();
    expect(host.collapsed()).toBe(true);
  });

  it('renders no toggle button when not toggleable', () => {
    const { fixture, el } = render();
    fixture.componentInstance.toggleable.set(false);
    fixture.detectChanges();
    expect(el('[data-slot="panel-toggle"]')).toBeFalsy();
  });

  it('renders a custom indicator template', () => {
    @Component({
      imports: [HbPanelImports],
      template: `
        <hb-panel hbHeader="P" hbToggleable>
          <ng-template hbPanelIndicator let-collapsed>
            <span data-slot="ind">{{ collapsed ? '+' : '-' }}</span>
          </ng-template>
          body
        </hb-panel>
      `,
    })
    class IndHost {}
    TestBed.configureTestingModule({ imports: [IndHost] });
    const fixture = TestBed.createComponent(IndHost);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-slot="ind"]')).nativeElement.textContent.trim()).toBe('-');
  });
});
