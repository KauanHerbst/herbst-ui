import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbSelectImports } from './select.imports';

@Component({
  imports: [HbSelectImports],
  template: `
    <hb-select [(hbValue)]="value" hbPlaceholder="Pick a fruit" hbClearable>
      <hb-select-item [hbValue]="'apple'">Apple</hb-select-item>
      <hb-select-group>
        <hb-select-label>Citrus</hb-select-label>
        <hb-select-item [hbValue]="'orange'">Orange</hb-select-item>
      </hb-select-group>
    </hb-select>
  `,
})
class Host {
  readonly value = signal<unknown>(null);
}

describe('HbSelectComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    return { fixture, trigger };
  }

  it('shows the placeholder when empty', () => {
    const { trigger } = render();
    expect(trigger.textContent).toContain('Pick a fruit');
  });

  it('opens the listbox on trigger click', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    expect(overlay.querySelector('[role="listbox"]')).toBeTruthy();
    expect(overlay.textContent).toContain('Apple');
    expect(overlay.textContent).toContain('Citrus');
  });

  it('selects an option, updates the value and closes', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    const options = overlay.querySelectorAll('[role="option"]');
    (options[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('orange');
    expect(overlay.querySelector('[role="listbox"]')).toBeFalsy();
    expect(trigger.textContent).toContain('Orange');
  });

  it('clears the value', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.value.set('apple');
    fixture.detectChanges();
    const clear = trigger.querySelector('[aria-label="Clear"]') as HTMLElement;
    expect(clear).toBeTruthy();
    clear.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBeNull();
    expect(trigger.textContent).toContain('Pick a fruit');
  });
});

@Component({
  imports: [HbSelectImports, ReactiveFormsModule],
  template: `
    <hb-select [formControl]="control">
      <hb-select-item [hbValue]="'a'">A</hb-select-item>
      <hb-select-item [hbValue]="'b'">B</hb-select-item>
    </hb-select>
  `,
})
class FormHost {
  readonly control = new FormControl('a');
}

describe('HbSelectComponent + reactive forms', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [FormHost, ReactiveFormsModule] }));

  it('reflects a FormControl value in the trigger', () => {
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(trigger.textContent).toContain('A');
    fixture.componentInstance.control.setValue('b');
    fixture.detectChanges();
    expect(trigger.textContent).toContain('B');
  });
});

@Component({
  imports: [HbSelectImports],
  template: `
    <hb-select [(hbValue)]="value" hbMultiple hbSelectAll hbFilter>
      <hb-select-item [hbValue]="'apple'">Apple</hb-select-item>
      <hb-select-item [hbValue]="'banana'">Banana</hb-select-item>
      <hb-select-item [hbValue]="'cherry'">Cherry</hb-select-item>
    </hb-select>
  `,
})
class MultiHost {
  readonly value = signal<unknown[]>([]);
}

describe('HbSelectComponent (multiple + filter)', () => {
  let overlay: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MultiHost] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });
  function open() {
    const fixture = TestBed.createComponent(MultiHost);
    fixture.detectChanges();
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
    return fixture;
  }

  it('toggles multiple values without closing', () => {
    const fixture = open();
    const options = overlay.querySelectorAll('[role="option"]');
    (options[1] as HTMLElement).click();
    fixture.detectChanges();
    (options[3] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['apple', 'cherry']);
    expect(overlay.querySelector('[role="listbox"]')).toBeTruthy();
  });

  it('selects all with the header row', () => {
    const fixture = open();
    const selectAll = overlay.querySelector('[role="option"]') as HTMLElement;
    expect(selectAll.textContent).toContain('Select all');
    selectAll.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['apple', 'banana', 'cherry']);
  });

  it('filters items by the search box', () => {
    const fixture = open();
    const input = overlay.querySelector('input') as HTMLInputElement;
    input.value = 'ban';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const visible = Array.from(
      overlay.querySelectorAll('[data-slot="select-item"]'),
    ).filter((el) => (el as HTMLElement).style.display !== 'none');
    expect(visible.length).toBe(1);
    expect(visible[0].textContent).toContain('Banana');
  });
});

@Component({
  imports: [HbSelectImports],
  template: `
    <hb-select [(hbValue)]="value" hbMultiple [hbMaxChips]="2">
      <hb-select-item [hbValue]="'a'">Alpha</hb-select-item>
      <hb-select-item [hbValue]="'b'">Beta</hb-select-item>
      <hb-select-item [hbValue]="'c'">Gamma</hb-select-item>
      <hb-select-item [hbValue]="'d'">Delta</hb-select-item>
    </hb-select>
  `,
})
class ChipsHost {
  readonly value = signal<unknown[]>(['a', 'b', 'c', 'd']);
}

describe('HbSelectComponent (chip overflow)', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [ChipsHost] }));

  it('caps visible chips at hbMaxChips and shows a +N overflow badge', () => {
    const fixture = TestBed.createComponent(ChipsHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(trigger.textContent).toContain('Alpha');
    expect(trigger.textContent).toContain('Beta');
    expect(trigger.textContent).not.toContain('Gamma');
    expect(trigger.textContent).toContain('+2');
  });
});

@Component({
  imports: [HbSelectImports],
  template: `
    <hb-select
      [(hbValue)]="value"
      [hbOptions]="options"
      hbFilter
      hbFilterMatchMode="startsWith"
      [hbLoading]="loading()"
      [hbReadonly]="readonly()"
      hbEmptyMessage="Nothing here"
    >
      <ng-template hbSelectValue let-v let-label="label">custom:{{ label }}</ng-template>
    </hb-select>
  `,
})
class FeatureHost {
  readonly value = signal<unknown>(null);
  readonly loading = signal(false);
  readonly readonly = signal(false);
  readonly options = [
    { value: 'apple', label: 'Apple' },
    { value: 'apricot', label: 'Apricot' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry', disabled: true },
  ];
}

describe('HbSelectComponent (data mode + features)', () => {
  let overlay: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [FeatureHost] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });
  function render() {
    const fixture = TestBed.createComponent(FeatureHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    return { fixture, trigger };
  }
  function open() {
    const r = render();
    r.trigger.click();
    r.fixture.detectChanges();
    return r;
  }

  it('renders data-driven options and selects one', () => {
    const { fixture } = open();
    const options = overlay.querySelectorAll('[role="option"]');
    expect(options.length).toBe(4);
    (options[2] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('banana');
  });

  it('filters with startsWith match mode', () => {
    const { fixture } = open();
    const input = overlay.querySelector('input') as HTMLInputElement;
    input.value = 'ap';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const visible = Array.from(overlay.querySelectorAll('[role="option"]'));
    expect(visible.length).toBe(2);
    expect(overlay.textContent).toContain('Apple');
    expect(overlay.textContent).toContain('Apricot');
    expect(overlay.textContent).not.toContain('Banana');
  });

  it('shows the empty message when nothing matches', () => {
    const { fixture } = open();
    const input = overlay.querySelector('input') as HTMLInputElement;
    input.value = 'zzz';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(overlay.textContent).toContain('Nothing here');
  });

  it('renders the custom value template in the trigger', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.value.set('apple');
    fixture.detectChanges();
    expect(trigger.textContent).toContain('custom:Apple');
  });

  it('does not open when readonly', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.readonly.set(true);
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    expect(overlay.querySelector('[role="listbox"]')).toBeFalsy();
  });

  it('shows a loading state in the panel', () => {
    const { fixture } = render();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();
    fixture.detectChanges();
    expect(overlay.textContent).toContain('Loading');
    expect(overlay.querySelectorAll('[role="option"]').length).toBe(0);
  });
});
