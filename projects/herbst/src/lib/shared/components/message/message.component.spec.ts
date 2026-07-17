import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbMessageImports } from './message.imports';

@Component({
  imports: [HbMessageImports],
  template: `
    <hb-message [hbAlign]="align()">
      <hb-message-avatar [hbName]="name()" [hbSrc]="src()" />
      <hb-message-content>
        <hb-message-header>Ana · 10:32</hb-message-header>
        <div data-slot="bubble-stub">Hello there</div>
        @if (withFooter()) {
          <hb-message-footer>
            Delivered
            <hb-message-actions>
              <button type="button" aria-label="Copy">c</button>
            </hb-message-actions>
          </hb-message-footer>
        }
      </hb-message-content>
    </hb-message>
  `,
})
class Host {
  readonly align = signal<'start' | 'end'>('start');
  readonly name = signal('Ana Silva');
  readonly src = signal('');
  readonly withFooter = signal(true);
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, el };
}

describe('HbMessageComponent', () => {
  it('exposes data-align on the message host', () => {
    const { fixture, el } = render();
    expect(el('[data-slot="message"]').getAttribute('data-align')).toBe('start');
    fixture.componentInstance.align.set('end');
    fixture.detectChanges();
    expect(el('[data-slot="message"]').getAttribute('data-align')).toBe('end');
  });

  it('renders every compound part with its data-slot', () => {
    const { el } = render();
    expect(el('[data-slot="message-avatar"]')).toBeTruthy();
    expect(el('[data-slot="message-content"]')).toBeTruthy();
    expect(el('[data-slot="message-header"]')).toBeTruthy();
    expect(el('[data-slot="message-footer"]')).toBeTruthy();
    expect(el('[data-slot="message-actions"]')).toBeTruthy();
  });

  it('derives avatar initials from hbName when no src is given', () => {
    const { el } = render();
    expect(el('[data-slot="message-avatar"]').textContent?.trim()).toContain('AS');
  });

  it('renders the avatar image when hbSrc is provided', () => {
    const { fixture, el } = render();
    fixture.componentInstance.src.set('https://example.com/ana.png');
    fixture.detectChanges();
    const img = el('[data-slot="message-avatar"] img') as HTMLImageElement | undefined;
    expect(img?.getAttribute('src')).toBe('https://example.com/ana.png');
  });

  it('projects custom avatar content through the slot when no inputs are set', () => {
    @Component({
      imports: [HbMessageImports],
      template: `
        <hb-message>
          <hb-message-avatar><span data-slot="custom-av">X</span></hb-message-avatar>
          <hb-message-content>hi</hb-message-content>
        </hb-message>
      `,
    })
    class SlotHost {}
    TestBed.configureTestingModule({ imports: [SlotHost] });
    const fixture = TestBed.createComponent(SlotHost);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[data-slot="custom-av"]'))).toBeTruthy();
  });

  it('omits the footer when not projected', () => {
    const { fixture, el } = render();
    fixture.componentInstance.withFooter.set(false);
    fixture.detectChanges();
    expect(el('[data-slot="message-footer"]')).toBeFalsy();
  });
});
