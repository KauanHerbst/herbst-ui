import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbKbdImports } from './kbd.imports';
import type { HbKbdSize } from './kbd.variants';

@Component({
  imports: [HbKbdImports],
  template: `
    <hb-kbd [hbSize]="size()">Esc</hb-kbd>
    <hb-kbd-group>
      <hb-kbd>⌘</hb-kbd>
      <hb-kbd>K</hb-kbd>
    </hb-kbd-group>
    <kbd hb-kbd>Ctrl</kbd>
  `,
})
class Host {
  readonly size = signal<HbKbdSize>('md');
}

describe('HbKbdComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      keys: el.querySelectorAll('[data-slot="kbd"]') as NodeListOf<HTMLElement>,
      group: el.querySelector('[data-slot="kbd-group"]') as HTMLElement,
      attrKbd: el.querySelector('kbd[hb-kbd]') as HTMLElement,
    };
  }

  it('renders a key with the default (md) size classes', () => {
    const { keys } = render();
    expect(keys.length).toBeGreaterThan(0);
    const key = keys[0];
    expect(key.textContent?.trim()).toBe('Esc');
    expect(key.className).toContain('bg-muted');
    expect(key.className).toContain('h-5');
  });

  it('scales with hbSize', () => {
    const { fixture, keys } = render();
    fixture.componentInstance.size.set('xl');
    fixture.detectChanges();
    expect(keys[0].className).toContain('h-7');
    expect(keys[0].className).toContain('text-sm');
  });

  it('groups keys with a flex row', () => {
    const { group } = render();
    expect(group).toBeTruthy();
    expect(group.className).toContain('inline-flex');
    expect(group.className).toContain('gap-1');
  });

  it('applies to a semantic <kbd> element via the attribute selector', () => {
    const { attrKbd } = render();
    expect(attrKbd).toBeTruthy();
    expect(attrKbd.tagName.toLowerCase()).toBe('kbd');
    expect(attrKbd.getAttribute('data-slot')).toBe('kbd');
  });
});
