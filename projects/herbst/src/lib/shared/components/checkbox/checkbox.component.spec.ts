import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbCheckboxImports } from './checkbox.imports';

@Component({
  imports: [HbCheckboxImports],
  template: `
    <hb-checkbox
      [(hbChecked)]="checked"
      [hbIndeterminate]="indeterminate()"
      [hbInvalid]="invalid()"
      [hbDisabled]="disabled()"
      >Accept</hb-checkbox
    >
  `,
})
class Host {
  readonly checked = signal(false);
  readonly indeterminate = signal(false);
  readonly invalid = signal(false);
  readonly disabled = signal(false);
}

describe('HbCheckboxComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host, ReactiveFormsModule] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    const box = fixture.nativeElement.querySelector('[data-slot="checkbox"] span[data-state]') as HTMLElement;
    return { fixture, input, box };
  }

  it('toggles hbChecked and reflects data-state', () => {
    const { fixture, input, box } = render();
    expect(box.getAttribute('data-state')).toBe('unchecked');
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.checked()).toBe(true);
    expect(box.getAttribute('data-state')).toBe('checked');
  });

  it('shows the indeterminate state', () => {
    const { fixture, box } = render();
    fixture.componentInstance.indeterminate.set(true);
    fixture.detectChanges();
    expect(box.getAttribute('data-state')).toBe('indeterminate');
  });

  it('sets aria-invalid when invalid', () => {
    const { fixture, input } = render();
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables the native input', () => {
    const { fixture, input } = render();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
  });
});

@Component({
  imports: [HbCheckboxImports],
  template: `
    <hb-checkbox-group [(hbValue)]="value">
      <hb-checkbox [hbValue]="'a'">A</hb-checkbox>
      <hb-checkbox [hbValue]="'b'">B</hb-checkbox>
      <hb-checkbox [hbValue]="'c'">C</hb-checkbox>
    </hb-checkbox-group>
  `,
})
class GroupHost {
  readonly value = signal<unknown[]>(['b']);
}

describe('HbCheckboxGroupComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [GroupHost] }));

  it('derives checked state from the array and toggles within it', () => {
    const fixture = TestBed.createComponent(GroupHost);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll(
      'input[type="checkbox"]',
    ) as NodeListOf<HTMLInputElement>;
    expect(inputs[1].checked).toBe(true);
    expect(inputs[0].checked).toBe(false);
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['b', 'a']);
    inputs[1].checked = false;
    inputs[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['a']);
  });
});

@Component({
  imports: [HbCheckboxImports, ReactiveFormsModule],
  template: `<hb-checkbox [formControl]="control">Terms</hb-checkbox>`,
})
class FormHost {
  readonly control = new FormControl(false);
}

describe('HbCheckboxComponent + reactive forms', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [FormHost, ReactiveFormsModule] }));

  it('syncs with a FormControl in both directions', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input[type="checkbox"]') as HTMLInputElement;
    fixture.componentInstance.control.setValue(true);
    fixture.detectChanges();
    expect(input.checked).toBe(true);
    input.checked = false;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe(false);
  });
});
