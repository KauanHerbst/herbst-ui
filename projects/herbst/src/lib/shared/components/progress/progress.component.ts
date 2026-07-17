import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  input,
  numberAttribute,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  progressBarVariants,
  progressTrackVariants,
  type HbProgressFormat,
  type HbProgressShape,
  type HbProgressSize,
  type HbProgressType,
  type HbProgressValuePosition,
} from './progress.variants';

@Directive({ selector: '[hbValueTemplate]' })
export class HbProgressValueTemplateDirective {}

@Component({
  selector: 'hb-progress',
  imports: [NgTemplateOutlet],
  template: `
    @if (showTopRow()) {
      <div class="mb-1.5 flex items-center justify-between gap-2 text-sm">
        @if (hbLabel()) {
          <span class="font-medium">{{ hbLabel() }}</span>
        }
        @if (showValueOutside()) {
          <span class="text-muted-foreground tabular-nums">
            @if (valueTpl(); as tpl) {
              <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="valueContext()" />
            } @else {
              {{ valueText() }}
            }
          </span>
        }
      </div>
    }

    <div
      [class]="trackClasses()"
      role="progressbar"
      [attr.aria-label]="hbLabel() || hbAriaLabel()"
      [attr.aria-valuemin]="hbIndeterminate() ? null : 0"
      [attr.aria-valuemax]="hbIndeterminate() ? null : hbMax()"
      [attr.aria-valuenow]="hbIndeterminate() ? null : clampedValue()"
    >
      @if (hbIndeterminate()) {
        <div [class]="indeterminateBarClasses()"></div>
      } @else {
        <div [class]="barClasses()" [style.width.%]="percent()">
          @if (showValueInside()) {
            <span class="px-1.5 text-[10px] font-medium leading-none whitespace-nowrap">
              @if (valueTpl(); as tpl) {
                <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="valueContext()" />
              } @else {
                {{ valueText() }}
              }
            </span>
          }
        </div>
      }
    </div>
  `,
  styles: `
    @keyframes hb-progress-indeterminate {
      0% {
        left: 0%;
        width: 30%;
      }
      50% {
        left: 45%;
        width: 40%;
      }
      100% {
        left: 100%;
        width: 0%;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClasses()', '[attr.data-slot]': "'progress'" },
  exportAs: 'hbProgress',
})
export class HbProgressComponent {
  readonly hbValue = input(0, { transform: numberAttribute });
  readonly hbMax = input(100, { transform: numberAttribute });
  readonly hbType = input<HbProgressType>('default');
  readonly hbSize = input<HbProgressSize>('md');
  readonly hbShape = input<HbProgressShape>('rounded');
  readonly hbIndeterminate = input(false, { transform: booleanAttribute });
  readonly hbLabel = input('');
  readonly hbShowValue = input(false, { transform: booleanAttribute });
  readonly hbFormat = input<HbProgressFormat>('percent');
  readonly hbValuePosition = input<HbProgressValuePosition>('outside');
  readonly hbBarClass = input<ClassValue>('');
  readonly hbAriaLabel = input('Progress');
  readonly class = input<ClassValue>('');

  protected readonly valueTpl = contentChild(HbProgressValueTemplateDirective, { read: TemplateRef });

  protected readonly clampedValue = computed(() => {
    const max = this.hbMax();
    return Math.min(Math.max(0, this.hbValue()), max > 0 ? max : 0);
  });
  protected readonly percent = computed(() => {
    const max = this.hbMax();
    return max > 0 ? (this.clampedValue() / max) * 100 : 0;
  });

  protected readonly valueText = computed(() => {
    switch (this.hbFormat()) {
      case 'value':
        return `${this.clampedValue()}`;
      case 'fraction':
        return `${this.clampedValue()}/${this.hbMax()}`;
      default:
        return `${Math.round(this.percent())}%`;
    }
  });
  protected readonly valueContext = computed(() => ({
    $implicit: this.clampedValue(),
    value: this.clampedValue(),
    max: this.hbMax(),
    percent: Math.round(this.percent()),
  }));

  protected readonly showValueOutside = computed(
    () => this.hbShowValue() && !this.hbIndeterminate() && this.hbValuePosition() === 'outside',
  );
  protected readonly showValueInside = computed(
    () => this.hbShowValue() && !this.hbIndeterminate() && this.hbValuePosition() === 'inside',
  );
  protected readonly showTopRow = computed(() => !!this.hbLabel() || this.showValueOutside());

  protected readonly hostClasses = computed(() => cn('block w-full', this.class()));
  protected readonly trackClasses = computed(() =>
    progressTrackVariants({ type: this.hbType(), size: this.hbSize(), shape: this.hbShape() }),
  );
  protected readonly barClasses = computed(() =>
    cn(progressBarVariants({ type: this.hbType(), shape: this.hbShape() }), this.hbBarClass()),
  );
  protected readonly indeterminateBarClasses = computed(() =>
    cn(
      progressBarVariants({ type: this.hbType(), shape: this.hbShape() }),
      'absolute top-0 animate-[hb-progress-indeterminate_1.5s_infinite_ease-out]',
      this.hbBarClass(),
    ),
  );
}
