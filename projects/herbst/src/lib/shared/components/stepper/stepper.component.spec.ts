import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbStepperImports } from './stepper.imports';
import type { HbStepperOrientation } from './stepper.token';

@Component({
  imports: [HbStepperImports],
  template: `
    <hb-stepper [(hbValue)]="active" [hbOrientation]="orientation()" [hbLinear]="linear()">
      <hb-step hbTitle="Account" [hbValue]="1">
        <ng-template hbStepContent let-ctx>
          <p data-slot="panel-1">Account panel</p>
          <button type="button" data-slot="next" (click)="ctx.next()">Next</button>
        </ng-template>
      </hb-step>
      <hb-step hbTitle="Profile" [hbValue]="2">
        <ng-template hbStepContent>
          <p data-slot="panel-2">Profile panel</p>
        </ng-template>
      </hb-step>
      <hb-step hbTitle="Done" [hbValue]="3" />
    </hb-stepper>
  `,
})
class Host {
  readonly active = signal<number | string>(1);
  readonly orientation = signal<HbStepperOrientation>('horizontal');
  readonly linear = signal(false);
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  const all = (sel: string) =>
    fixture.debugElement.queryAll(By.css(sel)).map((d) => d.nativeElement as HTMLElement);
  return { fixture, host: fixture.componentInstance, el, all };
}

describe('HbStepperComponent', () => {
  it('renders one step and marker per hb-step, numbering inactive markers', () => {
    const { all } = render();
    expect(all('[data-slot="step"]').length).toBe(3);
    const markers = all('[data-slot="step-marker"]');
    expect(markers.length).toBe(3);
    expect(markers[1].textContent?.trim()).toBe('2');
  });

  it('marks the active step and shows its content below (horizontal)', () => {
    const { el } = render();
    expect(el('[data-slot="step-marker"]').getAttribute('data-state')).toBe('active');
    expect(el('[data-slot="stepper-content"]').textContent).toContain('Account panel');
  });

  it('activates a step on marker click (non-linear)', () => {
    const { fixture, host, all } = render();
    all('[data-slot="step-trigger"]')[2].click();
    fixture.detectChanges();
    expect(host.active()).toBe(3);
  });

  it('marks earlier steps as completed with a check icon', () => {
    const { fixture, host, all } = render();
    host.active.set(2);
    fixture.detectChanges();
    const markers = all('[data-slot="step-marker"]');
    expect(markers[0].getAttribute('data-state')).toBe('completed');
    expect(markers[1].getAttribute('data-state')).toBe('active');
    expect(markers[2].getAttribute('data-state')).toBe('inactive');
    expect(markers[0].querySelector('ng-icon')).toBeTruthy();
  });

  it('blocks forward navigation in linear mode but allows the ctx.next() button', () => {
    const { fixture, host, all, el } = render();
    host.linear.set(true);
    fixture.detectChanges();
    expect((all('[data-slot="step-trigger"]')[2] as HTMLButtonElement).disabled).toBe(true);
    all('[data-slot="step-trigger"]')[2].click();
    fixture.detectChanges();
    expect(host.active()).toBe(1);
    el('[data-slot="next"]').click();
    fixture.detectChanges();
    expect(host.active()).toBe(2);
  });

  it('renders inline content in vertical orientation', () => {
    const { fixture, all, el } = render();
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(el('[data-slot="stepper"]').getAttribute('data-orientation')).toBe('vertical');
    expect(el('[data-slot="stepper-content"]')).toBeFalsy();
    expect(all('[data-slot="step-content"]').length).toBe(1);
    expect(all('[data-slot="step-content"]')[0].textContent).toContain('Account panel');
  });
});
