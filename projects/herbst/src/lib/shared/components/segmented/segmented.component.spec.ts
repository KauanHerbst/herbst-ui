import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbSegmentedImports } from './segmented.imports';
import type { HbSegmentedOption } from './segmented.component';
import type { HbSegmentedSize } from './segmented.variants';

@Component({
  imports: [HbSegmentedImports],
  template: `
    <hb-segmented
      [hbOptions]="options()"
      [(hbValue)]="value"
      [hbSize]="size()"
      [hbDisabled]="disabled()"
    />
  `,
})
class Host {
  readonly options = signal<HbSegmentedOption[]>([
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
    { value: 'board', label: 'Board', disabled: true },
  ]);
  readonly value = signal('');
  readonly size = signal<HbSegmentedSize>('md');
  readonly disabled = signal(false);
}

describe('HbSegmentedComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const buttons = () => Array.from(el.querySelectorAll('button[role="radio"]')) as HTMLButtonElement[];
    return { fixture, el, buttons, group: el.querySelector('[role="radiogroup"]') as HTMLElement };
  }

  it('renders a radiogroup with a radio per option and defaults to the first enabled', () => {
    const { group, buttons, fixture } = render();
    expect(group).toBeTruthy();
    expect(buttons().map((b) => b.textContent?.trim())).toEqual(['List', 'Grid', 'Board']);
    expect(buttons()[0].getAttribute('aria-checked')).toBe('true');
    expect(fixture.componentInstance.value()).toBe('');
  });

  it('selects on click and updates the two-way value', () => {
    const { fixture, buttons } = render();
    buttons()[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('grid');
    expect(buttons()[1].getAttribute('aria-checked')).toBe('true');
    expect(buttons()[0].getAttribute('aria-checked')).toBe('false');
  });

  it('does not select a disabled option', () => {
    const { fixture, buttons } = render();
    expect(buttons()[2].disabled).toBe(true);
    buttons()[2].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('');
  });

  it('reflects a bound value', () => {
    const { fixture, buttons } = render();
    fixture.componentInstance.value.set('grid');
    fixture.detectChanges();
    expect(buttons()[1].getAttribute('aria-checked')).toBe('true');
  });

  it('moves selection with ArrowRight (keyboard, skipping disabled)', () => {
    const { fixture, group } = render();
    fixture.componentInstance.value.set('list');
    fixture.detectChanges();
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('grid');
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('list');
  });

  it('applies the size and disables the whole control', () => {
    const { fixture, group, buttons } = render();
    fixture.componentInstance.size.set('lg');
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(group.className).toContain('h-10');
    expect(buttons().every((b) => b.disabled)).toBe(true);
  });
});
