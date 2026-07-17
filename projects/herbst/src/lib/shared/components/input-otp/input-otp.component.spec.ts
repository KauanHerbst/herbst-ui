import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbInputOtpImports } from './input-otp.imports';

@Component({
  imports: [HbInputOtpImports],
  template: `
    <hb-input-otp
      [hbMaxLength]="6"
      [hbPattern]="pattern()"
      [(hbValue)]="value"
      [hbDisabled]="disabled()"
      [hbInvalid]="invalid()"
      (hbComplete)="completed = $event"
    >
      <hb-input-otp-group>
        <hb-input-otp-slot [hbIndex]="0" />
        <hb-input-otp-slot [hbIndex]="1" />
        <hb-input-otp-slot [hbIndex]="2" />
      </hb-input-otp-group>
      <hb-input-otp-separator />
      <hb-input-otp-group>
        <hb-input-otp-slot [hbIndex]="3" />
        <hb-input-otp-slot [hbIndex]="4" />
        <hb-input-otp-slot [hbIndex]="5" />
      </hb-input-otp-group>
    </hb-input-otp>
  `,
})
class Host {
  readonly value = signal('');
  readonly pattern = signal<'digits' | 'chars' | 'alphanumeric'>('digits');
  readonly disabled = signal(false);
  readonly invalid = signal(false);
  completed = '';
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
  const type = (v: string) => {
    input.value = v;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  };
  return { fixture, host: fixture.componentInstance, input, type };
}

describe('HbInputOtpComponent', () => {
  it('renders one slot per index plus a separator', () => {
    const { fixture } = render();
    expect(fixture.debugElement.queryAll(By.css('hb-input-otp-slot')).length).toBe(6);
    expect(fixture.debugElement.queryAll(By.css('hb-input-otp-separator')).length).toBe(1);
  });

  it('two-way binds the value and fills the slots', () => {
    const { fixture, host, type } = render();
    type('123');
    expect(host.value()).toBe('123');
    const slots = fixture.debugElement.queryAll(By.css('hb-input-otp-slot'));
    expect(slots[0].nativeElement.textContent.trim()).toBe('1');
    expect(slots[2].nativeElement.textContent.trim()).toBe('3');
  });

  it('rejects characters that do not match the digits pattern', () => {
    const { host, input, type } = render();
    type('12a3');
    expect(host.value()).toBe('123');
    expect(input.value).toBe('123');
  });

  it('accepts letters when the pattern is alphanumeric', () => {
    const { fixture, host, type } = render();
    fixture.componentInstance.pattern.set('alphanumeric');
    fixture.detectChanges();
    type('1a2b');
    expect(host.value()).toBe('1a2b');
  });

  it('clamps the value to hbMaxLength', () => {
    const { host, type } = render();
    type('1234567890');
    expect(host.value()).toBe('123456');
  });

  it('emits hbComplete when the value reaches maxLength', () => {
    const { host, type } = render();
    type('12345');
    expect(host.completed).toBe('');
    type('123456');
    expect(host.completed).toBe('123456');
  });

  it('disables the native input and marks slots disabled', () => {
    const { fixture, input } = render();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
    const slot = fixture.debugElement.query(By.css('hb-input-otp-slot')).nativeElement;
    expect(slot.getAttribute('data-disabled')).toBe('true');
  });

  it('reflects the invalid state via aria-invalid and slot data-status', () => {
    const { fixture, input } = render();
    fixture.componentInstance.invalid.set(true);
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
    const slot = fixture.debugElement.query(By.css('hb-input-otp-slot')).nativeElement;
    expect(slot.getAttribute('data-status')).toBe('error');
  });
});

@Component({
  imports: [HbInputOtpImports, ReactiveFormsModule],
  template: `
    <hb-input-otp [formControl]="control" [hbMaxLength]="4">
      <hb-input-otp-group>
        <hb-input-otp-slot [hbIndex]="0" />
        <hb-input-otp-slot [hbIndex]="1" />
        <hb-input-otp-slot [hbIndex]="2" />
        <hb-input-otp-slot [hbIndex]="3" />
      </hb-input-otp-group>
    </hb-input-otp>
  `,
})
class FormHost {
  readonly control = new FormControl('');
}

describe('HbInputOtpComponent + Reactive Forms', () => {
  it('writes the control value into the slots and reads user input back', () => {
    TestBed.configureTestingModule({ imports: [FormHost] });
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const host = fixture.componentInstance;

    host.control.setValue('12');
    fixture.detectChanges();
    const slots = fixture.debugElement.queryAll(By.css('hb-input-otp-slot'));
    expect(slots[0].nativeElement.textContent.trim()).toBe('1');

    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    input.value = '1234';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(host.control.value).toBe('1234');
  });

  it('applies setDisabledState from the control', () => {
    TestBed.configureTestingModule({ imports: [FormHost] });
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
