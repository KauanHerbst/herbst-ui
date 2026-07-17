import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbSliderComponent } from './slider.component';
import { HbSliderImports } from './slider.imports';
import type { HbSliderOrientation } from './slider.variants';

@Component({
  imports: [HbSliderImports],
  template: `
    <hb-slider
      [(hbValue)]="value"
      [hbMin]="min()"
      [hbMax]="max()"
      [hbStep]="step()"
      [hbOrientation]="orientation()"
      [hbDisabled]="disabled()"
      [hbMinStepsBetweenThumbs]="gap()"
      (hbChangeEnd)="ended.set($event)"
    />
  `,
})
class Host {
  readonly value = signal<number | number[] | null>(50);
  readonly min = signal(0);
  readonly max = signal(100);
  readonly step = signal(1);
  readonly orientation = signal<HbSliderOrientation>('horizontal');
  readonly disabled = signal(false);
  readonly gap = signal(0);
  readonly ended = signal<number | number[] | null>(null);
}

describe('HbSliderComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(HbSliderComponent));
    const thumbs = () =>
      Array.from(el.nativeElement.querySelectorAll('[role="slider"]')) as HTMLElement[];
    return { fixture, host: fixture.componentInstance, thumbs };
  }
  const key = (target: HTMLElement, k: string) =>
    target.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));

  it('renders one thumb for a number value with correct aria', () => {
    const { thumbs } = render();
    expect(thumbs().length).toBe(1);
    expect(thumbs()[0].getAttribute('aria-valuenow')).toBe('50');
    expect(thumbs()[0].getAttribute('aria-valuemin')).toBe('0');
    expect(thumbs()[0].getAttribute('aria-valuemax')).toBe('100');
  });

  it('renders one thumb per array entry (range)', () => {
    const { fixture, host, thumbs } = render();
    host.value.set([20, 80]);
    fixture.detectChanges();
    expect(thumbs().length).toBe(2);
    expect(thumbs().map((t) => t.getAttribute('aria-valuenow'))).toEqual(['20', '80']);
  });

  it('increments/decrements by step with arrow keys and keeps a number shape', () => {
    const { fixture, host, thumbs } = render();
    key(thumbs()[0], 'ArrowRight');
    fixture.detectChanges();
    expect(host.value()).toBe(51);
    key(thumbs()[0], 'ArrowLeft');
    key(thumbs()[0], 'ArrowLeft');
    fixture.detectChanges();
    expect(host.value()).toBe(49);
  });

  it('honors step size when nudging', () => {
    const { fixture, host, thumbs } = render();
    host.step.set(10);
    fixture.detectChanges();
    key(thumbs()[0], 'ArrowUp');
    fixture.detectChanges();
    expect(host.value()).toBe(60);
  });

  it('jumps to min/max with Home/End and clamps', () => {
    const { fixture, host, thumbs } = render();
    key(thumbs()[0], 'End');
    fixture.detectChanges();
    expect(host.value()).toBe(100);
    key(thumbs()[0], 'ArrowRight');
    fixture.detectChanges();
    expect(host.value()).toBe(100);
    key(thumbs()[0], 'Home');
    fixture.detectChanges();
    expect(host.value()).toBe(0);
  });

  it('emits (hbChangeEnd) on keyboard commit', () => {
    const { fixture, host, thumbs } = render();
    key(thumbs()[0], 'ArrowRight');
    fixture.detectChanges();
    expect(host.ended()).toBe(51);
  });

  it('respects minStepsBetweenThumbs so thumbs cannot cross', () => {
    const { fixture, host, thumbs } = render();
    host.value.set([40, 45]);
    host.gap.set(5);
    fixture.detectChanges();
    for (let i = 0; i < 20; i++) key(thumbs()[0], 'ArrowRight');
    fixture.detectChanges();
    expect((host.value() as number[])[0]).toBe(40);
  });

  it('does not move when disabled', () => {
    const { fixture, host, thumbs } = render();
    host.disabled.set(true);
    fixture.detectChanges();
    key(thumbs()[0], 'ArrowRight');
    fixture.detectChanges();
    expect(host.value()).toBe(50);
    expect(thumbs()[0].getAttribute('tabindex')).toBe('-1');
  });

  it('reflects orientation on the host data attribute', () => {
    const { fixture, host } = render();
    host.orientation.set('vertical');
    fixture.detectChanges();
    const root = fixture.debugElement.query(By.directive(HbSliderComponent)).nativeElement;
    expect(root.getAttribute('data-orientation')).toBe('vertical');
  });
});

describe('HbSliderComponent forms', () => {
  @Component({
    imports: [HbSliderImports, ReactiveFormsModule],
    template: `<hb-slider [formControl]="control" />`,
  })
  class FormHost {
    readonly control = new FormControl<number | number[] | null>(30);
  }

  let fixture: ReturnType<typeof TestBed.createComponent<FormHost>>;
  beforeEach(() => {
    fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
  });

  it('writes the control value into the slider', () => {
    const thumb = fixture.nativeElement.querySelector('[role="slider"]') as HTMLElement;
    expect(thumb.getAttribute('aria-valuenow')).toBe('30');
  });

  it('pushes keyboard changes back to the control', () => {
    const thumb = fixture.nativeElement.querySelector('[role="slider"]') as HTMLElement;
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe(31);
  });

  it('disables via the control', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    const thumb = fixture.nativeElement.querySelector('[role="slider"]') as HTMLElement;
    expect(thumb.getAttribute('tabindex')).toBe('-1');
  });
});
