import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbCommandImports } from './command.imports';

@Component({
  imports: [HbCommandImports],
  template: `
    <hb-command (hbSelect)="selected = $event" (hbCommandChange)="query = $event">
      <hb-command-input hbPlaceholder="Search…" />
      <hb-command-list>
        <hb-command-empty>No results.</hb-command-empty>
        <hb-command-group hbHeading="Suggestions">
          <hb-command-item [hbValue]="'new'" [hbKeywords]="['create']">New File</hb-command-item>
          <hb-command-item [hbValue]="'open'">Open File</hb-command-item>
        </hb-command-group>
        <hb-command-group hbHeading="Settings">
          <hb-command-item [hbValue]="'profile'">Profile</hb-command-item>
        </hb-command-group>
      </hb-command-list>
    </hb-command>
  `,
})
class Host {
  selected: unknown = null;
  query = '';
}

describe('HbCommandComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
  });
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const input = el.querySelector('input') as HTMLInputElement;
    return { fixture, el, input };
  }
  function type(input: HTMLInputElement, text: string) {
    input.value = text;
    input.dispatchEvent(new Event('input'));
  }

  it('renders input, groups and items', () => {
    const { el } = render();
    expect(el.querySelector('[data-slot="command-input"]')).toBeTruthy();
    expect(el.querySelectorAll('[data-slot="command-group"]').length).toBe(2);
    expect(el.querySelectorAll('[data-slot="command-item"]').length).toBe(3);
  });

  it('filters items and emits hbCommandChange', () => {
    const { fixture, el, input } = render();
    type(input, 'profile');
    fixture.detectChanges();
    expect(fixture.componentInstance.query).toBe('profile');
    const visible = Array.from(el.querySelectorAll('[data-slot="command-item"]')).filter(
      (i) => (i as HTMLElement).style.display !== 'none',
    );
    expect(visible.length).toBe(1);
    expect(visible[0].textContent).toContain('Profile');
    const groups = Array.from(el.querySelectorAll('[data-slot="command-group"]')) as HTMLElement[];
    expect(groups[0].style.display).toBe('none');
  });

  it('matches by keywords', () => {
    const { fixture, el, input } = render();
    type(input, 'create');
    fixture.detectChanges();
    const visible = Array.from(el.querySelectorAll('[data-slot="command-item"]')).filter(
      (i) => (i as HTMLElement).style.display !== 'none',
    );
    expect(visible.length).toBe(1);
    expect(visible[0].textContent).toContain('New File');
  });

  it('selects an item on click and emits hbSelect', () => {
    const { fixture, el } = render();
    (el.querySelectorAll('[data-slot="command-item"]')[1] as HTMLElement).click();
    expect(fixture.componentInstance.selected).toBe('open');
  });

  it('navigates with arrows and selects with Enter', () => {
    const { fixture, el, input } = render();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe('open');
  });

  it('shows the empty state when nothing matches', () => {
    const { fixture, el, input } = render();
    type(input, 'zzz');
    fixture.detectChanges();
    const empty = el.querySelector('[data-slot="command-empty"]') as HTMLElement;
    expect(empty.style.display).not.toBe('none');
    expect(empty.textContent).toContain('No results.');
  });
});
