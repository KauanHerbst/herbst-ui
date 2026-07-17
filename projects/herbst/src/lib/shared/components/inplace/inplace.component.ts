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

import { cn, type ClassValue } from '../../utils';
import { HbInplaceContentDirective } from './inplace-content.directive';
import { HbInplaceDisplayDirective } from './inplace-display.directive';
import { inplaceClass, inplaceContentClass, inplaceDisplayClass } from './inplace.variants';

@Component({
  selector: 'hb-inplace',
  imports: [NgTemplateOutlet],
  template: `
    @if (!hbActive()) {
      <div
        [class]="displayClass"
        data-slot="inplace-display"
        [attr.role]="interactive() ? 'button' : null"
        [attr.tabindex]="interactive() ? 0 : null"
        [attr.data-disabled]="hbDisabled() || null"
        [attr.data-static]="staticDisplay() || null"
        (click)="onDisplayClick()"
        (keydown.enter)="onKey($event)"
        (keydown.space)="onKey($event)"
      >
        @if (displayTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        }
      </div>
    } @else {
      <div [class]="contentClass" data-slot="inplace-content">
        @if (contentTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'inplace'",
    '[attr.data-active]': 'hbActive() || null',
    '[attr.data-disabled]': 'hbDisabled() || null',
  },
  exportAs: 'hbInplace',
})
export class HbInplaceComponent {
  readonly hbActive = model(false);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbPreventClick = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbActivate = output<void>();
  readonly hbDeactivate = output<void>();

  protected readonly displayTpl = contentChild(HbInplaceDisplayDirective, { read: TemplateRef });
  protected readonly contentTpl = contentChild(HbInplaceContentDirective, { read: TemplateRef });

  readonly active = this.hbActive.asReadonly();

  protected readonly displayClass = inplaceDisplayClass;
  protected readonly contentClass = inplaceContentClass;
  protected readonly interactive = computed(() => !this.hbDisabled() && !this.hbPreventClick());
  protected readonly staticDisplay = computed(() => this.hbPreventClick() && !this.hbDisabled());

  protected readonly classes = computed(() => cn(inplaceClass, this.class()));

  activate(): void {
    if (this.hbDisabled() || this.hbActive()) return;
    this.hbActive.set(true);
    this.hbActivate.emit();
  }
  deactivate(): void {
    if (!this.hbActive()) return;
    this.hbActive.set(false);
    this.hbDeactivate.emit();
  }
  toggle(): void {
    this.hbActive() ? this.deactivate() : this.activate();
  }

  protected onDisplayClick(): void {
    if (this.interactive()) this.activate();
  }
  protected onKey(event: Event): void {
    if (!this.interactive()) return;
    event.preventDefault();
    this.activate();
  }
}
