import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCheckCircle,
  phosphorInfo,
  phosphorWarning,
  phosphorX,
  phosphorXCircle,
} from '@ng-icons/phosphor-icons/regular';

import { cn } from '../../utils';
import { HbButtonComponent } from '../button';
import { HbSpinnerComponent } from '../spinner';
import type { HbToastAction, HbToastRef, HbToastType } from './toast.types';
import {
  TOAST_ICON,
  TOAST_ICON_COLOR,
  TOAST_PROGRESS_COLOR,
  toastVariants,
} from './toast.variants';

@Component({
  selector: 'hb-toast',
  imports: [NgIcon, HbButtonComponent, HbSpinnerComponent],
  viewProviders: [
    provideIcons({ phosphorCheckCircle, phosphorInfo, phosphorWarning, phosphorXCircle, phosphorX }),
  ],
  template: `
    <div
      [class]="cardClasses()"
      role="status"
      aria-live="polite"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      @if (type() === 'loading') {
        <hb-spinner hbSize="sm" class="mt-0.5 shrink-0" />
      } @else if (iconName()) {
        <ng-icon [name]="iconName()" [class]="cn('mt-0.5 shrink-0 text-lg', iconColor())" />
      }

      <div class="flex min-w-0 flex-1 flex-col gap-1">
        @if (config().title) {
          <div class="text-sm font-semibold leading-none">{{ config().title }}</div>
        }
        @if (config().description) {
          <div class="text-sm text-muted-foreground">{{ config().description }}</div>
        }
        @if (actions().length) {
          <div class="mt-2 flex flex-wrap gap-2">
            @for (action of actions(); track action.label) {
              <button
                hb-button
                [hbType]="action.type ?? 'outline'"
                hbSize="sm"
                type="button"
                (click)="runAction(action)"
              >
                {{ action.label }}
              </button>
            }
          </div>
        }
      </div>

      @if (config().closable) {
        <button
          type="button"
          class="-mr-1 -mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
          (click)="ref().dismiss()"
        >
          <ng-icon name="phosphorX" />
        </button>
      }

      @if (showProgress()) {
        <span
          [class]="cn('absolute inset-x-0 bottom-0 h-0.5 origin-left', progressColor())"
          [style.animation]="'hb-toast-progress ' + config().duration + 'ms linear forwards'"
          [style.animationPlayState]="ref().paused() ? 'paused' : 'running'"
        ></span>
      }
    </div>
  `,
  styles: `
    @keyframes hb-toast-progress {
      from {
        transform: scaleX(1);
      }
      to {
        transform: scaleX(0);
      }
    }
    @keyframes hb-toast-in {
      from {
        opacity: 0;
        transform: translateY(0.5rem) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    hb-toast {
      display: block;
      animation: hb-toast-in 0.18s ease-out;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'toast'" },
  exportAs: 'hbToast',
})
export class HbToastComponent {
  readonly ref = input.required<HbToastRef>();
  protected readonly cn = cn;

  protected readonly config = computed(() => this.ref().config());
  protected readonly type = computed<HbToastType>(() => this.config().type ?? 'default');
  protected readonly actions = computed<HbToastAction[]>(() => this.config().actions ?? []);

  protected readonly iconName = computed(() => {
    const custom = this.config().icon;
    return custom !== undefined ? custom : TOAST_ICON[this.type()];
  });
  protected readonly iconColor = computed(() => TOAST_ICON_COLOR[this.type()]);
  protected readonly progressColor = computed(() => TOAST_PROGRESS_COLOR[this.type()]);
  protected readonly showProgress = computed(
    () =>
      !!this.config().progressBar &&
      this.type() !== 'loading' &&
      (this.config().duration ?? 0) > 0,
  );
  protected readonly cardClasses = computed(() =>
    cn(toastVariants({ type: this.type() }), this.config().class),
  );

  protected onEnter(): void {
    if (this.config().pauseOnHover) this.ref().pause();
  }
  protected onLeave(): void {
    if (this.config().pauseOnHover) this.ref().resume();
  }
  protected runAction(action: HbToastAction): void {
    action.onClick?.(this.ref());
    if (action.closeOnClick !== false) this.ref().dismiss();
  }
}
