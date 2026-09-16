import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbButtonComponent } from './button.component';
import type { HbButtonType } from './button.variants';

@Component({
  imports: [HbButtonComponent],
  template: `
    <button hb-button [hbType]="type()" [hbLoading]="loading()" (click)="clicks = clicks + 1">Ok</button>
    <a hb-button href="#go" [hbDisabled]="linkDisabled()" (click)="linkClicks = linkClicks + 1">Go</a>
    <button hb-button id="svg-only"><svg viewBox="0 0 16 16"></svg></button>
  `,
})
class Host {
  readonly type = signal<HbButtonType>('default');
  readonly loading = signal(false);
  readonly linkDisabled = signal(false);
  clicks = 0;
  linkClicks = 0;
}

describe('HbButtonComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture;
  }

  it('applies the default variant', () => {
    const fixture = render();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('bg-primary');
  });

  it('switches to the destructive variant', () => {
    const fixture = render();
    fixture.componentInstance.type.set('destructive');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('bg-destructive');
  });

  it('shows the spinner when hbLoading is true', () => {
    const fixture = render();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ng-icon')).not.toBeNull();
  });

  it('is not disabled by default', () => {
    const fixture = render();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.hasAttribute('disabled')).toBe(false);
  });

  it('disables the native button and marks it busy while loading', () => {
    const fixture = render();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('makes a disabled anchor inert for keyboard, assistive tech and clicks', () => {
    const fixture = render();
    fixture.componentInstance.linkDisabled.set(true);
    fixture.detectChanges();
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.getAttribute('tabindex')).toBe('-1');
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(fixture.componentInstance.linkClicks).toBe(0);
  });

  it('treats a button with only an inline svg as icon-only', async () => {
    const fixture = render();
    await fixture.whenStable();
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('#svg-only') as HTMLElement;
    expect(btn.hasAttribute('data-icon-only')).toBe(true);
  });
});
