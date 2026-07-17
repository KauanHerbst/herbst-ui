import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAvatarImports } from './avatar.imports';

@Component({
  imports: [HbAvatarImports],
  template: `
    <hb-avatar-group [hbMax]="max()">
      <hb-avatar hbFallback="A" />
      <hb-avatar hbFallback="B" />
      <hb-avatar hbFallback="C" />
      <hb-avatar hbFallback="D" />
    </hb-avatar-group>
  `,
})
class Host {
  readonly max = signal<number | null>(2);
}

describe('HbAvatarGroupComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const overflow = () =>
      fixture.nativeElement.querySelector('[data-slot="avatar-group-overflow"]') as HTMLElement;
    const avatars = () =>
      Array.from(fixture.nativeElement.querySelectorAll('hb-avatar')) as HTMLElement[];
    return { fixture, overflow, avatars };
  }

  it('shows the overflow count (+N)', () => {
    const { overflow } = render();
    expect(overflow().textContent?.trim()).toBe('+2');
  });

  it('hides avatars beyond hbMax', () => {
    const { avatars } = render();
    expect(avatars()[1].style.display).toBe('');
    expect(avatars()[2].style.display).toBe('none');
  });

  it('shows no overflow chip when under the limit', () => {
    const { fixture, overflow } = render();
    fixture.componentInstance.max.set(null);
    fixture.detectChanges();
    expect(overflow()).toBeNull();
  });
});
