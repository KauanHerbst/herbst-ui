import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbInplaceImports } from './inplace.imports';

@Component({
  imports: [HbInplaceImports],
  template: `
    <hb-inplace
      [(hbActive)]="active"
      [hbDisabled]="disabled()"
      [hbPreventClick]="preventClick()"
      (hbActivate)="activated = true"
      (hbDeactivate)="deactivated = true"
    >
      <ng-template hbInplaceDisplay><span data-slot="d">Click to edit</span></ng-template>
      <ng-template hbInplaceContent>
        <input data-slot="c" />
        <button hbInplaceCloser data-slot="close">Close</button>
      </ng-template>
    </hb-inplace>
  `,
})
class Host {
  readonly active = signal(false);
  readonly disabled = signal(false);
  readonly preventClick = signal(false);
  activated = false;
  deactivated = false;
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, el };
}

describe('HbInplaceComponent', () => {
  it('shows the display and hides the content while inactive', () => {
    const { el } = render();
    expect(el('[data-slot="inplace-display"]')).toBeTruthy();
    expect(el('[data-slot="d"]').textContent).toContain('Click to edit');
    expect(el('[data-slot="inplace-content"]')).toBeFalsy();
  });

  it('activates on display click and emits hbActivate (two-way)', () => {
    const { fixture, host, el } = render();
    el('[data-slot="inplace-display"]').click();
    fixture.detectChanges();
    expect(host.active()).toBe(true);
    expect(host.activated).toBe(true);
    expect(el('[data-slot="c"]')).toBeTruthy();
    expect(el('[data-slot="inplace-display"]')).toBeFalsy();
  });

  it('deactivates through the hbInplaceCloser directive', () => {
    const { fixture, host, el } = render();
    host.active.set(true);
    fixture.detectChanges();
    el('[data-slot="inplace-closer"]').click();
    fixture.detectChanges();
    expect(host.active()).toBe(false);
    expect(host.deactivated).toBe(true);
    expect(el('[data-slot="inplace-display"]')).toBeTruthy();
  });

  it('does not activate when preventClick is set', () => {
    const { fixture, host, el } = render();
    fixture.componentInstance.preventClick.set(true);
    fixture.detectChanges();
    const display = el('[data-slot="inplace-display"]');
    expect(display.getAttribute('data-static')).toBe('true');
    expect(display.getAttribute('role')).toBeNull();
    display.click();
    fixture.detectChanges();
    expect(host.active()).toBe(false);
  });

  it('does not activate when disabled', () => {
    const { fixture, host, el } = render();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(el('[data-slot="inplace-display"]').getAttribute('data-disabled')).toBe('true');
    el('[data-slot="inplace-display"]').click();
    fixture.detectChanges();
    expect(host.active()).toBe(false);
  });
});
