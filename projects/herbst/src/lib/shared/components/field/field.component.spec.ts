import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbFieldImports } from './field.imports';
import type { HbFieldColumns, HbFieldOrientation } from './field.variants';

@Component({
  imports: [HbFieldImports],
  template: `
    <hb-field-group [hbColumns]="columns()">
      <hb-field [hbOrientation]="orientation()" [hbInvalid]="invalid()">
        <label hb-field-label [hbRequired]="required()">Email</label>
        <hb-field-description>Your email.</hb-field-description>
        <hb-field-error [hbErrors]="errors()">fallback</hb-field-error>
      </hb-field>
    </hb-field-group>
  `,
})
class Host {
  readonly orientation = signal<HbFieldOrientation>('vertical');
  readonly invalid = signal(false);
  readonly required = signal(false);
  readonly columns = signal<HbFieldColumns>(1);
  readonly errors = signal<string[]>([]);
}

describe('Field family', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const q = (slot: string) =>
      fixture.nativeElement.querySelector(`[data-slot="${slot}"]`) as HTMLElement;
    return { fixture, q };
  }

  it('shows a required asterisk on the label', () => {
    const { fixture, q } = render();
    expect(q('field-label').textContent).not.toContain('*');
    fixture.componentInstance.required.set(true);
    fixture.detectChanges();
    expect(q('field-label').textContent).toContain('*');
  });

  it('applies the horizontal orientation', () => {
    const { fixture, q } = render();
    fixture.componentInstance.orientation.set('horizontal');
    fixture.detectChanges();
    expect(q('field').className).toContain('flex-row');
  });

  it('renders errors passed as an array', () => {
    const { fixture, q } = render();
    fixture.componentInstance.errors.set(['Email is required']);
    fixture.detectChanges();
    expect(q('field-error').textContent).toContain('Email is required');
  });

  it('lays out the group as a grid with columns', () => {
    const { fixture, q } = render();
    fixture.componentInstance.columns.set(2);
    fixture.detectChanges();
    expect(q('field-group').className).toContain('grid');
  });
});
