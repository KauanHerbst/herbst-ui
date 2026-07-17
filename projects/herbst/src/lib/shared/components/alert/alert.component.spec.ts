import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbAlertComponent } from './alert.component';
import type { HbAlertType } from './alert.variants';

@Component({
  imports: [HbAlertComponent],
  template: `
    <hb-alert [hbType]="type()" [hbIcon]="icon()" hbTitle="Heads up" hbDescription="Something happened">
      <button hbAlertAction>Undo</button>
    </hb-alert>
  `,
})
class Host {
  readonly type = signal<HbAlertType>('default');
  readonly icon = signal('');
}

describe('HbAlertComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({ imports: [Host] }));

  function render() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = () => fixture.nativeElement.querySelector('hb-alert') as HTMLElement;
    return { fixture, el };
  }

  it('renders title and description', () => {
    const { fixture } = render();
    expect(fixture.nativeElement.textContent).toContain('Heads up');
    expect(fixture.nativeElement.textContent).toContain('Something happened');
  });

  it('has role="alert"', () => {
    const { el } = render();
    expect(el().getAttribute('role')).toBe('alert');
  });

  it('applies destructive colors', () => {
    const { fixture, el } = render();
    fixture.componentInstance.type.set('destructive');
    fixture.detectChanges();
    expect(el().className).toContain('border-l-destructive');
  });

  it('projects the action', () => {
    const { el } = render();
    expect(el().querySelector('button')?.textContent).toContain('Undo');
  });

  it('shows the type icon by default and hides it with hbIcon="none"', () => {
    const { fixture, el } = render();
    expect(el().querySelector('ng-icon')).not.toBeNull();
    fixture.componentInstance.icon.set('none');
    fixture.detectChanges();
    expect(el().querySelector('ng-icon')).toBeNull();
  });
});
