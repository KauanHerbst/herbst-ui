import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbBlockUiComponent } from './block-ui.component';

@Component({
  imports: [HbBlockUiComponent],
  template: `
    <hb-block-ui [hbBlocked]="blocked()" [hbFullScreen]="full()" [hbSpinner]="spinner()">
      <button class="target">Action</button>
    </hb-block-ui>
  `,
})
class Host {
  readonly blocked = signal(false);
  readonly full = signal(false);
  readonly spinner = signal(false);
}

describe('HbBlockUiComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = () => fixture.nativeElement.querySelector('hb-block-ui') as HTMLElement;
    const overlay = () =>
      el().querySelector('[data-slot="block-ui-overlay"]') as HTMLElement | null;
    return { fixture, el, overlay };
  }

  it('renders the wrapped content', () => {
    const { el } = render();
    expect(el().querySelector('.target')).not.toBeNull();
  });

  it('shows no overlay by default', () => {
    const { overlay } = render();
    expect(overlay()).toBeNull();
  });

  it('shows the overlay and marks content busy when blocked', () => {
    const { fixture, el, overlay } = render();
    fixture.componentInstance.blocked.set(true);
    fixture.detectChanges();
    expect(overlay()).not.toBeNull();
    expect(el().querySelector('[aria-busy="true"]')).not.toBeNull();
  });

  it('is opaque only by default (no indicator) and shows the spinner when enabled', () => {
    const { fixture, overlay } = render();
    fixture.componentInstance.blocked.set(true);
    fixture.detectChanges();
    expect(overlay()?.querySelector('ng-icon')).toBeNull();
    fixture.componentInstance.spinner.set(true);
    fixture.detectChanges();
    expect(overlay()?.querySelector('ng-icon')).not.toBeNull();
  });

  it('uses a fixed overlay in full-screen mode', () => {
    const { fixture, overlay } = render();
    fixture.componentInstance.blocked.set(true);
    fixture.componentInstance.full.set(true);
    fixture.detectChanges();
    expect(overlay()?.className).toContain('fixed');
  });
});
