import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbOverlayBadgeComponent } from './overlay-badge.component';

@Component({
  imports: [HbOverlayBadgeComponent],
  template: `
    <hb-overlay-badge [hbValue]="value()">
      <span class="target">bell</span>
    </hb-overlay-badge>
  `,
})
class Host {
  readonly value = signal<string | number | null>(null);
}

describe('HbOverlayBadgeComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const badge = () => fixture.nativeElement.querySelector('[data-slot="badge"]') as HTMLElement;
    return { fixture, badge };
  }

  it('renders the wrapped target', () => {
    const { fixture } = render();
    expect(fixture.nativeElement.querySelector('.target')).not.toBeNull();
  });

  it('shows a dot when there is no value', () => {
    const { badge } = render();
    expect(badge().textContent?.trim()).toBe('');
    expect(badge().className).toContain('size-2.5');
  });

  it('shows the value when set', () => {
    const { fixture, badge } = render();
    fixture.componentInstance.value.set('5');
    fixture.detectChanges();
    expect(badge().textContent?.trim()).toBe('5');
    expect(badge().className).not.toContain('size-2.5');
  });

  it('positions top-right by default', () => {
    const { badge } = render();
    expect(badge().className).toContain('translate-x-1/2');
  });
});
