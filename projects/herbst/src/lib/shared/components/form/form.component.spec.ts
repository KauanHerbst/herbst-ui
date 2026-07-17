import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbFormComponent } from './form.component';

@Component({
  imports: [HbFormComponent],
  template: `<form hb-form><input /></form>`,
})
class Host {}

describe('HbFormComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  it('applies the form layout class', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('[data-slot="form"]') as HTMLElement;
    expect(form.tagName).toBe('FORM');
    expect(form.className).toContain('gap-6');
  });
});
