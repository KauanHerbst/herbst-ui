import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAttachmentComponent } from './attachment.component';
import type { HbAttachmentState } from './attachment.variants';

@Component({
  imports: [HbAttachmentComponent],
  template: `
    <hb-attachment
      [hbName]="name()"
      hbDescription="PDF · 2.4 MB"
      [hbState]="state()"
      [hbProgress]="progress()"
      hbRemovable
      (hbRemove)="removeCount = removeCount + 1"
    />
  `,
})
class Host {
  readonly name = signal('report.pdf');
  readonly state = signal<HbAttachmentState>('done');
  readonly progress = signal<number | null>(null);
  removeCount = 0;
}

describe('HbAttachmentComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = () => fixture.nativeElement.querySelector('hb-attachment') as HTMLElement;
    return { fixture, el };
  }

  it('renders name and description', () => {
    const { el } = render();
    expect(el().textContent).toContain('report.pdf');
    expect(el().textContent).toContain('PDF · 2.4 MB');
  });

  it('applies destructive treatment on error', () => {
    const { fixture, el } = render();
    fixture.componentInstance.state.set('error');
    fixture.detectChanges();
    expect(el().className).toContain('border-destructive/50');
  });

  it('emits hbRemove when the remove button is clicked', () => {
    const { fixture, el } = render();
    const removeBtn = el().querySelector('button[aria-label="Remove"]') as HTMLButtonElement;
    removeBtn.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.removeCount).toBe(1);
  });

  it('shows a progress bar while uploading', () => {
    const { fixture, el } = render();
    fixture.componentInstance.state.set('uploading');
    fixture.componentInstance.progress.set(40);
    fixture.detectChanges();
    const bar = el().querySelector('[role="progressbar"]');
    expect(bar).not.toBeNull();
    expect(bar?.getAttribute('aria-valuenow')).toBe('40');
  });
});
