import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbButtonComponent } from './button.component';
import type { HbButtonType } from './button.variants';

@Component({
  imports: [HbButtonComponent],
  template: `<button hb-button [hbType]="type()" [hbLoading]="loading()">Ok</button>`,
})
class Host {
  readonly type = signal<HbButtonType>('default');
  readonly loading = signal(false);
}

describe('HbButtonComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture;
  }

  it('applies the default variant', () => {
    const fixture = render();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('bg-primary');
  });

  it('switches to the destructive variant', () => {
    const fixture = render();
    fixture.componentInstance.type.set('destructive');
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.className).toContain('bg-destructive');
  });

  it('shows the spinner when hbLoading is true', () => {
    const fixture = render();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('ng-icon')).not.toBeNull();
  });

  it('is not disabled by default', () => {
    const fixture = render();
    const btn = fixture.nativeElement.querySelector('button');
    expect(btn.hasAttribute('disabled')).toBe(false);
  });
});
