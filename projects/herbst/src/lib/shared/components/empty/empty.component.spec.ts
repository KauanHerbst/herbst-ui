import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbEmptyImports } from './empty.imports';
import type { HbEmptyBackground, HbEmptyMediaVariant, HbEmptyVariant } from './empty.variants';

@Component({
  imports: [HbEmptyImports],
  template: `
    <hb-empty [hbVariant]="variant()" [hbBackground]="background()">
      <hb-empty-header>
        <hb-empty-media [hbVariant]="mediaVariant()">icon</hb-empty-media>
        <hb-empty-title>No projects yet</hb-empty-title>
        <hb-empty-description>Create your first project.</hb-empty-description>
      </hb-empty-header>
      <hb-empty-content>
        <button type="button">New project</button>
      </hb-empty-content>
    </hb-empty>
  `,
})
class Host {
  readonly variant = signal<HbEmptyVariant>('default');
  readonly background = signal<HbEmptyBackground>('none');
  readonly mediaVariant = signal<HbEmptyMediaVariant>('default');
}

describe('HbEmptyComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      root: el.querySelector('[data-slot="empty"]') as HTMLElement,
      header: el.querySelector('[data-slot="empty-header"]') as HTMLElement,
      media: el.querySelector('[data-slot="empty-media"]') as HTMLElement,
      title: el.querySelector('[data-slot="empty-title"]') as HTMLElement,
      description: el.querySelector('[data-slot="empty-description"]') as HTMLElement,
      content: el.querySelector('[data-slot="empty-content"]') as HTMLElement,
    };
  }

  it('renders every compound part with its data-slot', () => {
    const parts = render();
    expect(parts.root).toBeTruthy();
    expect(parts.header).toBeTruthy();
    expect(parts.media).toBeTruthy();
    expect(parts.title?.textContent?.trim()).toBe('No projects yet');
    expect(parts.description?.textContent?.trim()).toBe('Create your first project.');
    expect(parts.content).toBeTruthy();
  });

  it('centers content by default', () => {
    const { root } = render();
    expect(root.className).toContain('flex-col');
    expect(root.className).toContain('items-center');
    expect(root.className).toContain('justify-center');
  });

  it('applies the outline variant as a dashed border', () => {
    const { fixture, root } = render();
    fixture.componentInstance.variant.set('outline');
    fixture.detectChanges();
    expect(root.className).toContain('border-dashed');
  });

  it('applies the muted background', () => {
    const { fixture, root } = render();
    fixture.componentInstance.background.set('muted');
    fixture.detectChanges();
    expect(root.className).toContain('bg-muted/30');
  });

  it('boxes the media when variant=icon', () => {
    const { fixture, media } = render();
    fixture.componentInstance.mediaVariant.set('icon');
    fixture.detectChanges();
    expect(media.className).toContain('rounded-lg');
    expect(media.className).toContain('bg-muted');
  });
});
