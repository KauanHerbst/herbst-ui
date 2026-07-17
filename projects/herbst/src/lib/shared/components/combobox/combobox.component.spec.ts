import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbComboboxImports } from './combobox.imports';

@Component({
  imports: [HbComboboxImports],
  template: `
    <hb-combobox [(hbValue)]="value" hbClearable [hbDebounce]="0">
      <hb-combobox-item [hbValue]="'next'">Next.js</hb-combobox-item>
      <hb-combobox-item [hbValue]="'nuxt'">Nuxt</hb-combobox-item>
      <hb-combobox-item [hbValue]="'remix'">Remix</hb-combobox-item>
    </hb-combobox>
  `,
})
class Host {
  readonly value = signal<unknown>(null);
}

describe('HbComboboxComponent', () => {
  let overlay: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });
  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    return { fixture, input };
  }
  function type(input: HTMLInputElement, text: string) {
    input.value = text;
    input.dispatchEvent(new Event('input'));
  }

  it('opens the list on focus', () => {
    const { fixture, input } = render();
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(overlay.querySelector('[role="listbox"]')).toBeTruthy();
    expect(overlay.textContent).toContain('Next.js');
  });

  it('filters options as you type', () => {
    const { fixture, input } = render();
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    type(input, 'nu');
    fixture.detectChanges();
    const visible = Array.from(overlay.querySelectorAll('[data-slot="combobox-item"]')).filter(
      (el) => (el as HTMLElement).style.display !== 'none',
    );
    expect(visible.length).toBe(1);
    expect(visible[0].textContent).toContain('Nuxt');
  });

  it('selects an option, sets value and reflects the label in the input', () => {
    const { fixture, input } = render();
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    const option = overlay.querySelectorAll('[role="option"]')[2] as HTMLElement;
    option.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toBe('remix');
    expect(input.value).toBe('Remix');
  });

  it('reflects a FormControl value in the input', () => {
    @Component({
      imports: [HbComboboxImports, ReactiveFormsModule],
      template: `
        <hb-combobox [formControl]="control">
          <hb-combobox-item [hbValue]="'a'">Alpha</hb-combobox-item>
          <hb-combobox-item [hbValue]="'b'">Beta</hb-combobox-item>
        </hb-combobox>
      `,
    })
    class FormHost {
      readonly control = new FormControl('b');
    }
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ imports: [FormHost, ReactiveFormsModule] });
    const fixture = TestBed.createComponent(FormHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.value).toBe('Beta');
  });
});

@Component({
  imports: [HbComboboxImports],
  template: `
    <hb-combobox [(hbValue)]="value" hbMultiple hbAllowCustom>
      <hb-combobox-item [hbValue]="'a'">Alpha</hb-combobox-item>
      <hb-combobox-item [hbValue]="'b'">Beta</hb-combobox-item>
    </hb-combobox>
  `,
})
class MultiHost {
  readonly value = signal<unknown[]>([]);
}

describe('HbComboboxComponent (multiple tag input + creatable)', () => {
  let overlay: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [MultiHost] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  it('adds chips from the list and stays open', () => {
    const fixture = TestBed.createComponent(MultiHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    (overlay.querySelectorAll('[role="option"]')[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['a']);
    expect(overlay.querySelector('[role="listbox"]')).toBeTruthy();
  });

  it('creates a custom value on Enter', () => {
    const fixture = TestBed.createComponent(MultiHost);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    input.value = 'Custom';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(fixture.componentInstance.value()).toEqual(['Custom']);
  });
});

@Component({
  imports: [HbComboboxImports],
  template: `
    <hb-combobox [(hbValue)]="value" hbMultiple [hbMaxChips]="2">
      <hb-combobox-item [hbValue]="'a'">Alpha</hb-combobox-item>
      <hb-combobox-item [hbValue]="'b'">Beta</hb-combobox-item>
      <hb-combobox-item [hbValue]="'c'">Gamma</hb-combobox-item>
      <hb-combobox-item [hbValue]="'d'">Delta</hb-combobox-item>
    </hb-combobox>
  `,
})
class CbxChipsHost {
  readonly value = signal<unknown[]>(['a', 'b', 'c', 'd']);
}

describe('HbComboboxComponent (chip overflow)', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [CbxChipsHost] }));

  it('caps visible chips at hbMaxChips and shows +N', () => {
    const fixture = TestBed.createComponent(CbxChipsHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('[data-slot="combobox"]') as HTMLElement;
    expect(trigger.textContent).toContain('Alpha');
    expect(trigger.textContent).toContain('Beta');
    expect(trigger.textContent).not.toContain('Gamma');
    expect(trigger.textContent).toContain('+2');
  });
});
