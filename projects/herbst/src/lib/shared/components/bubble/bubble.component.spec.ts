import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbBubbleComponent } from './bubble.component';
import { HbBubbleImports } from './bubble.imports';
import type { HbBubbleAlign, HbBubbleReaction, HbBubbleVariant } from './bubble.variants';

@Component({
  imports: [HbBubbleImports],
  template: `
    <hb-bubble [hbVariant]="variant()" [hbAlign]="align()">
      Hello there
      <hb-bubble-reactions [hbReactions]="reactions()" (hbReact)="reacted.set($event)" />
    </hb-bubble>
  `,
})
class Host {
  readonly variant = signal<HbBubbleVariant>('default');
  readonly align = signal<HbBubbleAlign>('start');
  readonly reactions = signal<HbBubbleReaction[]>([
    { emoji: '👍', count: 3, reacted: true },
    { emoji: '🎉', count: 1 },
  ]);
  readonly reacted = signal<string | null>(null);
}

describe('HbBubbleComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const bubble = fixture.debugElement.query(By.directive(HbBubbleComponent))
      .nativeElement as HTMLElement;
    return { fixture, host: fixture.componentInstance, bubble };
  }

  it('applies the variant surface classes', () => {
    const { bubble } = render();
    const surface = bubble.querySelector('div') as HTMLElement;
    expect(surface.className).toContain('bg-primary');
    expect(bubble.getAttribute('data-align')).toBe('start');
  });

  it('reflects alignment (end justifies to the right)', () => {
    const { fixture, host, bubble } = render();
    host.align.set('end');
    fixture.detectChanges();
    expect(bubble.className).toContain('justify-end');
    expect(bubble.getAttribute('data-align')).toBe('end');
  });

  it('renders reaction chips with counts and reacted state', () => {
    const { bubble } = render();
    const chips = bubble.querySelectorAll('[data-slot="bubble-reactions"] button');
    expect(chips.length).toBe(2);
    expect(chips[0].textContent).toContain('👍');
    expect(chips[0].textContent).toContain('3');
    expect(chips[0].className).toContain('bg-primary/10');
  });

  it('emits the clicked emoji from a reaction', () => {
    const { fixture, host, bubble } = render();
    const chip = bubble.querySelectorAll(
      '[data-slot="bubble-reactions"] button',
    )[1] as HTMLButtonElement;
    chip.click();
    fixture.detectChanges();
    expect(host.reacted()).toBe('🎉');
  });
});

describe('HbBubbleComponent collapsible', () => {
  @Component({
    imports: [HbBubbleImports],
    template: `
      <hb-bubble hbCollapsible [hbClampLines]="2" [(hbExpanded)]="expanded">Long content</hb-bubble>
    `,
  })
  class ClampHost {
    readonly expanded = signal(false);
  }

  it('toggles expanded via [(hbExpanded)]', () => {
    const fixture = TestBed.createComponent(ClampHost);
    fixture.detectChanges();
    const bubble = fixture.debugElement.query(By.directive(HbBubbleComponent))
      .componentInstance as HbBubbleComponent;
    expect(fixture.componentInstance.expanded()).toBe(false);
    bubble.hbExpanded.set(true);
    fixture.detectChanges();
    expect(fixture.componentInstance.expanded()).toBe(true);
  });
});

describe('HbBubbleGroupComponent', () => {
  @Component({
    imports: [HbBubbleImports],
    template: `
      <hb-bubble-group hbAlign="end" hbName="Alice" hbTime="12:04">
        <hb-bubble hbVariant="default" hbAlign="end">Hi</hb-bubble>
      </hb-bubble-group>
    `,
  })
  class GroupHost {}

  it('aligns items to the end and shows the header', () => {
    const fixture = TestBed.createComponent(GroupHost);
    fixture.detectChanges();
    const group = fixture.nativeElement.querySelector('[data-slot="bubble-group"]') as HTMLElement;
    expect(group.className).toContain('items-end');
    expect(group.textContent).toContain('Alice');
    expect(group.textContent).toContain('12:04');
  });
});
