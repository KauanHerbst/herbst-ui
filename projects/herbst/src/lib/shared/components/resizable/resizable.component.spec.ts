import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbResizableImports } from './resizable.imports';
import type { HbResizeEvent } from './resizable.component';
import type { HbResizableOrientation } from './resizable.variants';

@Component({
  imports: [HbResizableImports],
  template: `
    <hb-resizable-group
      [hbOrientation]="orientation()"
      (hbResize)="last.set($event)"
      class="h-40"
    >
      <hb-resizable-panel [hbDefaultSize]="30" [hbMin]="10" [hbMax]="60">A</hb-resizable-panel>
      <hb-resizable-handle hbWithHandle />
      <hb-resizable-panel [hbDefaultSize]="70">B</hb-resizable-panel>
    </hb-resizable-group>
  `,
})
class Host {
  readonly orientation = signal<HbResizableOrientation>('horizontal');
  readonly last = signal<HbResizeEvent | null>(null);
}

describe('HbResizableComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      el,
      group: el.querySelector('[data-slot="resizable-group"]') as HTMLElement,
      panels: Array.from(el.querySelectorAll('[data-slot="resizable-panel"]')) as HTMLElement[],
      handle: el.querySelector('[data-slot="resizable-handle"]') as HTMLElement,
    };
  }
  const press = (el: HTMLElement, key: string) =>
    el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));

  it('lays out panels from their default sizes via flex-grow', () => {
    const { group, panels, handle } = render();
    expect(group.getAttribute('data-orientation')).toBe('horizontal');
    expect(panels[0].style.flexGrow).toBe('30');
    expect(panels[1].style.flexGrow).toBe('70');
    expect(handle.getAttribute('role')).toBe('separator');
    expect(handle.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('grows the left panel with ArrowRight (keyboard, step 5)', () => {
    const { fixture, panels, handle } = render();
    press(handle, 'ArrowRight');
    fixture.detectChanges();
    expect(panels[0].style.flexGrow).toBe('35');
    expect(panels[1].style.flexGrow).toBe('65');
    expect(fixture.componentInstance.last()?.sizes).toEqual([35, 65]);
  });

  it('respects the panel max via keyboard End', () => {
    const { fixture, panels, handle } = render();
    press(handle, 'End');
    fixture.detectChanges();
    expect(panels[0].style.flexGrow).toBe('60');
    expect(panels[1].style.flexGrow).toBe('40');
  });

  it('respects the panel min via keyboard Home', () => {
    const { fixture, panels, handle } = render();
    press(handle, 'Home');
    fixture.detectChanges();
    expect(panels[0].style.flexGrow).toBe('10');
    expect(panels[1].style.flexGrow).toBe('90');
  });

  it('switches to a vertical layout', () => {
    const { fixture, group, handle } = render();
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(group.getAttribute('data-orientation')).toBe('vertical');
    expect(group.className).toContain('flex-col');
    expect(handle.getAttribute('aria-orientation')).toBe('horizontal');
  });
});
