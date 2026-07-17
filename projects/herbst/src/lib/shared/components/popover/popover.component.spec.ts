import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbPopoverComponent } from './popover.component';
import { HbPopoverImports } from './popover.imports';
import type { HbPopoverSide, HbPopoverTriggerMode } from './popover.component';

@Component({
  imports: [HbPopoverImports],
  template: `
    <hb-popover [hbTrigger]="trigger()" [hbSide]="side()">
      <button hbPopoverTrigger type="button">Open</button>
      <hb-popover-content>
        <input type="text" placeholder="name" />
        <button type="button" hbPopoverClose>Save</button>
      </hb-popover-content>
    </hb-popover>
  `,
})
class Host {
  readonly trigger = signal<HbPopoverTriggerMode>('click');
  readonly side = signal<HbPopoverSide>('bottom');
}

describe('HbPopoverComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const popover = fixture.debugElement.query(By.directive(HbPopoverComponent))
      .componentInstance as HbPopoverComponent;
    const triggerBtn = fixture.nativeElement.querySelector(
      'button[hbPopoverTrigger]',
    ) as HTMLButtonElement;
    return { fixture, popover, triggerBtn, el: fixture.nativeElement as HTMLElement };
  }
  const content = () => overlay.querySelector('[data-slot="popover-content"]') as HTMLElement;

  it('is closed initially and marks the trigger', () => {
    const { el } = render();
    expect(el.querySelector('[data-slot="popover-trigger"]')).toBeTruthy();
    expect(content()).toBeNull();
  });

  it('toggles open/closed on trigger click (click mode)', () => {
    const { fixture, triggerBtn } = render();
    triggerBtn.click();
    fixture.detectChanges();
    expect(content()).toBeTruthy();
    expect(content().textContent).toContain('Save');
    expect(content().className).toContain('bg-popover');
    triggerBtn.click();
    fixture.detectChanges();
    expect(content()).toBeNull();
  });

  it('reflects hbSide via data-side', () => {
    const { fixture, triggerBtn } = render();
    fixture.componentInstance.side.set('right');
    fixture.detectChanges();
    triggerBtn.click();
    fixture.detectChanges();
    expect(content().getAttribute('data-side')).toBe('right');
  });

  it('does not open on click when in hover mode', () => {
    const { fixture, triggerBtn } = render();
    fixture.componentInstance.trigger.set('hover');
    fixture.detectChanges();
    triggerBtn.click();
    fixture.detectChanges();
    expect(content()).toBeNull();
  });

  it('closes via [hbPopoverClose] inside the content', () => {
    const { fixture, triggerBtn } = render();
    triggerBtn.click();
    fixture.detectChanges();
    const closeBtn = content().querySelector('[data-slot="popover-close"]') as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();
    expect(content()).toBeNull();
  });
});
