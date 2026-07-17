import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsThree } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { breadcrumbEllipsisVariants } from './breadcrumb.variants';

@Component({
  selector: 'hb-breadcrumb-ellipsis, [hb-breadcrumb-ellipsis]',
  imports: [NgIcon],
  template: `<ng-icon name="phosphorDotsThree" />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorDotsThree })],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'breadcrumb-ellipsis'",
    'aria-hidden': 'true',
    role: 'presentation',
  },
  exportAs: 'hbBreadcrumbEllipsis',
})
export class HbBreadcrumbEllipsisComponent {
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(breadcrumbEllipsisVariants(), this.class()));
}
