import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbMessageScrollerImports } from './message-scroller.imports';
import { HbMessageScrollerComponent } from './message-scroller.component';

@Component({
  imports: [HbMessageScrollerImports],
  template: `
    <hb-message-scroller #scroller class="h-40" [hbAutoScroll]="autoScroll()">
      <hb-message-scroller-viewport>
        <hb-message-scroller-content>
          @for (m of messages(); track m) {
            <hb-message-scroller-item [hbMessageId]="m" hbScrollAnchor>
              <div class="h-16">{{ m }}</div>
            </hb-message-scroller-item>
          }
        </hb-message-scroller-content>
      </hb-message-scroller-viewport>
      <hb-message-scroller-button />
    </hb-message-scroller>
  `,
})
class Host {
  readonly messages = signal(['a', 'b', 'c']);
  readonly autoScroll = signal(true);
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  return { fixture, host: fixture.componentInstance, el };
}

describe('HbMessageScrollerComponent', () => {
  it('renders the frame parts with their data-slots', () => {
    const { el } = render();
    expect(el('[data-slot="message-scroller"]')).toBeTruthy();
    expect(el('[data-slot="message-scroller-viewport"]')).toBeTruthy();
    expect(el('[data-slot="message-scroller-content"]')).toBeTruthy();
    expect(el('[data-slot="message-scroller-button"]')).toBeTruthy();
  });

  it('marks the content region as a polite live log', () => {
    const { el } = render();
    const content = el('[data-slot="message-scroller-content"]');
    expect(content.getAttribute('role')).toBe('log');
    expect(content.getAttribute('aria-live')).toBe('polite');
  });

  it('tags items with their message id and anchor', () => {
    const { el } = render();
    const item = el('[data-slot="message-scroller-item"]');
    expect(item.getAttribute('data-message-id')).toBe('a');
    expect(item.getAttribute('data-anchor')).toBe('true');
  });

  it('exposes public scroll commands via exportAs', () => {
    const { fixture } = render();
    const scroller = fixture.debugElement
      .query(By.directive(HbMessageScrollerComponent))
      .componentInstance as HbMessageScrollerComponent;
    expect(typeof scroller.scrollToEnd).toBe('function');
    expect(typeof scroller.scrollToStart).toBe('function');
    expect(typeof scroller.scrollToMessage).toBe('function');
    expect(() => scroller.scrollToMessage('b', false)).not.toThrow();
  });
});
