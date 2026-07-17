import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbDrawerComponent } from './drawer.component';
import { HbDrawerImports } from './drawer.imports';
import type { HbDrawerSide } from './drawer.variants';

@Component({
  imports: [HbDrawerImports],
  template: `
    <hb-drawer
      [hbSide]="side()"
      [hbSnapPoints]="snaps()"
      hbTitle="Filters"
      hbDescription="Refine the results."
      hbOkText="Apply"
      [hbClosable]="closable()"
      (hbOk)="okCount.set(okCount() + 1)"
    >
      <button hbDrawerTrigger type="button">Open</button>
      <div hbDrawerContent>Drawer body content</div>
    </hb-drawer>
  `,
})
class Host {
  readonly side = signal<HbDrawerSide>('bottom');
  readonly snaps = signal<number[]>([]);
  readonly closable = signal(true);
  readonly okCount = signal(0);
}

describe('HbDrawerComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const drawer = fixture.debugElement.query(By.directive(HbDrawerComponent))
      .componentInstance as HbDrawerComponent;
    const trigger = fixture.nativeElement.querySelector(
      'button[hbDrawerTrigger]',
    ) as HTMLButtonElement;
    return { fixture, drawer, trigger };
  }
  const panel = () => overlay.querySelector('[data-drawer-panel]') as HTMLElement;

  it('is closed initially and opens from the trigger', () => {
    const { fixture, trigger } = render();
    expect(overlay.textContent).not.toContain('Filters');
    trigger.click();
    fixture.detectChanges();
    expect(overlay.textContent).toContain('Filters');
    expect(overlay.textContent).toContain('Refine the results.');
    expect(overlay.textContent).toContain('Drawer body content');
  });

  it('defaults to a bottom drawer with a top border, rounded top and a grab handle', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    const p = panel();
    expect(p.className).toContain('rounded-t-xl');
    expect(p.className).toContain('border-t');
    expect(overlay.querySelector('[data-drawer-handle]')).toBeTruthy();
  });

  it('reflects a left side on desktop (border-r, rounded-r, no handle)', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.side.set('left');
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    const p = panel();
    expect(p.className).toContain('rounded-r-xl');
    expect(p.className).toContain('border-r');
    expect(overlay.querySelector('[data-drawer-handle]')).toBeNull();
  });

  it('collapses a left drawer to a bottom sheet below the breakpoint', () => {
    const original = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 480 });
    try {
      const { fixture, trigger } = render();
      fixture.componentInstance.side.set('left');
      fixture.detectChanges();
      trigger.click();
      fixture.detectChanges();
      expect(panel().className).toContain('rounded-t-xl');
    } finally {
      Object.defineProperty(window, 'innerWidth', { configurable: true, value: original });
    }
  });

  it('shows a Close button when closable', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    expect(overlay.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });

  it('hides the Close button when not closable', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.closable.set(false);
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    expect(overlay.querySelector('button[aria-label="Close"]')).toBeNull();
  });

  it('emits (hbOk) and closes when the primary button is clicked', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    const ok = Array.from(overlay.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Apply',
    ) as HTMLButtonElement;
    ok.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.okCount()).toBe(1);
    expect(overlay.textContent).not.toContain('Filters');
  });

  it('opens with snap points enabled and still renders a handle', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.snaps.set([0.4, 0.75, 1]);
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    expect(overlay.querySelector('[data-drawer-panel]')).toBeTruthy();
    expect(overlay.querySelector('[data-drawer-handle]')).toBeTruthy();
  });
});
