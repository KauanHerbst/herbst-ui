import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  Directive,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbBreadcrumbItemComponent } from './breadcrumb-item.component';
import {
  breadcrumbListVariants,
  breadcrumbVariants,
  type HbBreadcrumbAlign,
  type HbBreadcrumbSize,
  type HbBreadcrumbWrap,
} from './breadcrumb.variants';

@Directive({ selector: '[hbBreadcrumbSeparator]' })
export class HbBreadcrumbSeparatorDirective {}

@Component({
  selector: 'hb-breadcrumb, [hb-breadcrumb]',
  template: `
    <nav aria-label="breadcrumb" [class]="navClasses()">
      <ol [class]="listClasses()">
        <ng-content />
      </ol>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'breadcrumb'" },
  exportAs: 'hbBreadcrumb',
})
export class HbBreadcrumbComponent {
  readonly hbSize = input<HbBreadcrumbSize>('md');
  readonly hbAlign = input<HbBreadcrumbAlign>('start');
  readonly hbWrap = input<HbBreadcrumbWrap>('wrap');
  readonly hbSeparator = input<string>('');
  readonly hbMaxItems = input<number | null>(null);
  readonly class = input<ClassValue>('');

  readonly items = contentChildren(HbBreadcrumbItemComponent);
  readonly separatorTemplate = contentChild(HbBreadcrumbSeparatorDirective, { read: TemplateRef });

  protected readonly navClasses = computed(() =>
    cn(breadcrumbVariants({ size: this.hbSize() }), this.class()),
  );
  protected readonly listClasses = computed(() =>
    breadcrumbListVariants({ align: this.hbAlign(), wrap: this.hbWrap() }),
  );

  itemDisplay(item: HbBreadcrumbItemComponent): 'visible' | 'ellipsis' | 'hidden' {
    const list = this.items();
    const total = list.length;
    const max = this.hbMaxItems();
    if (max == null || max <= 0 || total <= max) return 'visible';

    const index = list.indexOf(item);
    const keepEnd = max - 1;
    const firstCollapsed = 1;
    const lastCollapsed = total - keepEnd - 1;
    if (index <= 0 || index > lastCollapsed) return 'visible';
    if (index === firstCollapsed) return 'ellipsis';
    return 'hidden';
  }

  isLast(item: HbBreadcrumbItemComponent): boolean {
    return this.items().at(-1) === item;
  }

  readonly collapsedItems = computed(() =>
    this.items().filter((item) => item.display() !== 'visible'),
  );
}
