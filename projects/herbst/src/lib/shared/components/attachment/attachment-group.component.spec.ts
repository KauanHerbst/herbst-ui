import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAttachmentImports } from './attachment.imports';

@Component({
  imports: [HbAttachmentImports],
  template: `
    <hb-attachment-group [hbOrientation]="orientation()">
      <hb-attachment hbName="a.pdf" />
      <hb-attachment hbName="b.png" />
    </hb-attachment-group>
  `,
})
class Host {
  readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
}

describe('HbAttachmentGroupComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const group = () => fixture.nativeElement.querySelector('hb-attachment-group') as HTMLElement;
    return { fixture, group };
  }

  it('renders the projected attachments', () => {
    const { group } = render();
    expect(group().querySelectorAll('hb-attachment').length).toBe(2);
  });

  it('scrolls horizontally by default', () => {
    const { group } = render();
    expect(group().className).toContain('overflow-x-auto');
  });
});
