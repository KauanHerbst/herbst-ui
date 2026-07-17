import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  numberAttribute,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretLeft, phosphorCaretRight } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { sidebarBodyClass, sidebarClass, sidebarTriggerClass } from './layout.variants';

@Component({
  selector: 'hb-layout-sidebar',
  imports: [NgIcon, NgTemplateOutlet],
  viewProviders: [provideIcons({ phosphorCaretLeft, phosphorCaretRight })],
  template: `
    <div [class]="bodyClass" data-slot="layout-sidebar-body"><ng-content /></div>

    @if (hbCollapsible()) {
      <button
        type="button"
        [class]="triggerClass"
        data-slot="layout-sidebar-trigger"
        [attr.aria-expanded]="!hbCollapsed()"
        aria-label="Toggle sidebar"
        (click)="toggle()"
      >
        @if (hbTrigger(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          <ng-icon [name]="arrowIcon()" />
        }
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.width]': 'widthStyle()',
    '[attr.data-slot]': "'layout-sidebar'",
    '[attr.data-collapsed]': 'hbCollapsed() || null',
  },
  exportAs: 'hbLayoutSidebar',
})
export class HbLayoutSidebarComponent {
  readonly hbWidth = input<string | number>(200);
  readonly hbCollapsedWidth = input(64, { transform: numberAttribute });
  readonly hbCollapsible = input(false, { transform: booleanAttribute });
  readonly hbCollapsed = model(false);
  readonly hbReverseArrow = input(false, { transform: booleanAttribute });
  readonly hbTrigger = input<TemplateRef<void> | null>(null);
  readonly class = input<ClassValue>('');

  readonly hbOnCollapsedChange = output<boolean>();

  protected readonly bodyClass = sidebarBodyClass;
  protected readonly triggerClass = sidebarTriggerClass;

  protected readonly classes = computed(() => cn(sidebarClass, this.class()));
  protected readonly widthStyle = computed(() => {
    if (this.hbCollapsed()) return `${this.hbCollapsedWidth()}px`;
    const width = this.hbWidth();
    return typeof width === 'number' ? `${width}px` : width;
  });
  protected readonly arrowIcon = computed(() => {
    const pointsLeft = this.hbReverseArrow() ? this.hbCollapsed() : !this.hbCollapsed();
    return pointsLeft ? 'phosphorCaretLeft' : 'phosphorCaretRight';
  });

  toggle(): void {
    const value = !this.hbCollapsed();
    this.hbCollapsed.set(value);
    this.hbOnCollapsedChange.emit(value);
  }
}
