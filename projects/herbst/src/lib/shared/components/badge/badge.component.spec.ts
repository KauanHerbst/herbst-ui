import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbBadgeComponent } from './badge.component';
import type { HbBadgeShape, HbBadgeType } from './badge.variants';

@Component({
  imports: [HbBadgeComponent],
  template: `<span hb-badge [hbType]="type()" [hbShape]="shape()">Label</span>`,
})
class Host {
  readonly type = signal<HbBadgeType>('default');
  readonly shape = signal<HbBadgeShape>('pill');
}

describe('HbBadgeComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = () => fixture.nativeElement.querySelector('[data-slot="badge"]') as HTMLElement;
    return { fixture, el };
  }

  it('renders its content', () => {
    const { el } = render();
    expect(el().textContent).toContain('Label');
  });

  it('applies the type color', () => {
    const { fixture, el } = render();
    fixture.componentInstance.type.set('destructive');
    fixture.detectChanges();
    expect(el().className).toContain('bg-destructive');
  });

  it('applies the shape', () => {
    const { fixture, el } = render();
    fixture.componentInstance.shape.set('square');
    fixture.detectChanges();
    expect(el().className).toContain('rounded-none');
  });
});
