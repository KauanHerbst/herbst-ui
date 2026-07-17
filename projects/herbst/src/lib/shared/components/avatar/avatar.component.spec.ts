import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAvatarComponent } from './avatar.component';
import type { HbAvatarSize, HbAvatarStatus } from './avatar.variants';

@Component({
  imports: [HbAvatarComponent],
  template: `
    <hb-avatar
      [hbSrc]="src()"
      hbFallback="HB"
      [hbStatus]="status()"
      [hbSize]="size()"
      [hbDisabled]="disabled()"
    />
  `,
})
class Host {
  readonly src = signal('');
  readonly status = signal<HbAvatarStatus | undefined>(undefined);
  readonly size = signal<HbAvatarSize | number>('md');
  readonly disabled = signal(false);
}

describe('HbAvatarComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const avatar = () => fixture.nativeElement.querySelector('hb-avatar') as HTMLElement;
    return { fixture, avatar };
  }

  it('shows the fallback when there is no src', () => {
    const { avatar } = render();
    expect(avatar().textContent).toContain('HB');
  });

  it('renders the status badge', () => {
    const { fixture, avatar } = render();
    fixture.componentInstance.status.set('online');
    fixture.detectChanges();
    expect(avatar().getAttribute('data-status')).toBe('online');
    expect(avatar().querySelector('[data-slot="avatar-badge"]')).not.toBeNull();
  });

  it('applies a custom pixel size', () => {
    const { fixture, avatar } = render();
    fixture.componentInstance.size.set(64);
    fixture.detectChanges();
    expect(avatar().style.width).toBe('64px');
  });

  it('dims when disabled', () => {
    const { fixture, avatar } = render();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(avatar().className).toContain('opacity-50');
  });
});
