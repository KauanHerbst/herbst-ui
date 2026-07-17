import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { HbButtonComponent } from '../button';
import { HbMenuImports } from './menu.imports';

@Component({
  imports: [HbMenuImports, HbButtonComponent],
  template: `
    <button hb-button [hbMenuTriggerFor]="menu">Open</button>
    <ng-template #menu>
      <hb-menu>
        <hb-menu-label>Actions</hb-menu-label>
        <hb-menu-item (hbSelect)="onSelect('a')">Item A</hb-menu-item>
        <hb-menu-item hbVariant="destructive" (hbSelect)="onSelect('b')">Delete</hb-menu-item>
        <hb-menu-separator />
        <hb-menu-checkbox-item [(hbChecked)]="checked">Toggle</hb-menu-checkbox-item>
        <hb-menu-radio-group [(hbValue)]="radio">
          <hb-menu-radio-item [hbValue]="'x'">X</hb-menu-radio-item>
          <hb-menu-radio-item [hbValue]="'y'">Y</hb-menu-radio-item>
        </hb-menu-radio-group>
      </hb-menu>
    </ng-template>
  `,
})
class Host {
  readonly checked = signal(false);
  readonly radio = signal<unknown>('x');
  selected: string | null = null;
  onSelect(v: string): void {
    this.selected = v;
  }
}

describe('HbMenu', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function open() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    return fixture;
  }

  it('opens the menu on trigger click', () => {
    open();
    expect(overlay.textContent).toContain('Item A');
    expect(overlay.textContent).toContain('Actions');
  });

  it('emits hbSelect when an item is triggered', () => {
    const fixture = open();
    const item = overlay.querySelector('[role="menuitem"]') as HTMLElement;
    item.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.selected).toBe('a');
  });

  it('toggles a checkbox item', () => {
    const fixture = open();
    const cb = overlay.querySelector('[role="menuitemcheckbox"]') as HTMLElement;
    cb.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.checked()).toBe(true);
  });

  it('selects a radio item within the group', () => {
    const fixture = open();
    const radios = overlay.querySelectorAll('[role="menuitemradio"]');
    (radios[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.radio()).toBe('y');
  });

});

@Component({
  imports: [HbMenuImports, HbButtonComponent],
  template: `
    <button hb-button [hbMenuTriggerFor]="menu" hbTrigger="hover">Hover</button>
    <ng-template #menu>
      <hb-menu>
        <hb-menu-item>Item A</hb-menu-item>
      </hb-menu>
    </ng-template>
  `,
})
class HoverHost {}

describe('HbMenu hover', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    vi.useFakeTimers();
    TestBed.configureTestingModule({ imports: [HoverHost] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });
  afterEach(() => vi.useRealTimers());

  function openHover() {
    const fixture = TestBed.createComponent(HoverHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('mouseenter'));
    vi.advanceTimersByTime(120);
    fixture.detectChanges();
    const panel = overlay.querySelector('[data-slot="menu"]') as HTMLElement;
    return { fixture, trigger, panel };
  }

  it('opens on hover', () => {
    const { panel } = openHover();
    expect(overlay.textContent).toContain('Item A');
    expect(panel).toBeTruthy();
  });

  it('stays open when the pointer moves from the trigger into the menu panel', () => {
    const { fixture, trigger, panel } = openHover();
    trigger.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: panel }));
    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    expect(overlay.textContent).toContain('Item A');
  });

  it('closes when the pointer leaves the trigger to the outside', () => {
    const { fixture, trigger } = openHover();
    trigger.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: document.body }));
    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    expect(overlay.textContent).not.toContain('Item A');
  });

  it('closes when the pointer leaves the menu panel to the outside', () => {
    const { fixture, panel } = openHover();
    panel.dispatchEvent(new MouseEvent('mouseleave', { relatedTarget: document.body }));
    vi.advanceTimersByTime(300);
    fixture.detectChanges();
    expect(overlay.textContent).not.toContain('Item A');
  });
});
