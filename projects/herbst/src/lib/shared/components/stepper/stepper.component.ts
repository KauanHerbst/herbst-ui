import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  forwardRef,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbStepComponent } from './step.component';
import {
  HB_STEPPER,
  type HbStepContext,
  type HbStepperContext,
  type HbStepperOrientation,
  type HbStepValue,
} from './stepper.token';
import { stepListClass, stepperClass } from './stepper.variants';

@Component({
  selector: 'hb-stepper',
  imports: [NgTemplateOutlet],
  providers: [{ provide: HB_STEPPER, useExisting: forwardRef(() => HbStepperComponent) }],
  template: `
    <div
      [class]="listClasses()"
      data-slot="stepper-list"
      role="tablist"
      [attr.aria-orientation]="hbOrientation()"
    >
      <ng-content />
    </div>

    @if (hbOrientation() === 'horizontal' && activeTemplate(); as tpl) {
      <div class="mt-4 w-full" data-slot="stepper-content">
        <ng-container
          [ngTemplateOutlet]="tpl"
          [ngTemplateOutletContext]="{ $implicit: contextFor(activeIndex()) }"
        />
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'stepper'",
    '[attr.data-orientation]': 'hbOrientation()',
  },
  exportAs: 'hbStepper',
})
export class HbStepperComponent implements HbStepperContext {
  readonly hbValue = model<HbStepValue>(1);
  readonly hbOrientation = input<HbStepperOrientation>('horizontal');
  readonly hbLinear = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  private readonly stepQuery = contentChildren(HbStepComponent);

  readonly orientation = this.hbOrientation;
  readonly linear = this.hbLinear;
  readonly active = this.hbValue.asReadonly();
  readonly steps = this.stepQuery;

  readonly activeIndex = computed(() => {
    const i = this.stepQuery().findIndex((s) => s.value() === this.hbValue());
    return i === -1 ? 0 : i;
  });
  readonly isFirst = computed(() => this.activeIndex() <= 0);
  readonly isLast = computed(() => this.activeIndex() >= this.stepQuery().length - 1);

  protected readonly classes = computed(() => cn(stepperClass, 'flex-col', this.class()));
  protected readonly listClasses = computed(() =>
    cn(stepListClass, this.hbOrientation() === 'horizontal' ? 'w-full items-center' : 'flex-col'),
  );
  protected readonly activeTemplate = computed(
    () => this.stepQuery()[this.activeIndex()]?.contentTemplate() ?? null,
  );

  indexOf(step: HbStepComponent): number {
    return this.stepQuery().indexOf(step);
  }
  isCompleted(index: number): boolean {
    return index < this.activeIndex();
  }
  canActivate(index: number): boolean {
    return !this.hbLinear() || index <= this.activeIndex();
  }
  activate(value: HbStepValue): void {
    this.hbValue.set(value);
  }
  next(): void {
    const arr = this.stepQuery();
    const i = this.activeIndex();
    if (i < arr.length - 1) this.hbValue.set(arr[i + 1].value());
  }
  prev(): void {
    const arr = this.stepQuery();
    const i = this.activeIndex();
    if (i > 0) this.hbValue.set(arr[i - 1].value());
  }
  contextFor(index: number): HbStepContext {
    return {
      active: this.hbValue(),
      index,
      isFirst: index === 0,
      isLast: index === this.stepQuery().length - 1,
      next: () => this.next(),
      prev: () => this.prev(),
      activate: (value: HbStepValue) => this.activate(value),
    };
  }
}
