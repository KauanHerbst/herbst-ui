import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbGalleryImports } from './gallery.imports';

@Component({
  imports: [HbGalleryImports],
  template: `
    <hb-gallery [hbItems]="items" hbShowThumbnails hbShowIndicators [hbThumbnailsPosition]="'bottom'">
      <ng-template hbGalleryItem let-c>
        <div class="item" [style.background]="c"></div>
      </ng-template>
      <ng-template hbGalleryThumb let-c>
        <div class="thumb" [style.background]="c"></div>
      </ng-template>
    </hb-gallery>
  `,
})
class Host {
  readonly items = ['red', 'green', 'blue'];
}

describe('HbGallery', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('renders a main item and a thumbnail per item', () => {
    const el = render();
    expect(el.querySelectorAll('.item').length).toBe(3);
    expect(el.querySelectorAll('.thumb').length).toBe(3);
  });

  it('renders navigators and indicators', () => {
    const el = render();
    expect(el.querySelector('[aria-label="Previous"]')).toBeTruthy();
    expect(el.querySelector('[aria-label="Next"]')).toBeTruthy();
    const dots = el.querySelectorAll('[aria-current]');
    expect(dots.length).toBe(3);
  });
});
