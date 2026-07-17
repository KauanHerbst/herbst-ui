import { Component, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbCarouselComponent } from './carousel.component';
import { HbCarouselImports } from './carousel.imports';

@Component({
  imports: [HbCarouselImports],
  template: `
    <hb-carousel hbLoop>
      <hb-carousel-content>
        <hb-carousel-item class="basis-1/2">1</hb-carousel-item>
        <hb-carousel-item class="basis-1/3">2</hb-carousel-item>
        <hb-carousel-item>3</hb-carousel-item>
      </hb-carousel-content>
      <hb-carousel-previous />
      <hb-carousel-next />
      <hb-carousel-dots />
    </hb-carousel>
  `,
})
class Host {
  readonly carousel = viewChild.required(HbCarouselComponent);
}

describe('HbCarousel', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return { fixture, el: fixture.nativeElement as HTMLElement };
  }

  it('renders the compound parts', () => {
    const { el } = render();
    expect(el.querySelector('[data-slot="carousel-content"]')).toBeTruthy();
    expect(el.querySelectorAll('[data-slot="carousel-item"]').length).toBe(3);
    expect(el.querySelector('[data-slot="carousel-previous"] button')).toBeTruthy();
    expect(el.querySelector('[data-slot="carousel-next"] button')).toBeTruthy();
    expect(el.querySelector('[data-slot="carousel-dots"]')).toBeTruthy();
  });

  it('keeps variable item widths from the class input', () => {
    const { el } = render();
    const items = el.querySelectorAll('[data-slot="carousel-item"]');
    expect((items[0] as HTMLElement).className).toContain('basis-1/2');
    expect((items[1] as HTMLElement).className).toContain('basis-1/3');
    expect((items[2] as HTMLElement).className).toContain('basis-full');
  });

  it('scrollNext/scrollPrev do not throw', () => {
    const { fixture, el } = render();
    const next = el.querySelector('[data-slot="carousel-next"] button') as HTMLButtonElement;
    const prev = el.querySelector('[data-slot="carousel-previous"] button') as HTMLButtonElement;
    expect(() => {
      next.click();
      prev.click();
    }).not.toThrow();
    expect(fixture.componentInstance.carousel().selectedIndex()).toBe(0);
  });
});
