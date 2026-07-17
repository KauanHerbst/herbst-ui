import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircle,
  phosphorInfo,
  phosphorWarning,
  phosphorXCircle,
} from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import {
  alertDescriptionVariants,
  alertIconVariants,
  alertTitleVariants,
  alertVariants,
  type HbAlertType,
} from './alert.variants';

const DEFAULT_ICONS: Record<HbAlertType, string> = {
  default: 'phosphorInfo',
  success: 'phosphorCheckCircle',
  warning: 'phosphorWarning',
  destructive: 'phosphorXCircle',
};

@Component({
  selector: 'hb-alert, [hb-alert]',
  imports: [NgIcon],
  template: `
    @if (resolvedIcon(); as icon) {
      <ng-icon [name]="icon" [class]="iconClasses()" />
    }

    <div class="min-w-0 flex-1">
      @if (hbTitle()) {
        <div [class]="titleClasses()" data-slot="alert-title">{{ hbTitle() }}</div>
      }
      @if (hbDescription()) {
        <div [class]="descriptionClasses" data-slot="alert-description">{{ hbDescription() }}</div>
      }
    </div>

    <ng-content select="[hbAlertAction]" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    provideIcons({ phosphorInfo, phosphorCheckCircle, phosphorWarning, phosphorXCircle }),
  ],
  host: {
    role: 'alert',
    '[class]': 'classes()',
    '[attr.data-slot]': "'alert'",
  },
  exportAs: 'hbAlert',
})
export class HbAlertComponent {
  readonly hbType = input<HbAlertType>('default');
  readonly hbTitle = input<string>('');
  readonly hbDescription = input<string>('');
  readonly hbIcon = input<string>('');
  readonly class = input<ClassValue>('');

  protected readonly iconClasses = computed(() =>
    cn(alertIconVariants({ hbType: this.hbType() })),
  );
  protected readonly titleClasses = computed(() =>
    cn(alertTitleVariants({ hbType: this.hbType() })),
  );

  protected readonly classes = computed(() =>
    cn(alertVariants({ hbType: this.hbType() }), this.class()),
  );
  protected readonly descriptionClasses = cn(alertDescriptionVariants());

  protected readonly resolvedIcon = computed(() => {
    const icon = this.hbIcon();
    if (icon === 'none') return null;
    return icon || DEFAULT_ICONS[this.hbType()];
  });
}
