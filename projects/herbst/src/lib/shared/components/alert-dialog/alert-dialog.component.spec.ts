import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbButtonComponent } from '../button';
import { HbAlertDialogComponent } from './alert-dialog.component';

@Component({
  imports: [HbAlertDialogComponent, HbButtonComponent],
  template: `
    <hb-alert-dialog
      hbTitle="Delete item"
      hbDescription="Are you sure?"
      hbOkText="Delete"
      hbCancelText="Cancel"
      (hbOk)="okCount = okCount + 1"
      (hbCancel)="cancelCount = cancelCount + 1"
    >
      <button hb-button hbAlertDialogTrigger>Open</button>
      <div hbAlertDialogContent>Body content</div>
    </hb-alert-dialog>
  `,
})
class Host {
  okCount = 0;
  cancelCount = 0;
}

describe('HbAlertDialogComponent', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return fixture;
  }

  function openDialog(fixture: ReturnType<typeof render>) {
    (fixture.nativeElement.querySelector('button') as HTMLButtonElement).click();
    fixture.detectChanges();
  }

  function overlayButton(text: string): HTMLButtonElement {
    return Array.from(overlay.querySelectorAll('button')).find(
      (b) => b.textContent?.trim() === text,
    ) as HTMLButtonElement;
  }

  it('opens on trigger click', () => {
    const fixture = render();
    openDialog(fixture);
    expect(overlay.textContent).toContain('Delete item');
    expect(overlay.textContent).toContain('Body content');
  });

  it('emits hbOk and closes on OK', () => {
    const fixture = render();
    openDialog(fixture);
    overlayButton('Delete').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.okCount).toBe(1);
    expect(overlay.textContent).not.toContain('Delete item');
  });

  it('emits hbCancel on Cancel', () => {
    const fixture = render();
    openDialog(fixture);
    overlayButton('Cancel').click();
    fixture.detectChanges();
    expect(fixture.componentInstance.cancelCount).toBe(1);
  });
});
