import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbToggleComponent } from './toggle.component';
import { HbToggleImports } from './toggle.imports';
import type { HbToggleGroupType } from './toggle.variants';

describe('HbToggleComponent (standalone)', () => {
  @Component({
    imports: [HbToggleImports],
    template: `
      <hb-toggle [(hbPressed)]="pressed" [hbDisabled]="disabled()" (hbChange)="changed.set($event)">
        Bold
      </hb-toggle>
    `,
  })
  class Host {
    readonly pressed = signal(false);
    readonly disabled = signal(false);
    readonly changed = signal<boolean | null>(null);
  }

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.debugElement.query(By.directive(HbToggleComponent))
      .nativeElement as HTMLElement;
    return { fixture, host: fixture.componentInstance, el };
  }

  it('toggles pressed on click and reflects aria-pressed/data-state', () => {
    const { fixture, host, el } = render();
    expect(el.getAttribute('aria-pressed')).toBe('false');
    el.click();
    fixture.detectChanges();
    expect(host.pressed()).toBe(true);
    expect(host.changed()).toBe(true);
    expect(el.getAttribute('aria-pressed')).toBe('true');
    expect(el.getAttribute('data-state')).toBe('on');
  });

  it('does not toggle when disabled', () => {
    const { fixture, host, el } = render();
    host.disabled.set(true);
    fixture.detectChanges();
    el.click();
    fixture.detectChanges();
    expect(host.pressed()).toBe(false);
    expect(el.getAttribute('tabindex')).toBe('-1');
  });

  it('toggles with the keyboard (Space)', () => {
    const { fixture, host, el } = render();
    el.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    fixture.detectChanges();
    expect(host.pressed()).toBe(true);
  });
});

describe('HbToggleGroupComponent', () => {
  @Component({
    imports: [HbToggleImports],
    template: `
      <hb-toggle-group
        [hbType]="type()"
        [(hbValue)]="value"
        [hbRollable]="rollable()"
        hbVariant="outline"
        hbSize="lg"
        (hbChange)="changed.set($event)"
      >
        <hb-toggle hbValue="left">L</hb-toggle>
        <hb-toggle hbValue="center">C</hb-toggle>
        <hb-toggle hbValue="right">R</hb-toggle>
      </hb-toggle-group>
    `,
  })
  class Host {
    readonly type = signal<HbToggleGroupType>('single');
    readonly value = signal<unknown>(null);
    readonly rollable = signal(true);
    readonly changed = signal<unknown>(null);
  }

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const toggles = () =>
      Array.from(fixture.nativeElement.querySelectorAll('[data-slot="toggle"]')) as HTMLElement[];
    return { fixture, host: fixture.componentInstance, toggles };
  }

  it('single: selects one value and deselects on re-click when rollable', () => {
    const { fixture, host, toggles } = render();
    toggles()[1].click();
    fixture.detectChanges();
    expect(host.value()).toBe('center');
    expect(toggles()[1].getAttribute('data-state')).toBe('on');
    toggles()[1].click();
    fixture.detectChanges();
    expect(host.value()).toBeNull();
  });

  it('single: keeps the value on re-click when not rollable', () => {
    const { fixture, host, toggles } = render();
    host.rollable.set(false);
    fixture.detectChanges();
    toggles()[0].click();
    toggles()[0].click();
    fixture.detectChanges();
    expect(host.value()).toBe('left');
  });

  it('multiple: accumulates selected values', () => {
    const { fixture, host, toggles } = render();
    host.type.set('multiple');
    host.value.set([]);
    fixture.detectChanges();
    toggles()[0].click();
    toggles()[2].click();
    fixture.detectChanges();
    expect(host.value()).toEqual(['left', 'right']);
    toggles()[0].click();
    fixture.detectChanges();
    expect(host.value()).toEqual(['right']);
  });

  it('propagates variant/size to items', () => {
    const { toggles } = render();
    expect(toggles()[0].className).toContain('border-input');
    expect(toggles()[0].className).toContain('h-10');
  });

  it('moves focus between items with ArrowRight', () => {
    const { toggles } = render();
    toggles()[0].focus();
    toggles()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    expect(document.activeElement).toBe(toggles()[1]);
  });
});

describe('HbToggleGroupComponent forms', () => {
  @Component({
    imports: [HbToggleImports, ReactiveFormsModule],
    template: `
      <hb-toggle-group [formControl]="control" hbType="single">
        <hb-toggle hbValue="a">A</hb-toggle>
        <hb-toggle hbValue="b">B</hb-toggle>
      </hb-toggle-group>
    `,
  })
  class FormHost {
    readonly control = new FormControl<unknown>('a');
  }

  let fixture: ReturnType<typeof TestBed.createComponent<FormHost>>;
  beforeEach(() => {
    fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
  });

  it('writes the control value into the group', () => {
    const toggles = fixture.nativeElement.querySelectorAll('[data-slot="toggle"]');
    expect(toggles[0].getAttribute('data-state')).toBe('on');
  });

  it('pushes clicks back to the control', () => {
    const toggles = fixture.nativeElement.querySelectorAll('[data-slot="toggle"]');
    (toggles[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.control.value).toBe('b');
  });
});
