import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAspectRatioComponent } from './aspect-ratio.component';

@Component({
  imports: [HbAspectRatioComponent],
  template: `
    <hb-aspect-ratio [hbRatio]="ratio()">
      <img src="/x.png" alt="demo" />
    </hb-aspect-ratio>
  `,
})
class Host {
  readonly ratio = signal(1);
}

describe('HbAspectRatioComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = () => fixture.nativeElement.querySelector('hb-aspect-ratio') as HTMLElement;
    const cmp = () =>
      fixture.debugElement.query(By.directive(HbAspectRatioComponent))
        .componentInstance as HbAspectRatioComponent;
    return { fixture, el, cmp };
  }

  it('projects its content', () => {
    const { el } = render();
    expect(el().querySelector('img')).not.toBeNull();
  });

  it('applies the wrapper classes', () => {
    const { el } = render();
    expect(el().className).toContain('overflow-hidden');
    expect(el().className).toContain('block');
  });

  it('reflects the ratio input', () => {
    const { fixture, cmp } = render();
    expect(cmp().hbRatio()).toBe(1);
    fixture.componentInstance.ratio.set(16 / 9);
    fixture.detectChanges();
    expect(cmp().hbRatio()).toBeCloseTo(16 / 9);
  });
});
