import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbTimelineImports } from './timeline.imports';

@Component({
  imports: [HbTimelineImports],
  template: `
    <hb-timeline [hbLayout]="layout()" [hbAlign]="align()">
      <hb-timeline-item>
        <hb-timeline-opposite>09:00</hb-timeline-opposite>
        <hb-timeline-marker hbIcon="phosphorCheck" hbColor="success" />
        <hb-timeline-content>Confirmed</hb-timeline-content>
      </hb-timeline-item>
      <hb-timeline-item [hbInteractive]="interactive()" (hbSelect)="selected = selected + 1">
        <hb-timeline-marker />
        <hb-timeline-content>In progress</hb-timeline-content>
      </hb-timeline-item>
    </hb-timeline>
  `,
})
class Host {
  readonly layout = signal<'vertical' | 'horizontal'>('vertical');
  readonly align = signal<'left' | 'right' | 'alternate'>('left');
  readonly interactive = signal(true);
  selected = 0;
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  const all = (sel: string) =>
    fixture.debugElement.queryAll(By.css(sel)).map((d) => d.nativeElement as HTMLElement);
  return { fixture, host: fixture.componentInstance, el, all };
}

describe('HbTimelineComponent', () => {
  it('renders parts with their data-slots and layout/align attrs', () => {
    const { el } = render();
    const root = el('[data-slot="timeline"]');
    expect(root.getAttribute('data-layout')).toBe('vertical');
    expect(root.getAttribute('data-align')).toBe('left');
    expect(el('[data-slot="timeline-item"]')).toBeTruthy();
    expect(el('[data-slot="timeline-marker"]')).toBeTruthy();
    expect(el('[data-slot="timeline-content"]')).toBeTruthy();
    expect(el('[data-slot="timeline-opposite"]')).toBeTruthy();
  });

  it('draws a default dot when the item has no marker with icon/content', () => {
    const { all } = render();
    const markers = all('[data-slot="timeline-marker"]');
    expect(markers.length).toBe(2);
    expect(markers[1].querySelector('ng-icon')).toBeFalsy();
  });

  it('emits hbSelect on click and Enter when interactive', () => {
    const { fixture, host } = render();
    const items = fixture.debugElement.queryAll(By.css('[data-slot="timeline-item"]'));
    const second = items[1].nativeElement as HTMLElement;
    expect(second.getAttribute('role')).toBe('button');
    expect(second.getAttribute('tabindex')).toBe('0');
    second.click();
    second.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(host.selected).toBe(2);
  });

  it('is not interactive by default (role listitem, no emit)', () => {
    const { fixture } = render();
    fixture.componentInstance.interactive.set(false);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('[data-slot="timeline-item"]'));
    const second = items[1].nativeElement as HTMLElement;
    expect(second.getAttribute('role')).toBe('listitem');
    expect(second.getAttribute('tabindex')).toBeNull();
  });

  it('reflects layout and align changes on the root', () => {
    const { fixture, el } = render();
    fixture.componentInstance.layout.set('horizontal');
    fixture.componentInstance.align.set('alternate');
    fixture.detectChanges();
    const root = el('[data-slot="timeline"]');
    expect(root.getAttribute('data-layout')).toBe('horizontal');
    expect(root.getAttribute('data-align')).toBe('alternate');
  });
});
