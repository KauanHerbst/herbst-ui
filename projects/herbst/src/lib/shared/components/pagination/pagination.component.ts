import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  input,
  model,
  numberAttribute,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCaretDoubleLeft,
  phosphorCaretDoubleRight,
  phosphorCaretLeft,
  phosphorCaretRight,
  phosphorDotsThree,
} from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent, type HbButtonSize } from '../button';
import { cn, type ClassValue } from '../../utils';
import {
  paginationEllipsisVariants,
  paginationListVariants,
  paginationNumberVariants,
  paginationVariants,
  type HbPaginationSize,
} from './pagination.variants';

@Directive({ selector: '[hbPageTemplate]' })
export class HbPaginationPageTemplateDirective {}

@Directive({ selector: '[hbEllipsisTemplate]' })
export class HbPaginationEllipsisTemplateDirective {}

@Directive({ selector: '[hbPreviousTemplate]' })
export class HbPaginationPreviousTemplateDirective {}

@Directive({ selector: '[hbNextTemplate]' })
export class HbPaginationNextTemplateDirective {}

type PageItem =
  | { type: 'page'; value: number; key: string }
  | { type: 'ellipsis'; side: 'left' | 'right'; key: string };

const range = (start: number, end: number): number[] =>
  Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);

const SIZE_TO_BUTTON: Record<HbPaginationSize, HbButtonSize> = {
  xs: 'xs',
  sm: 'sm',
  md: 'default',
  lg: 'lg',
  xl: 'xl',
};

