import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbStepContentDirective } from './step-content.directive';
import { HB_STEPPER, type HbStepRef, type HbStepValue } from './stepper.token';
import { connectorVariants, stepMarkerVariants } from './stepper.variants';

@Component({
  selector: 'hb-step',
  imports: [NgIcon, NgTemplateOutlet],
  viewProviders: [provideIcons({ phosphorCheck })],
  template: `
    @if (orientation() === 'horizontal') {
      <button
        type="button"
        class="flex items-center gap-2.5 text-left disabled:cursor-default"
        data-slot="step-trigger"
        [disabled]="!clickable()"
        [attr.aria-current]="isActive() ? 'step' : null"
        (click)="onActivate()"
      >
        <ng-container [ngTemplateOutlet]="marker" />
        <ng-container [ngTemplateOutlet]="labels" />
      </button>
      @if (!isLast()) {
        <span [class]="connectorClasses()" data-slot="step-connector" class="mx-2.5"></span>
      }
    } @else {
      <div class="flex flex-col items-center self-stretch">
        <button
          type="button"
          class="rounded-full disabled:cursor-default"
          data-slot="step-trigger"
          [disabled]="!clickable()"
          [attr.aria-current]="isActive() ? 'step' : null"
          (click)="onActivate()"
        >
          <ng-container [ngTemplateOutlet]="marker" />
        </button>
        @if (!isLast()) {
          <span [class]="connectorClasses()" data-slot="step-connector" class="my-1.5"></span>
        }
      </div>
      <div class="flex flex-1 flex-col pb-6">
        <button
          type="button"
          class="text-left disabled:cursor-default"
          [disabled]="!clickable()"
          (click)="onActivate()"
        >
          <ng-container [ngTemplateOutlet]="labels" />
        </button>
        @if (isActive() && contentTemplate(); as tpl) {
          <div class="pt-2" data-slot="step-content">
            <ng-container
              [ngTemplateOutlet]="tpl"
              [ngTemplateOutletContext]="{ $implicit: stepper.contextFor(index()) }"
            />
          </div>
        }
      </div>
    }

    <ng-template #marker>
      <span [class]="markerClasses()" data-slot="step-marker" [attr.data-state]="state()">
        @if (state() === 'completed') {
          <ng-icon name="phosphorCheck" />
        } @else if (hbIcon(); as icon) {
          <ng-icon [name]="icon" />
        } @else {
          {{ index() + 1 }}
        }
      </span>
    </ng-template>

    <ng-template #labels>
      <span class="flex min-w-0 flex-col">
        <span
          class="truncate text-sm font-medium"
          [class.text-foreground]="isActive() || state() === 'completed'"
          [class.text-muted-foreground]="state() === 'inactive'"
          >{{ hbTitle() }}</span
        >
        @if (hbDescription()) {
          <span class="truncate text-xs text-muted-foreground">{{ hbDescription() }}</span>
        }
      </span>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-slot]': "'step'",
    '[attr.data-state]': 'state()',
  },
  exportAs: 'hbStep',
})
export class HbStepComponent implements HbStepRef {
  protected readonly stepper = inject(HB_STEPPER);

  readonly hbValue = input<HbStepValue | undefined>(undefined);
  readonly hbTitle = input('');
  readonly hbDescription = input('');
  readonly hbIcon = input<string>();
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly contentTemplate = contentChild(HbStepContentDirective, { read: TemplateRef });

  readonly index = computed<number>(() => this.stepper.indexOf(this));
  readonly value = computed<HbStepValue>(() => this.hbValue() ?? this.index() + 1);
  readonly disabled = this.hbDisabled;

  protected readonly orientation = this.stepper.orientation;
  protected readonly isActive = computed(() => this.value() === this.stepper.active());
  protected readonly state = computed<'inactive' | 'active' | 'completed'>(() => {
    if (this.isActive()) return 'active';
    if (this.stepper.isCompleted(this.index())) return 'completed';
    return 'inactive';
  });
  protected readonly isLast = computed(() => this.index() === this.stepper.steps().length - 1);
  protected readonly clickable = computed(
    () => !this.hbDisabled() && this.stepper.canActivate(this.index()),
  );

  protected readonly hostClasses = computed(() => {
    if (this.orientation() === 'horizontal') {
      return cn('flex items-center', !this.isLast() && 'flex-1', this.class());
    }
    return cn('flex gap-3', this.class());
  });
  protected readonly markerClasses = computed(() => stepMarkerVariants({ state: this.state() }));
  protected readonly connectorClasses = computed(() =>
    connectorVariants({
      orientation: this.orientation(),
      completed: this.stepper.isCompleted(this.index()),
    }),
  );

  protected onActivate(): void {
    if (this.clickable()) this.stepper.activate(this.value());
  }
}
