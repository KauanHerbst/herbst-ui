import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbSwitchComponent } from './switch.component';
import { HbSwitchImports } from './switch.imports';
import type { HbSwitchStatus } from './switch.variants';

@Component({
  imports: [HbSwitchImports],
  template: `
    <hb-switch
      [(hbChecked)]="checked"
      [hbStatus]="status()"
      [hbDisabled]="disabled()"
      [hbInvalid]="invalid()"
      (hbChange)="changed.set($event)"
    >
      Airplane mode
    </hb-switch>
  `,
})
class Host {
  readonly checked = signal(false);
  readonly status = signal<HbSwitchStatus>('default');
  readonly disabled = signal(false);
  readonly invalid = signal(false);
  readonly changed = signal<boolean | null>(null);
}

describe('HbSwitchComponent', () => {
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const debug = fixture.debugElement.query(By.directive(HbSwitchComponent));
    const input = debug.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, host: fixture.componentInstance, debug, input };
  }
  const trackOf = (root: HTMLElement) =>
    root.querySelector('span[aria-hidden="true"]') as HTMLElement;

  it('renders an unchecked switch with role=switch', () => {
    const { input, debug } = render();
    expect(input.getAttribute('role')).toBe('switch');
    expect(input.checked).toBe(false);
    expect(trackOf(debug.nativeElement).getAttribute('data-state')).toBe('unchecked');
  });

  it('toggles via the native input and syncs [(hbChecked)] + (hbChange)', () => {
    const { fixture, host, input } = render();
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(host.checked()).toBe(true);
    expect(host.changed()).toBe(true);
    expect(trackOf(fixture.nativeElement).getAttribute('data-state')).toBe('checked');
  });

  it('does not toggle when disabled', () => {
    const { fixture, host, input } = render();
    host.disabled.set(true);
    fixture.detectChanges();
    expect(input.disabled).toBe(true);
    expect(host.checked()).toBe(false);
  });

  it('reflects hbStatus color class on the track when checked', () => {
    const { fixture, host } = render();
    host.checked.set(true);
    host.status.set('success');
    fixture.detectChanges();
    expect(trackOf(fixture.nativeElement).className).toContain('data-[state=checked]:bg-success');
  });

  it('marks aria-invalid when hbInvalid', () => {
    const { fixture, host, input } = render();
    host.invalid.set(true);
    fixture.detectChanges();
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });
});

describe('HbSwitchCardComponent', () => {
  @Component({
    imports: [HbSwitchImports],
    template: `
      <hb-switch-card [(hbChecked)]="on" [hbIndicator]="indicator()">
        <span>Enable notifications</span>
      </hb-switch-card>
    `,
  })
  class CardHost {
    readonly on = signal(true);
    readonly indicator = signal(true);
  }

  it('renders the card with checked state and an indicator switch', () => {
    const fixture = TestBed.createComponent(CardHost);
    fixture.detectChanges();
    const label = fixture.nativeElement.querySelector('label') as HTMLElement;
    expect(label.getAttribute('data-state')).toBe('checked');
    expect(fixture.nativeElement.textContent).toContain('Enable notifications');
    expect(fixture.nativeElement.querySelector('span[aria-hidden="true"]')).toBeTruthy();
  });

  it('hides the indicator when hbIndicator is false', () => {
    const fixture = TestBed.createComponent(CardHost);
    fixture.componentInstance.indicator.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('span[aria-hidden="true"]')).toBeNull();
  });
});

describe('HbSwitchComponent forms', () => {
  @Component({
    imports: [HbSwitchImports, ReactiveFormsModule],
    template: `<hb-switch [formControl]="control">Wifi</hb-switch>`,
  })
  class FormHost {
    readonly control = new FormControl<boolean>(true, { nonNullable: true });
  }

  let fixture: ReturnType<typeof TestBed.createComponent<FormHost>>;
  beforeEach(() => {
    fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
  });

  it('writes the control value into the switch', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('pushes changes back to the control', () => {
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = false;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe(false);
  });

  it('disables via the control', () => {
    fixture.componentInstance.control.disable();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });
});
