import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAccordionImports } from './accordion.imports';
import type { HbAccordionBordered } from './accordion.variants';

@Component({
  imports: [HbAccordionImports],
  template: `
    <hb-accordion [hbType]="type()" [hbCollapsible]="collapsible()" [hbBordered]="bordered()">
      <hb-accordion-item hbValue="a" hbTitle="A">Content A</hb-accordion-item>
      <hb-accordion-item hbValue="b" hbTitle="B">Content B</hb-accordion-item>
      <hb-accordion-item hbValue="d" hbTitle="D" hbDisabled>Content D</hb-accordion-item>
    </hb-accordion>
  `,
})
class Host {
  readonly type = signal<'single' | 'multiple'>('single');
  readonly collapsible = signal(true);
  readonly bordered = signal<HbAccordionBordered>('divider');
}

describe('HbAccordion', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const buttons = (): HTMLButtonElement[] =>
      Array.from(fixture.nativeElement.querySelectorAll('button'));
    const isOpen = (i: number) => buttons()[i].getAttribute('aria-expanded') === 'true';
    const click = (i: number) => {
      buttons()[i].click();
      fixture.detectChanges();
    };
    return { fixture, isOpen, click };
  }

  it('renders the item titles', () => {
    const { fixture } = render();
    expect(fixture.nativeElement.textContent).toContain('A');
    expect(fixture.nativeElement.textContent).toContain('B');
  });

  it('single: opening B closes A (CDK coordination)', () => {
    const { isOpen, click } = render();
    click(0);
    expect(isOpen(0)).toBe(true);
    click(1);
    expect(isOpen(1)).toBe(true);
    expect(isOpen(0)).toBe(false);
  });

  it('single + non-collapsible: clicking the open item keeps it open', () => {
    const { fixture, isOpen, click } = render();
    fixture.componentInstance.collapsible.set(false);
    fixture.detectChanges();
    click(0);
    expect(isOpen(0)).toBe(true);
    click(0);
    expect(isOpen(0)).toBe(true);
  });

  it('disabled: the item cannot be opened', () => {
    const { fixture } = render();
    const buttons = Array.from(
      fixture.nativeElement.querySelectorAll('button'),
    ) as HTMLButtonElement[];
    const disabledBtn = buttons[2];
    expect(disabledBtn.disabled).toBe(true);
    disabledBtn.click();
    fixture.detectChanges();
    expect(disabledBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('bordered=none: items have no separator border', () => {
    const { fixture } = render();
    fixture.componentInstance.bordered.set('none');
    fixture.detectChanges();
    const item = fixture.nativeElement.querySelector('hb-accordion-item') as HTMLElement;
    expect(item.className).not.toContain('border-b');
  });

  it('bordered=card: root becomes a bordered card', () => {
    const { fixture } = render();
    fixture.componentInstance.bordered.set('card');
    fixture.detectChanges();
    const root = fixture.nativeElement.querySelector('hb-accordion') as HTMLElement;
    expect(root.className).toContain('rounded-lg');
    expect(root.className).toContain('border');
  });

  it('multiple: A and B can be open at the same time', () => {
    const { fixture, isOpen, click } = render();
    fixture.componentInstance.type.set('multiple');
    fixture.detectChanges();
    click(0);
    click(1);
    expect(isOpen(0)).toBe(true);
    expect(isOpen(1)).toBe(true);
  });
});
