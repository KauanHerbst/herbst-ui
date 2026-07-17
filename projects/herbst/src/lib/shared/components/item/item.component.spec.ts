import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbItemImports } from './item.imports';
import type { HbItemMediaVariant, HbItemSize, HbItemVariant } from './item.variants';

@Component({
  imports: [HbItemImports],
  template: `
    <hb-item-group>
      <hb-item [hbVariant]="variant()" [hbSize]="size()">
        <hb-item-media [hbVariant]="mediaVariant()">M</hb-item-media>
        <hb-item-content>
          <hb-item-title>Notifications</hb-item-title>
          <hb-item-description>Manage alerts.</hb-item-description>
        </hb-item-content>
        <hb-item-actions><button type="button">Go</button></hb-item-actions>
      </hb-item>
      <hb-item-separator />
      <a hb-item href="#">Linked row</a>
    </hb-item-group>
  `,
})
class Host {
  readonly variant = signal<HbItemVariant>('default');
  readonly size = signal<HbItemSize>('md');
  readonly mediaVariant = signal<HbItemMediaVariant>('default');
}

describe('HbItemComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      group: el.querySelector('[data-slot="item-group"]') as HTMLElement,
      item: el.querySelector('[data-slot="item"]') as HTMLElement,
      media: el.querySelector('[data-slot="item-media"]') as HTMLElement,
      title: el.querySelector('[data-slot="item-title"]') as HTMLElement,
      description: el.querySelector('[data-slot="item-description"]') as HTMLElement,
      actions: el.querySelector('[data-slot="item-actions"]') as HTMLElement,
      separator: el.querySelector('[data-slot="item-separator"]') as HTMLElement,
      link: el.querySelector('a[data-slot="item"]') as HTMLAnchorElement,
    };
  }

  it('renders the compound parts with their data-slots', () => {
    const p = render();
    expect(p.group.getAttribute('role')).toBe('list');
    expect(p.item).toBeTruthy();
    expect(p.title.textContent?.trim()).toBe('Notifications');
    expect(p.description.textContent?.trim()).toBe('Manage alerts.');
    expect(p.actions).toBeTruthy();
    expect(p.separator.getAttribute('role')).toBe('separator');
  });

  it('exposes data-variant / data-size and default md classes', () => {
    const { item } = render();
    expect(item.getAttribute('data-variant')).toBe('default');
    expect(item.getAttribute('data-size')).toBe('md');
    expect(item.className).toContain('p-4');
  });

  it('applies the outline variant and sm size', () => {
    const { fixture, item } = render();
    fixture.componentInstance.variant.set('outline');
    fixture.componentInstance.size.set('sm');
    fixture.detectChanges();
    expect(item.className).toContain('border-border');
    expect(item.getAttribute('data-size')).toBe('sm');
    expect(item.className).toContain('py-3');
  });

  it('boxes the media when variant=icon', () => {
    const { fixture, media } = render();
    fixture.componentInstance.mediaVariant.set('icon');
    fixture.detectChanges();
    expect(media.className).toContain('bg-muted');
    expect(media.className).toContain('size-8');
  });

  it('renders as an anchor via the attribute selector', () => {
    const { link } = render();
    expect(link).toBeTruthy();
    expect(link.tagName.toLowerCase()).toBe('a');
    expect(link.className).toContain('hover:bg-accent/50');
  });
});
