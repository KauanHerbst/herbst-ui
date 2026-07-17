import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbSheetComponent } from './sheet.component';
import { HbSheetImports } from './sheet.imports';
import type { HbSheetSide } from './sheet.variants';

@Component({
  imports: [HbSheetImports],
  template: `
    <hb-sheet
      [hbSide]="side()"
      hbTitle="Edit profile"
      hbDescription="Update your details."
      hbOkText="Save"
      [hbClosable]="closable()"
      (hbOk)="okCount.set(okCount() + 1)"
    >
      <button hbSheetTrigger type="button">Open</button>
      <div hbSheetContent>Body content</div>
    </hb-sheet>
  `,
})
class Host {
  readonly side = signal<HbSheetSide>('right');
  readonly closable = signal(true);
  readonly okCount = signal(0);
}

describe('HbSheetComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const sheet = fixture.debugElement.query(By.directive(HbSheetComponent))
      .componentInstance as HbSheetComponent;
    const trigger = fixture.nativeElement.querySelector('button[hbSheetTrigger]') as HTMLButtonElement;
    return { fixture, sheet, trigger };
  }
  const panel = () => overlay.querySelector('[class*="hb-sheet-anim-"]') as HTMLElement;

  it('is closed initially and opens from the trigger', () => {
    const { fixture, trigger } = render();
    expect(overlay.textContent).not.toContain('Edit profile');
    trigger.click();
    fixture.detectChanges();
    expect(overlay.textContent).toContain('Edit profile');
    expect(overlay.textContent).toContain('Update your details.');
    expect(overlay.textContent).toContain('Body content');
  });

  it('slides from the requested side and shows a Close button when closable', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    expect(panel().className).toContain('hb-sheet-anim-right');
    expect(panel().className).toContain('border-l');
    expect(overlay.querySelector('button[aria-label="Close"]')).toBeTruthy();
  });

  it('reflects the side (left => border-r, slide from left)', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.side.set('left');
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    const p = panel();
    expect(p.className).toContain('hb-sheet-anim-left');
    expect(p.className).toContain('border-r');
  });

  it('emits (hbOk) and closes when the OK button is clicked', () => {
    const { fixture, trigger } = render();
    trigger.click();
    fixture.detectChanges();
    const ok = Array.from(overlay.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === 'Save',
    ) as HTMLButtonElement;
    ok.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.okCount()).toBe(1);
    expect(overlay.textContent).not.toContain('Edit profile');
  });

  it('hides the Close button when not closable', () => {
    const { fixture, trigger } = render();
    fixture.componentInstance.closable.set(false);
    fixture.detectChanges();
    trigger.click();
    fixture.detectChanges();
    expect(overlay.querySelector('button[aria-label="Close"]')).toBeNull();
  });
});
