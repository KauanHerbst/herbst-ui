import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbRadioImports } from './radio.imports';

@Component({
  imports: [HbRadioImports],
  template: `
    <hb-radio-group [(hbValue)]="value" [hbDisabled]="disabled()" [hbInvalid]="invalid()">
      <hb-radio [hbValue]="'a'">A</hb-radio>
      <hb-radio [hbValue]="'b'">B</hb-radio>
      <hb-radio [hbValue]="'c'">C</hb-radio>
    </hb-radio-group>
  `,
})
class Host {
  readonly value = signal<unknown>('a');
  readonly disabled = signal(false);
  readonly invalid = signal(false);
}

describe('HbRadioGroupComponent + HbRadioComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    return { fixture, inputs };
  }

  it('derives checked from the single group value and selects on change', () => {
    const { fixture, inputs } = render();
    expect(inputs[0].checked).toBe(true);
    expect(inputs[1].checked).toBe(false);
    inputs[1].checked = true;
    inputs[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('b');
    expect(inputs[0].checked).toBe(false);
    expect(inputs[1].checked).toBe(true);
  });

  it('shares one name across the group (native radio semantics)', () => {
    const { inputs } = render();
    expect(inputs[0].name).toBeTruthy();
    expect(inputs[0].name).toBe(inputs[1].name);
    expect(inputs[1].name).toBe(inputs[2].name);
  });

  it('cascades disabled and invalid from the group', () => {
    const { fixture, inputs } = render();
    fixture.componentInstance.disabled.set(true);
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    expect(inputs[0].disabled).toBe(true);
    expect(inputs[0].getAttribute('aria-invalid')).toBe('true');
  });
});

@Component({
  imports: [HbRadioImports],
  template: `
    <hb-radio-group [(hbValue)]="value">
      <hb-radio-card [hbValue]="'k8s'">Kubernetes</hb-radio-card>
      <hb-radio-card [hbValue]="'vm'">Virtual Machine</hb-radio-card>
    </hb-radio-group>
  `,
})
class CardHost {
  readonly value = signal<unknown>('k8s');
}

describe('HbRadioCardComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [CardHost] }));

  it('marks the selected card with data-state=checked', () => {
    const fixture = TestBed.createComponent(CardHost);
    fixture.detectChanges();
    const cards = fixture.nativeElement.querySelectorAll('[data-slot="radio-card"] label');
    expect(cards[0].getAttribute('data-state')).toBe('checked');
    expect(cards[1].getAttribute('data-state')).toBe('unchecked');
  });
});

@Component({
  imports: [HbRadioImports, ReactiveFormsModule],
  template: `
    <hb-radio-group [formControl]="control">
      <hb-radio [hbValue]="'x'">X</hb-radio>
      <hb-radio [hbValue]="'y'">Y</hb-radio>
    </hb-radio-group>
  `,
})
class FormHost {
  readonly control = new FormControl('x');
}

describe('HbRadioGroupComponent + reactive forms', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [FormHost, ReactiveFormsModule] }));

  it('syncs with a FormControl in both directions', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const inputs = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]',
    ) as NodeListOf<HTMLInputElement>;
    fixture.componentInstance.control.setValue('y');
    fixture.detectChanges();
    expect(inputs[1].checked).toBe(true);
    inputs[0].checked = true;
    inputs[0].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('x');
  });
});
