import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbCardImports } from './card.imports';

@Component({
  imports: [HbCardImports],
  template: `
    <hb-card [hbSize]="size()">
      <hb-card-image hbSrc="/x.jpg" hbAlt="cover" [hbRatio]="16 / 9" />
      <hb-card-header [hbBorder]="headerBorder()">
        <hb-card-title>Title</hb-card-title>
        <hb-card-description>Desc</hb-card-description>
        <button hb-card-action (hbActionClick)="clicked = true">A</button>
      </hb-card-header>
      <hb-card-content>Body</hb-card-content>
      <hb-card-footer [hbBorder]="true">Footer</hb-card-footer>
    </hb-card>
  `,
})
class Host {
  readonly size = signal<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly headerBorder = signal(false);
  clicked = false;
}

describe('HbCard', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return { fixture, el };
  }

  it('renders all compound parts with data-slots', () => {
    const { el } = render();
    for (const slot of ['card', 'card-image', 'card-header', 'card-title', 'card-description', 'card-action', 'card-content', 'card-footer']) {
      expect(el.querySelector(`[data-slot="${slot}"]`), slot).toBeTruthy();
    }
  });

  it('positions the action via the header grid', () => {
    const { el } = render();
    const header = el.querySelector('[data-slot="card-header"]') as HTMLElement;
    expect(header.className).toContain('has-[[data-slot=card-action]]:grid-cols-[1fr_auto]');
    const action = el.querySelector('[data-slot="card-action"]') as HTMLElement;
    expect(action.className).toContain('justify-self-end');
  });

  it('emits hbActionClick', () => {
    const { fixture, el } = render();
    (el.querySelector('[data-slot="card-action"]') as HTMLElement).click();
    expect(fixture.componentInstance.clicked).toBe(true);
  });

  it('applies header border + padding when hbBorder is set', () => {
    const { fixture, el } = render();
    fixture.componentInstance.headerBorder.set(true);
    fixture.detectChanges();
    const header = el.querySelector('[data-slot="card-header"]') as HTMLElement;
    expect(header.className).toContain('border-b');
    expect(header.className).toContain('pb-6');
  });

  it('scales padding with hbSize', () => {
    const { fixture, el } = render();
    fixture.componentInstance.size.set('xl');
    fixture.detectChanges();
    const content = el.querySelector('[data-slot="card-content"]') as HTMLElement;
    expect(content.className).toContain('px-10');
  });

  it('bleeds the top image by the card padding', () => {
    const { el } = render();
    const image = el.querySelector('[data-slot="card-image"]') as HTMLElement;
    expect(image.className).toContain('-mt-6');
  });
});
