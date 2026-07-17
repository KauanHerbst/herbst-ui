import { ApplicationRef, Component, signal } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HbTooltipImports } from './tooltip.imports';
import type { HbTooltipSide, HbTooltipTrigger } from './tooltip.variants';

@Component({
  imports: [HbTooltipImports],
  template: `
    <button
      type="button"
      [hbTooltip]="text()"
      [hbTooltipTrigger]="trigger()"
      [hbTooltipPosition]="position()"
      [hbTooltipShortcut]="shortcut()"
      [hbTooltipDisabled]="disabled()"
      [hbTooltipDelay]="0"
    >
      Trigger
    </button>
  `,
})
class Host {
  readonly text = signal('Copy to clipboard');
  readonly trigger = signal<HbTooltipTrigger>('hover');
  readonly position = signal<HbTooltipSide>('top');
  readonly shortcut = signal<string | string[]>([]);
  readonly disabled = signal(false);
}

describe('HbTooltipDirective', () => {
  let overlay: HTMLElement;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
    appRef = TestBed.inject(ApplicationRef);
  });
  afterEach(() => vi.useRealTimers());

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    return { fixture, host: fixture.componentInstance, btn };
  }
  const tick = () => appRef.tick();
  const content = () =>
    overlay.querySelector('[data-slot="tooltip-content"]') as HTMLElement | null;

  it('opens on hover (after the delay) and closes on leave', () => {
    vi.useFakeTimers();
    const { btn } = render();
    btn.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(10);
    tick();
    expect(content()?.textContent).toContain('Copy to clipboard');
    expect(btn.getAttribute('aria-describedby')).toBe(content()!.id);
    btn.dispatchEvent(new MouseEvent('mouseleave'));
    vi.advanceTimersByTime(10);
    tick();
    expect(content()).toBeNull();
  });

  it('opens on focus (a11y) in hover mode', () => {
    const { btn } = render();
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    tick();
    expect(content()).toBeTruthy();
  });

  it('toggles on click in click mode and does not open on hover', () => {
    vi.useFakeTimers();
    const { fixture, host, btn } = render();
    host.trigger.set('click');
    fixture.detectChanges();
    btn.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(50);
    tick();
    expect(content()).toBeNull();
    btn.click();
    tick();
    expect(content()).toBeTruthy();
    btn.click();
    tick();
    expect(content()).toBeNull();
  });

  it('does not open when disabled', () => {
    const { fixture, host, btn } = render();
    host.disabled.set(true);
    fixture.detectChanges();
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    tick();
    expect(content()).toBeNull();
  });

  it('reflects the position on data-side', () => {
    const { fixture, host, btn } = render();
    host.position.set('right');
    fixture.detectChanges();
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    tick();
    expect(content()?.getAttribute('data-side')).toBe('right');
  });

  it('renders shortcut keys as kbd chips', () => {
    const { fixture, host, btn } = render();
    host.shortcut.set(['⌘', 'K']);
    fixture.detectChanges();
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    tick();
    expect(content()!.textContent).toContain('⌘');
    expect(content()!.textContent).toContain('K');
  });

  it('does not open with empty content', () => {
    const { fixture, host, btn } = render();
    host.text.set('');
    fixture.detectChanges();
    btn.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    tick();
    expect(content()).toBeNull();
  });
});

describe('HbTooltipDirective (controlled)', () => {
  @Component({
    imports: [HbTooltipImports],
    template: `
      <button type="button" hbTooltip="Manual" hbTooltipTrigger="manual" [hbTooltipOpen]="open()">
        Trigger
      </button>
    `,
  })
  class ManualHost {
    readonly open = signal(false);
  }

  it('opens/closes via [(hbTooltipOpen)]', () => {
    const overlay = TestBed.inject(OverlayContainer).getContainerElement();
    const appRef = TestBed.inject(ApplicationRef);
    const fixture = TestBed.createComponent(ManualHost);
    fixture.detectChanges();
    appRef.tick();
    expect(overlay.querySelector('[data-slot="tooltip-content"]')).toBeNull();
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
    appRef.tick();
    expect(overlay.querySelector('[data-slot="tooltip-content"]')).toBeTruthy();
  });
});
