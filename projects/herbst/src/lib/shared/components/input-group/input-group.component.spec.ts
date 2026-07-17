import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbInputDirective } from '../input';
import { HbInputGroupImports } from './input-group.imports';

@Component({
  imports: [HbInputGroupImports, HbInputDirective],
  template: `
    <hb-input-group>
      <hb-input-group-addon>
        <hb-input-group-text>@</hb-input-group-text>
      </hb-input-group-addon>
      <input hb-input placeholder="user" />
      <hb-input-group-addon hbAlign="inline-end">end</hb-input-group-addon>
    </hb-input-group>
  `,
})
class Host {}

describe('HbInputGroup', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const group = () => fixture.nativeElement.querySelector('[data-slot="input-group"]') as HTMLElement;
    return { fixture, group };
  }

  it('renders the input and both addons', () => {
    const { group } = render();
    expect(group().querySelector('input')).not.toBeNull();
    expect(group().querySelectorAll('[data-slot="input-group-addon"]').length).toBe(2);
  });

  it('places the inline-end addon after the input via order-last', () => {
    const { group } = render();
    const endAddon = group().querySelector('[data-align="inline-end"]') as HTMLElement;
    expect(endAddon.className).toContain('order-last');
  });

  it('has a focus-within ring on the group', () => {
    const { group } = render();
    expect(group().className).toContain('focus-within:ring-[3px]');
  });
});
