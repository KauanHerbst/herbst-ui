import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  model,
  output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretDown } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbPanelFooterDirective } from './panel-footer.directive';
import { HbPanelHeaderDirective } from './panel-header.directive';
import { HbPanelIconsDirective } from './panel-icons.directive';
import { HbPanelIndicatorDirective } from './panel-indicator.directive';
import {
  panelClass,
  panelContentClass,
  panelFooterClass,
  panelHeaderClass,
  type HbPanelIconPos,
  type HbPanelToggler,
} from './panel.variants';

let panelUid = 0;

@Component({
  selector: 'hb-panel',
  imports: [NgTemplateOutlet, NgIcon],
  viewProviders: [provideIcons({ phosphorCaretDown })],
  template: `
    <ng-template #toggleBtn>
      <button
        type="button"
        class="inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
        data-slot="panel-toggle"
        [disabled]="hbDisabled() || null"
        [attr.aria-expanded]="!collapsed()"
        [attr.aria-controls]="contentId"
        [attr.aria-label]="collapsed() ? 'Expand' : 'Collapse'"
        (click)="onToggleClick($event)"
      >
        @if (indicatorTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: collapsed(), collapsed: collapsed() }" />
        } @else {
          <ng-icon
            [name]="hbToggleIcon()"
            class="transition-transform duration-200"
            [class.rotate-180]="!collapsed()"
          />
        }
      </button>
    </ng-template>

    <div
      [id]="headerId"
      [class]="headerClasses()"
      data-slot="panel-header"
      (click)="onHeaderClick()"
    >
      @if (hbToggleable() && hbIconPos() === 'start') {
        <ng-container [ngTemplateOutlet]="toggleBtn" />
      }
      <div class="flex min-w-0 flex-1 items-center gap-2">
        @if (headerTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          <span class="truncate">{{ hbHeader() }}</span>
        }
      </div>
      @if (iconsTpl(); as tpl) {
        <div class="flex items-center gap-1" (click)="$event.stopPropagation()">
          <ng-container [ngTemplateOutlet]="tpl" />
        </div>
      }
      @if (hbToggleable() && hbIconPos() === 'end') {
        <ng-container [ngTemplateOutlet]="toggleBtn" />
      }
    </div>

    <div
      [id]="contentId"
      role="region"
      [attr.aria-labelledby]="headerId"
      [attr.data-state]="collapsed() ? 'closed' : 'open'"
      [attr.inert]="collapsed() || null"
      class="grid transition-[grid-template-rows] duration-200 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
    >
      <div class="min-h-0 overflow-hidden">
        <div [class]="contentClass" data-slot="panel-content"><ng-content /></div>
        @if (footerTpl(); as tpl) {
          <div [class]="footerClass" data-slot="panel-footer">
            <ng-container [ngTemplateOutlet]="tpl" />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'panelClasses()',
    '[attr.data-slot]': "'panel'",
    '[attr.data-collapsed]': 'collapsed() || null',
  },
  exportAs: 'hbPanel',
})
export class HbPanelComponent {
  private readonly uid = ++panelUid;
  protected readonly headerId = `hb-panel-header-${this.uid}`;
  protected readonly contentId = `hb-panel-content-${this.uid}`;

  readonly hbHeader = input('');
  readonly hbToggleable = input(false, { transform: booleanAttribute });
  readonly hbCollapsed = model(false);
  readonly hbToggler = input<HbPanelToggler>('icon');
  readonly hbIconPos = input<HbPanelIconPos>('end');
  readonly hbToggleIcon = input('phosphorCaretDown');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbToggle = output<boolean>();

  protected readonly headerTpl = contentChild(HbPanelHeaderDirective, { read: TemplateRef });
  protected readonly iconsTpl = contentChild(HbPanelIconsDirective, { read: TemplateRef });
  protected readonly footerTpl = contentChild(HbPanelFooterDirective, { read: TemplateRef });
  protected readonly indicatorTpl = contentChild(HbPanelIndicatorDirective, { read: TemplateRef });

  protected readonly collapsed = this.hbCollapsed;
  protected readonly contentClass = panelContentClass;
  protected readonly footerClass = panelFooterClass;

  protected readonly panelClasses = computed(() => cn(panelClass, this.class()));
  protected readonly headerClasses = computed(() =>
    cn(
      panelHeaderClass,
      !this.collapsed() && 'border-b border-border',
      this.hbToggleable() &&
        this.hbToggler() === 'header' &&
        !this.hbDisabled() &&
        'cursor-pointer select-none',
    ),
  );

  protected toggle(): void {
    if (this.hbDisabled()) return;
    this.hbCollapsed.set(!this.collapsed());
    this.hbToggle.emit(this.collapsed());
  }
  protected onHeaderClick(): void {
    if (this.hbToggleable() && this.hbToggler() === 'header') this.toggle();
  }
  protected onToggleClick(event: MouseEvent): void {
    event.stopPropagation();
    if (this.hbToggleable()) this.toggle();
  }
}
