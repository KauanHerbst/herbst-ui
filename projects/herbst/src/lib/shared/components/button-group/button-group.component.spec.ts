import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbButtonComponent } from '../button';
import type { HbButtonGroupOrientation, HbButtonGroupSize } from '../../core';
import { HbButtonGroupImports } from './button-group.imports';

@Component({
  imports: [HbButtonGroupImports, HbButtonComponent],
  template: `
    <hb-button-group [hbOrientation]="orientation()" [hbSize]="size()">
      <button hb-button>One</button>
      <hb-button-group-separator />
      <button hb-button>Two</button>
    </hb-button-group>
  `,
})
class Host {
  readonly orientation = signal<HbButtonGroupOrientation>('horizontal');
  readonly size = signal<HbButtonGroupSize | null>(null);
}

describe('HbButtonGroup', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const group = () => fixture.nativeElement.querySelector('hb-button-group') as HTMLElement;
    const firstButton = () => fixture.nativeElement.querySelector('button') as HTMLElement;
    const separator = () =>
      fixture.nativeElement.querySelector('[data-slot="button-group-separator"]') as HTMLElement;
    return { fixture, group, firstButton, separator };
  }

  it('renders the buttons and the separator', () => {
    const { fixture, separator } = render();
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(2);
    expect(separator()).not.toBeNull();
  });

  it('applies the vertical orientation', () => {
    const { fixture, group } = render();
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(group().className).toContain('flex-col');
  });

  it('propagates the group size to child buttons', () => {
    const { fixture, firstButton } = render();
    expect(firstButton().className).toContain('h-9');
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(firstButton().className).toContain('h-10');
  });

  it('renders a perpendicular separator (vertical line in a horizontal group)', () => {
    const { separator } = render();
    expect(separator().className).toContain('w-px');
  });
});
