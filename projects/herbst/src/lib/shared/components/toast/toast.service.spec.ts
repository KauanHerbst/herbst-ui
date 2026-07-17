import { ApplicationRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HbToastService } from './toast.service';

describe('HbToastService', () => {
  let service: HbToastService;
  let overlay: HTMLElement;
  let appRef: ApplicationRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HbToastService);
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
    appRef = TestBed.inject(ApplicationRef);
  });
  afterEach(() => {
    service.clear();
    vi.useRealTimers();
  });

  const tick = () => appRef.tick();
  const toasts = () => Array.from(overlay.querySelectorAll('[data-slot="toast"]'));

  it('shows a success toast with the title and type styling', () => {
    service.success('Saved!', { description: 'Your changes are live.' });
    tick();
    expect(overlay.textContent).toContain('Saved!');
    expect(overlay.textContent).toContain('Your changes are live.');
    const card = overlay.querySelector('[data-slot="toast"] > div') as HTMLElement;
    expect(card.className).toContain('border-success/40');
  });

  it('auto-dismisses after the duration', () => {
    vi.useFakeTimers();
    service.default('Bye', { duration: 3000 });
    tick();
    expect(toasts().length).toBe(1);
    vi.advanceTimersByTime(3100);
    tick();
    expect(toasts().length).toBe(0);
  });

  it('keeps a loading toast until updated, then it can auto-dismiss', () => {
    vi.useFakeTimers();
    const ref = service.loading('Uploading…');
    tick();
    vi.advanceTimersByTime(10000);
    tick();
    expect(toasts().length).toBe(1);
    ref.update({ type: 'success', title: 'Done', duration: 2000 });
    tick();
    expect(overlay.textContent).toContain('Done');
    vi.advanceTimersByTime(2100);
    tick();
    expect(toasts().length).toBe(0);
  });

  it('runs an action callback and dismisses by default', () => {
    const onClick = vi.fn();
    service.default('Undo?', { actions: [{ label: 'Undo', onClick }] });
    tick();
    const btn = overlay.querySelector('[data-slot="toast"] button[hb-button]') as HTMLButtonElement;
    btn.click();
    tick();
    expect(onClick).toHaveBeenCalledOnce();
    expect(toasts().length).toBe(0);
  });

  it('closes on the X button', () => {
    service.default('Closable', { closable: true });
    tick();
    const close = overlay.querySelector(
      '[data-slot="toast"] button[aria-label="Close"]',
    ) as HTMLButtonElement;
    close.click();
    tick();
    expect(toasts().length).toBe(0);
  });

  it('routes toasts to separate overlays per position', () => {
    service.success('top', { position: 'top-left' });
    service.warning('bottom', { position: 'bottom-right' });
    tick();
    expect(overlay.querySelectorAll('[data-slot="toast-container"]').length).toBe(2);
    expect(toasts().length).toBe(2);
  });

  it('clear() removes all toasts', () => {
    service.success('a');
    service.info('b');
    service.warning('c');
    tick();
    expect(toasts().length).toBe(3);
    service.clear();
    tick();
    expect(toasts().length).toBe(0);
  });

  it('promise() shows loading then resolves to success', async () => {
    let resolveFn!: (v: string) => void;
    const p = new Promise<string>((res) => (resolveFn = res));
    service.promise(p, { loading: 'Working…', success: (v) => `Got ${v}`, error: 'Failed' });
    tick();
    expect(overlay.textContent).toContain('Working…');
    resolveFn('data');
    await p;
    tick();
    expect(overlay.textContent).toContain('Got data');
  });
});
