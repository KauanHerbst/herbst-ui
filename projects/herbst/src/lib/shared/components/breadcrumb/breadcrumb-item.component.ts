import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { type Params, RouterLink } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCaretRight, phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbMenuImports } from '../menu';
import { HbBreadcrumbComponent } from './breadcrumb.component';
import { HbBreadcrumbEllipsisComponent } from './breadcrumb-ellipsis.component';
import {
  breadcrumbEllipsisVariants,
  breadcrumbItemVariants,
  breadcrumbLinkVariants,
  breadcrumbSeparatorVariants,
} from './breadcrumb.variants';

@Component({
  selector: 'hb-breadcrumb-item, [hb-breadcrumb-item]',
  imports: [NgIcon, NgTemplateOutlet, RouterLink, HbMenuImports],
  template: `
    <ng-template #label><ng-content /></ng-template>

    @if (autoEllipsis()) {
      <button
        type="button"
        [class]="ellipsisClasses"
        [hbMenuTriggerFor]="collapsedMenu"
        aria-label="Show collapsed breadcrumbs"
      >
        <ng-icon name="phosphorDotsThree" />
      </button>
    } @else if (isEllipsis()) {
      <ng-container [ngTemplateOutlet]="label" />
    } @else if (hasLink()) {
      <a
        [class]="linkClasses()"
        [routerLink]="hbLink()"
        [queryParams]="hbQueryParams()"
        [fragment]="hbFragment()"
        (click)="hbClick.emit()"
      >
        <ng-container [ngTemplateOutlet]="label" />
      </a>
    } @else if (hbHref()) {
      <a [class]="linkClasses()" [href]="hbHref()" (click)="hbClick.emit()">
        <ng-container [ngTemplateOutlet]="label" />
      </a>
    } @else {
      <span [class]="linkClasses()" [attr.aria-current]="hbCurrent() ? 'page' : null">
        <ng-container [ngTemplateOutlet]="label" />
      </span>
    }

    @if (!hidden() && !isLast()) {
      <span [class]="separatorClasses" aria-hidden="true" role="presentation">
        @if (root.separatorTemplate(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else if (root.hbSeparator()) {
          {{ root.hbSeparator() }}
        } @else {
          <ng-icon name="phosphorCaretRight" />
        }
      </span>
    }

    <ng-template #collapsedMenu>
      <hb-menu class="min-w-40">
        @for (item of root.collapsedItems(); track $index) {
          @if (item.hasLink()) {
            <a
              hb-menu-item
              [routerLink]="item.hbLink()"
              [queryParams]="item.hbQueryParams()"
              [fragment]="item.hbFragment()"
            >
              {{ item.label() }}
            </a>
          } @else if (item.hbHref()) {
            <a hb-menu-item [href]="item.hbHref()">{{ item.label() }}</a>
          } @else {
            <button hb-menu-item type="button" (hbSelect)="item.hbClick.emit()">
              {{ item.label() }}
            </button>
          }
        }
      </hb-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorCaretRight, phosphorDotsThree })],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'breadcrumb-item'",
    '[style.display]': "display() === 'hidden' ? 'none' : null",
  },
  exportAs: 'hbBreadcrumbItem',
})
export class HbBreadcrumbItemComponent {
  protected readonly root = inject(HbBreadcrumbComponent);
  private readonly ellipsisContent = contentChild(HbBreadcrumbEllipsisComponent);

  readonly hbLink = input<string | string[] | null>(null);
  readonly hbQueryParams = input<Params | null | undefined>(undefined);
  readonly hbFragment = input<string | undefined>(undefined);
  readonly hbHref = input<string>('');
  readonly hbCurrent = input(false, { transform: booleanAttribute });
  readonly hbLabel = input<string>('');
  readonly class = input<ClassValue>('');

  readonly hbClick = output<void>();

  private readonly capturedLabel = (inject(ElementRef).nativeElement as HTMLElement).textContent?.trim() ?? '';
  readonly label = computed(() => this.hbLabel() || this.capturedLabel);
  readonly display = computed(() => this.root.itemDisplay(this));
  protected readonly hidden = computed(() => this.display() === 'hidden');
  protected readonly autoEllipsis = computed(() => this.display() === 'ellipsis');
  protected readonly isEllipsis = computed(() => this.ellipsisContent() != null);
  protected readonly isLast = computed(() => this.root.isLast(this));

  readonly hasLink = computed(() => {
    const link = this.hbLink();
    return Array.isArray(link) ? link.length > 0 : !!link;
  });

  protected readonly classes = computed(() => cn(breadcrumbItemVariants(), this.class()));
  protected readonly linkClasses = computed(() =>
    breadcrumbLinkVariants({ current: this.hbCurrent() }),
  );
  protected readonly separatorClasses = cn(breadcrumbSeparatorVariants());
  protected readonly ellipsisClasses = cn(breadcrumbEllipsisVariants());
}