@Component({
  selector: 'hb-pagination',
  imports: [NgIcon, NgTemplateOutlet, HbButtonComponent],
  viewProviders: [
    provideIcons({
      phosphorCaretLeft,
      phosphorCaretRight,
      phosphorCaretDoubleLeft,
      phosphorCaretDoubleRight,
      phosphorDotsThree,
    }),
  ],
  template: `
    <ul [class]="listClasses()">
      @if (hbShowFirstLast()) {
        <li>
          <button
            hb-button
            type="button"
            hbType="ghost"
            [hbSize]="buttonSize()"
            [hbDisabled]="isFirstDisabled()"
            aria-label="Go to first page"
            (click)="goToPage(1)"
          >
            <ng-icon [name]="hbFirstIcon()" />
          </button>
        </li>
      }

      @if (hbShowPrevNext()) {
        <li>
          @if (previousTpl(); as tpl) {
            <ng-container
              [ngTemplateOutlet]="tpl"
              [ngTemplateOutletContext]="{ $implicit: prevPage(), disabled: isFirstDisabled() }"
            />
          } @else {
            <button
              hb-button
              type="button"
              hbType="ghost"
              [hbSize]="buttonSize()"
              [class]="hbPreviousLabel() ? 'gap-1 px-2.5' : ''"
              [hbDisabled]="isFirstDisabled()"
              aria-label="Go to previous page"
              (click)="goToPage(prevPage())"
            >
              <ng-icon [name]="hbPreviousIcon()" />
              @if (hbPreviousLabel()) {
                <span>{{ hbPreviousLabel() }}</span>
              }
            </button>
          }
        </li>
      }

      @for (item of items(); track item.key) {
        <li>
          @if (item.type === 'page') {
            @if (pageTpl(); as tpl) {
              <ng-container
                [ngTemplateOutlet]="tpl"
                [ngTemplateOutletContext]="{
                  $implicit: item.value,
                  active: item.value === currentPage(),
                  disabled: hbDisabled(),
                }"
              />
            } @else {
              <button
                hb-button
                type="button"
                [hbType]="item.value === currentPage() ? 'outline' : 'ghost'"
                [hbSize]="buttonSize()"
                [class]="numberClasses()"
                [hbDisabled]="hbDisabled()"
                [attr.aria-current]="item.value === currentPage() ? 'page' : null"
                [attr.aria-label]="'Go to page ' + item.value"
                (click)="goToPage(item.value)"
              >
                {{ item.value }}
              </button>
            }
          } @else {
            @if (ellipsisTpl(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: item.side }" />
            } @else {
              <span [class]="ellipsisClasses()" aria-hidden="true">
                <ng-icon [name]="hbEllipsisIcon()" />
              </span>
            }
          }
        </li>
      }

      @if (hbShowPrevNext()) {
        <li>
          @if (nextTpl(); as tpl) {
            <ng-container
              [ngTemplateOutlet]="tpl"
              [ngTemplateOutletContext]="{ $implicit: nextPage(), disabled: isLastDisabled() }"
            />
          } @else {
            <button
              hb-button
              type="button"
              hbType="ghost"
              [hbSize]="buttonSize()"
              [class]="hbNextLabel() ? 'gap-1 px-2.5' : ''"
              [hbDisabled]="isLastDisabled()"
              aria-label="Go to next page"
              (click)="goToPage(nextPage())"
            >
              @if (hbNextLabel()) {
                <span>{{ hbNextLabel() }}</span>
              }
              <ng-icon [name]="hbNextIcon()" />
            </button>
          }
        </li>
      }

      @if (hbShowFirstLast()) {
        <li>
          <button
            hb-button
            type="button"
            hbType="ghost"
            [hbSize]="buttonSize()"
            [hbDisabled]="isLastDisabled()"
            aria-label="Go to last page"
            (click)="goToPage(pageCount())"
          >
            <ng-icon [name]="hbLastIcon()" />
          </button>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'navigation',
    '[attr.aria-label]': 'hbAriaLabel()',
    '[attr.data-slot]': "'pagination'",
    '[class]': 'classes()',
  },
  exportAs: 'hbPagination',
})
export class HbPaginationComponent {
  readonly hbPage = model<number>(1);
  readonly hbPageCount = input(0, { transform: numberAttribute });
  readonly hbTotal = input(0, { transform: numberAttribute });
  readonly hbPageSize = input(10, { transform: numberAttribute });

  readonly hbSiblings = input(1, { transform: numberAttribute });
  readonly hbBoundaries = input(1, { transform: numberAttribute });

  readonly hbSize = input<HbPaginationSize>('md');
  readonly hbDisabled = input(false, { transform: booleanAttribute });

  readonly hbShowPrevNext = input(true, { transform: booleanAttribute });
  readonly hbShowFirstLast = input(false, { transform: booleanAttribute });

  readonly hbPreviousIcon = input('phosphorCaretLeft');
  readonly hbNextIcon = input('phosphorCaretRight');
  readonly hbFirstIcon = input('phosphorCaretDoubleLeft');
  readonly hbLastIcon = input('phosphorCaretDoubleRight');
  readonly hbEllipsisIcon = input('phosphorDotsThree');
  readonly hbPreviousLabel = input('');
  readonly hbNextLabel = input('');

  readonly hbAriaLabel = input('pagination');
  readonly class = input<ClassValue>('');

  protected readonly pageTpl = contentChild(HbPaginationPageTemplateDirective, { read: TemplateRef });
  protected readonly ellipsisTpl = contentChild(HbPaginationEllipsisTemplateDirective, {
    read: TemplateRef,
  });
  protected readonly previousTpl = contentChild(HbPaginationPreviousTemplateDirective, {
    read: TemplateRef,
  });
  protected readonly nextTpl = contentChild(HbPaginationNextTemplateDirective, { read: TemplateRef });

  protected readonly pageCount = computed(() => {
    const direct = this.hbPageCount();
    if (direct > 0) return Math.floor(direct);
    const total = this.hbTotal();
    const size = this.hbPageSize();
    return total > 0 && size > 0 ? Math.ceil(total / size) : 1;
  });

  protected readonly currentPage = computed(() =>
    Math.min(Math.max(1, Math.floor(this.hbPage())), this.pageCount()),
  );

  protected readonly buttonSize = computed(() => SIZE_TO_BUTTON[this.hbSize()]);
  protected readonly classes = computed(() => cn(paginationVariants(), this.class()));
  protected readonly listClasses = computed(() => paginationListVariants());
  protected readonly numberClasses = computed(() => paginationNumberVariants({ size: this.hbSize() }));
  protected readonly ellipsisClasses = computed(() =>
    paginationEllipsisVariants({ size: this.hbSize() }),
  );

  protected readonly isFirstDisabled = computed(() => this.hbDisabled() || this.currentPage() <= 1);
  protected readonly isLastDisabled = computed(
    () => this.hbDisabled() || this.currentPage() >= this.pageCount(),
  );
  protected readonly prevPage = computed(() => Math.max(1, this.currentPage() - 1));
  protected readonly nextPage = computed(() => Math.min(this.pageCount(), this.currentPage() + 1));

  protected readonly items = computed<PageItem[]>(() => {
    const total = this.pageCount();
    const current = this.currentPage();
    const siblings = Math.max(0, this.hbSiblings());
    const boundaries = Math.max(0, this.hbBoundaries());

    const totalNumbers = siblings * 2 + 3 + boundaries * 2;
    const toItems = (nums: number[]): PageItem[] =>
      nums.map((n) => ({ type: 'page', value: n, key: `page-${n}` }));

    if (total <= totalNumbers) return toItems(range(1, total));

    const leftSibling = Math.max(current - siblings, boundaries + 1);
    const rightSibling = Math.min(current + siblings, total - boundaries);
    const showLeftEllipsis = leftSibling > boundaries + 2;
    const showRightEllipsis = rightSibling < total - boundaries - 1;

    const result: PageItem[] = [...toItems(range(1, boundaries))];
    if (showLeftEllipsis) {
      result.push({ type: 'ellipsis', side: 'left', key: 'ellipsis-left' });
    } else {
      result.push(...toItems(range(boundaries + 1, leftSibling - 1)));
    }
    result.push(...toItems(range(leftSibling, rightSibling)));
    if (showRightEllipsis) {
      result.push({ type: 'ellipsis', side: 'right', key: 'ellipsis-right' });
    } else {
      result.push(...toItems(range(rightSibling + 1, total - boundaries)));
    }
    result.push(...toItems(range(total - boundaries + 1, total)));
    return result;
  });

  goToPage(page: number): void {
    const target = Math.min(Math.max(1, page), this.pageCount());
    if (this.hbDisabled() || target === this.currentPage()) return;
    this.hbPage.set(target);
  }
}
