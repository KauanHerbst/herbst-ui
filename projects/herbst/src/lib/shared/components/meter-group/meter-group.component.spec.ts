import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';

import { HbMeterGroupImports } from './meter-group.imports';
import type {
  HbMeterGroupLabelPosition,
  HbMeterGroupOrientation,
  HbMeterItem,
} from './meter-group.types';

@Component({
  imports: [HbMeterGroupImports],
  template: `
    <hb-meter-group
      [hbValue]="value()"
      [hbOrientation]="orientation()"
      [hbLabelPosition]="labelPosition()"
    />
  `,
})
class Host {
  readonly value = signal<HbMeterItem[]>([
    { label: 'Apps', value: 20, color: 'rgb(255, 0, 0)' },
    { label: 'Media', value: 30, color: 'rgb(0, 255, 0)' },
  ]);
  readonly orientation = signal<HbMeterGroupOrientation>('horizontal');
  readonly labelPosition = signal<HbMeterGroupLabelPosition>('end');
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

describe('HbMeterGroupComponent', () => {
  it('renders one meter segment per item with width and color', () => {
    const { all } = render();
    const meters = all('[data-slot="meter-group-meter"]');
    expect(meters.length).toBe(2);
    expect(meters[0].style.width).toBe('20%');
    expect(meters[1].style.width).toBe('30%');
    expect(meters[0].style.background).toBe('rgb(255, 0, 0)');
  });

  it('renders a legend with label and percentage per item', () => {
    const { all, el } = render();
    const labels = all('[data-slot="meter-group-label"]');
    expect(labels.length).toBe(2);
    expect(labels[0].textContent).toContain('Apps');
    expect(labels[0].textContent).toContain('20%');
    expect(el('[data-slot="meter-group-labels"]')).toBeTruthy();
  });

  it('reflects orientation and uses height in vertical mode', () => {
    const { fixture, el, all } = render();
    expect(el('[data-slot="meter-group"]').getAttribute('data-orientation')).toBe('horizontal');
    fixture.componentInstance.orientation.set('vertical');
    fixture.detectChanges();
    expect(el('[data-slot="meter-group"]').getAttribute('data-orientation')).toBe('vertical');
    const meters = all('[data-slot="meter-group-meter"]');
    expect(meters[0].style.height).toBe('20%');
    expect(meters[0].style.width).toBe('');
  });

  it('places the legend before the meters when labelPosition is start', () => {
    const { fixture, el } = render();
    fixture.componentInstance.labelPosition.set('start');
    fixture.detectChanges();
    const root = el('[data-slot="meter-group"]');
    const labels = root.querySelector('[data-slot="meter-group-labels"]');
    const meters = root.querySelector('[data-slot="meter-group-meters"]');
    expect(
      labels && meters && labels.compareDocumentPosition(meters) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('renders a custom meter template when provided', () => {
    @Component({
      imports: [HbMeterGroupImports],
      template: `
        <hb-meter-group [hbValue]="value">
          <ng-template hbMeterGroupMeter let-item let-size="size">
            <span data-slot="custom" [attr.data-size]="size">{{ item.label }}</span>
          </ng-template>
        </hb-meter-group>
      `,
    })
    class CustomHost {
      readonly value: HbMeterItem[] = [{ label: 'X', value: 40 }];
    }
    TestBed.configureTestingModule({ imports: [CustomHost] });
    const fixture = TestBed.createComponent(CustomHost);
    fixture.detectChanges();
    const custom = fixture.debugElement.query(By.css('[data-slot="custom"]'))
      .nativeElement as HTMLElement;
    expect(custom.textContent).toBe('X');
    expect(custom.getAttribute('data-size')).toBe('40');
  });
});
