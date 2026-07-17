import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbMenuImports } from './menu.imports';

@Component({
  imports: [HbMenuImports],
  template: `
    <div [hbContextMenuTriggerFor]="menu" data-testid="target">Right-click me</div>
    <ng-template #menu>
      <hb-menu>
        <hb-menu-item (hbSelect)="picked = 'copy'">Copy</hb-menu-item>
        <hb-menu-separator />
        <hb-menu-checkbox-item [(hbChecked)]="grid">Show grid</hb-menu-checkbox-item>
        <hb-menu-radio-group [(hbValue)]="zoom">
          <hb-menu-radio-item [hbValue]="'100'">100%</hb-menu-radio-item>
          <hb-menu-radio-item [hbValue]="'200'">200%</hb-menu-radio-item>
        </hb-menu-radio-group>
        <hb-menu-item hbVariant="destructive" (hbSelect)="picked = 'delete'">Delete</hb-menu-item>
      </hb-menu>
    </ng-template>
  `,
})
class Host {
  readonly grid = signal(false);
  readonly zoom = signal('100');
  picked = '';
}

describe('HbContextMenuTriggerDirective', () => {
  let overlay: HTMLElement;
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Host] });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  function openContextMenu() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const target = fixture.nativeElement.querySelector('[data-testid="target"]') as HTMLElement;
    target.dispatchEvent(
      new MouseEvent('contextmenu', { bubbles: true, clientX: 20, clientY: 20 }),
    );
    fixture.detectChanges();
    return fixture;
  }

  it('opens the hb-menu on right-click with all item types', () => {
    openContextMenu();
    expect(overlay.querySelector('[role="menu"]')).toBeTruthy();
    expect(overlay.textContent).toContain('Copy');
    expect(overlay.querySelector('[role="menuitemcheckbox"]')).toBeTruthy();
    expect(overlay.querySelectorAll('[role="menuitemradio"]').length).toBe(2);
  });

  it('selects a context-menu item', () => {
    const fixture = openContextMenu();
    const items = overlay.querySelectorAll('[role="menuitem"]');
    (items[items.length - 1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.picked).toBe('delete');
  });
});
