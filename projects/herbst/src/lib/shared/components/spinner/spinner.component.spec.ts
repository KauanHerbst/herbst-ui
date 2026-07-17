import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideIcons } from '@ng-icons/core';
import { phosphorCircleNotch } from '@ng-icons/phosphor-icons/regular';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbSpinnerImports } from './spinner.imports';
import type { HbSpinnerSize, HbSpinnerVariant } from './spinner.variants';

@Component({
  imports: [HbSpinnerImports],
  providers: [provideIcons({ phosphorCircleNotch })],
  template: `
    <hb-spinner [hbSize]="size()" [hbVariant]="variant()" [hbSpin]="spin()" [hbIcon]="icon()" />
    <hb-spinner hbVariant="bars" />
  `,
})
class Host {
  readonly size = signal<HbSpinnerSize>('md');
  readonly variant = signal<HbSpinnerVariant>('icon');
  readonly spin = signal(true);
  readonly icon = signal('phosphorSpinnerGap');
}

describe('HbSpinnerComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const spinners = fixture.nativeElement.querySelectorAll(
      '[data-slot="spinner"]',
    ) as NodeListOf<HTMLElement>;
    return { fixture, configurable: spinners[0], bars: spinners[1] };
  }

  it('renders an accessible animated icon by default', () => {
    const { configurable } = render();
    expect(configurable.getAttribute('role')).toBe('status');
    expect(configurable.getAttribute('aria-label')).toBe('Loading');
    const icon = configurable.querySelector('ng-icon') as HTMLElement;
    expect(icon).toBeTruthy();
    expect(icon.className).toContain('animate-spin');
    expect(configurable.className).toContain('size-5');
  });

  it('stops the animation when hbSpin is false', () => {
    const { fixture, configurable } = render();
    fixture.componentInstance.spin.set(false);
    fixture.detectChanges();
    expect(configurable.querySelector('ng-icon')?.className).not.toContain('animate-spin');
  });

  it('accepts a custom icon via hbIcon', () => {
    const { fixture, configurable } = render();
    fixture.componentInstance.icon.set('phosphorCircleNotch');
    fixture.detectChanges();
    const icon = configurable.querySelector('ng-icon');
    expect(icon).toBeTruthy();
    expect(icon?.querySelector('svg')).toBeTruthy();
  });

  it('renders 12 bars for the bars variant', () => {
    const { bars } = render();
    expect(bars.getAttribute('data-variant')).toBe('bars');
    expect(bars.querySelectorAll('.animate-hb-spinner-bar').length).toBe(12);
    expect(bars.querySelector('ng-icon')).toBeNull();
  });
});
