import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbHoverCardComponent } from './hover-card.component';
import { HbHoverCardImports } from './hover-card.imports';
import type { HbHoverCardSide } from './hover-card.component';

@Component({
  imports: [HbHoverCardImports],
  template: `
    <hb-hover-card [hbSide]="side()">
      <a hbHoverCardTrigger href="#">@herbst</a>
      <hb-hover-card-content>Card body</hb-hover-card-content>
    </hb-hover-card>
  `,
})
class Host {
  readonly side = signal<HbHoverCardSide>('bottom');
}

describe('HbHoverCardComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.directive(HbHoverCardComponent))
      .componentInstance as HbHoverCardComponent;
    return { fixture, card, el: fixture.nativeElement as HTMLElement };
  }

  it('renders the trigger with its data-slot and does not open initially', () => {
    const { el } = render();
    expect(el.querySelector('[data-slot="hover-card-trigger"]')?.textContent?.trim()).toBe('@herbst');
    expect(overlay.querySelector('[data-slot="hover-card-content"]')).toBeNull();
  });

  it('opens the card into the overlay', () => {
    const { fixture, card } = render();
    card.open();
    fixture.detectChanges();
    const content = overlay.querySelector('[data-slot="hover-card-content"]') as HTMLElement;
    expect(content).toBeTruthy();
    expect(content.textContent).toContain('Card body');
    expect(content.className).toContain('bg-popover');
    expect(content.getAttribute('data-state')).toBe('open');
  });

  it('reflects hbSide on the content via data-side', () => {
    const { fixture, card } = render();
    fixture.componentInstance.side.set('right');
    fixture.detectChanges();
    card.open();
    fixture.detectChanges();
    const content = overlay.querySelector('[data-slot="hover-card-content"]') as HTMLElement;
    expect(content.getAttribute('data-side')).toBe('right');
  });

  it('closes and removes the content from the overlay', () => {
    const { fixture, card } = render();
    card.open();
    fixture.detectChanges();
    card.close();
    fixture.detectChanges();
    expect(overlay.querySelector('[data-slot="hover-card-content"]')).toBeNull();
  });
});
