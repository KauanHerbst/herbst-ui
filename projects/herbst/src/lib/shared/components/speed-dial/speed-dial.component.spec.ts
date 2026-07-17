import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbSpeedDialImports } from './speed-dial.imports';
import type { HbSpeedDialItem, HbSpeedDialType } from './speed-dial.types';

@Component({
  imports: [HbSpeedDialImports],
  template: `
    <hb-speed-dial
      [hbModel]="items"
      [hbType]="type()"
      [hbMask]="mask()"
      [(hbVisible)]="open"
      (hbItemClick)="clicked = $event.label ?? ''"
    >
      <ng-template hbSpeedDialItem let-item>
        <span data-slot="custom-item">{{ item.label }}</span>
      </ng-template>
    </hb-speed-dial>
  `,
})
class Host {
  clicked = '';
  ran = '';
  readonly type = signal<HbSpeedDialType>('linear');
  readonly mask = signal(false);
  readonly open = signal(false);
  readonly items: HbSpeedDialItem[] = [
    { icon: 'phosphorPlus', label: 'Add', command: () => (this.ran = 'add') },
    { icon: 'phosphorX', label: 'Remove' },
    { icon: 'phosphorHeart', label: 'Like' },
  ];
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  const fab = () => el('[aria-haspopup="true"]');
  const items = () => fixture.debugElement.queryAll(By.css('.hb-speed-dial-list button'));
  return { fixture, host: fixture.componentInstance, el, fab, items };
}

describe('HbSpeedDialComponent', () => {
  it('renders the FAB and one button per model item', () => {
    const { fab, items } = render();
    expect(fab()).toBeTruthy();
    expect(items().length).toBe(3);
  });

  it('toggles open/closed on FAB click (controlled)', () => {
    const { fixture, host, fab, el } = render();
    expect(el('[data-slot="speed-dial"]').getAttribute('data-open')).toBeNull();
    fab().click();
    fixture.detectChanges();
    expect(host.open()).toBe(true);
    expect(fab().getAttribute('aria-expanded')).toBe('true');
    fab().click();
    fixture.detectChanges();
    expect(host.open()).toBe(false);
  });

  it('runs the item command, emits hbItemClick and closes', () => {
    const { fixture, host, items } = render();
    host.open.set(true);
    fixture.detectChanges();
    const first = items()[0].nativeElement as HTMLElement;
    first.click();
    fixture.detectChanges();
    expect(host.ran).toBe('add');
    expect(host.clicked).toBe('Add');
    expect(host.open()).toBe(false);
  });

  it('renders the custom item template', () => {
    const { fixture } = render();
    expect(fixture.debugElement.queryAll(By.css('[data-slot="custom-item"]')).length).toBe(3);
  });

  it('shows the mask overlay only when open and hbMask', () => {
    const { fixture, el } = render();
    fixture.componentInstance.mask.set(true);
    fixture.detectChanges();
    expect(el('[data-slot="speed-dial-mask"]')).toBeFalsy();
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();
    expect(el('[data-slot="speed-dial-mask"]')).toBeTruthy();
  });

  it('closes on Escape', () => {
    const { fixture, host } = render();
    host.open.set(true);
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(host.open()).toBe(false);
  });
});
