import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbChipComponent } from './chip.component';
import type { HbChipType } from './chip.variants';

@Component({
  imports: [HbChipComponent],
  template: `
    <span hb-chip [hbType]="type()" [hbRemovable]="removable()" (hbRemove)="removeCount = removeCount + 1">
      Angular
    </span>
  `,
})
class Host {
  readonly type = signal<HbChipType>('secondary');
  readonly removable = signal(false);
  removeCount = 0;
}

describe('HbChipComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const chip = () => fixture.nativeElement.querySelector('[data-slot="chip"]') as HTMLElement;
    return { fixture, chip };
  }

  it('renders its content', () => {
    const { chip } = render();
    expect(chip().textContent).toContain('Angular');
  });

  it('applies the type color', () => {
    const { fixture, chip } = render();
    fixture.componentInstance.type.set('success');
    fixture.detectChanges();
    expect(chip().className).toContain('bg-success');
  });

  it('shows a remove button and emits hbRemove when clicked', () => {
    const { fixture, chip } = render();
    expect(chip().querySelector('button')).toBeNull();
    fixture.componentInstance.removable.set(true);
    fixture.detectChanges();
    const removeBtn = chip().querySelector('button[aria-label="Remove"]') as HTMLButtonElement;
    expect(removeBtn).not.toBeNull();
    removeBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.removeCount).toBe(1);
  });
});
