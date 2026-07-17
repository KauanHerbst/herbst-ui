import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbInputDirective } from './input.directive';
import type { HbInputSize, HbInputStatus } from './input.variants';

@Component({
  imports: [HbInputDirective],
  template: `
    <input
      hb-input
      [hbSize]="size()"
      [hbStatus]="status()"
      [hbInvalid]="invalid()"
      [hbBorderless]="borderless()"
      [hbRing]="ring()"
      [hbFluid]="fluid()"
    />
  `,
})
class Host {
  readonly size = signal<HbInputSize>('md');
  readonly status = signal<HbInputStatus>('default');
  readonly invalid = signal(false);
  readonly borderless = signal(false);
  readonly ring = signal(true);
  readonly fluid = signal(false);
}

describe('HbInputDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = () => fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, input };
  }

  it('applies the size class', () => {
    const { fixture, input } = render();
    expect(input().className).toContain('h-9');
    fixture.componentInstance.size.set('lg');
    fixture.detectChanges();
    expect(input().className).toContain('h-10');
  });

  it('applies the error status', () => {
    const { fixture, input } = render();
    fixture.componentInstance.status.set('error');
    fixture.detectChanges();
    expect(input().className).toContain('border-destructive');
  });

  it('sets aria-invalid when invalid', () => {
    const { fixture, input } = render();
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    expect(input().getAttribute('aria-invalid')).toBe('true');
  });

  it('removes the border when borderless', () => {
    const { fixture, input } = render();
    fixture.componentInstance.borderless.set(true);
    fixture.detectChanges();
    expect(input().className).toContain('border-0');
  });

  it('takes full width when fluid', () => {
    const { fixture, input } = render();
    fixture.componentInstance.fluid.set(true);
    fixture.detectChanges();
    expect(input().className).toContain('w-full');
  });

  it('removes the focus ring but keeps the border when hbRing is false', () => {
    const { fixture, input } = render();
    expect(input().className).toContain('focus-visible:ring-[3px]');
    fixture.componentInstance.ring.set(false);
    fixture.detectChanges();
    expect(input().className).toContain('focus-visible:ring-0');
    expect(input().className).toContain('focus-visible:border-ring');
  });

  it('vertically centers file inputs with flex (native buttons top-align)', () => {
    @Component({
      imports: [HbInputDirective],
      template: `<input hb-input type="file" /><input hb-input type="text" />`,
    })
    class FileHost {}
    const fixture = TestBed.createComponent(FileHost);
    fixture.detectChanges();
    const [file, text] = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    expect(file.className).toContain('flex');
    expect(file.className).toContain('items-center');
    expect(text.className).not.toContain('items-center');
  });

});
