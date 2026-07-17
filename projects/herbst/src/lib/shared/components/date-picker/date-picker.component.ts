import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  type TemplateRef,
  untracked,
  ViewContainerRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { HbCalendarComponent } from '../calendar';
import { HbDatePickerInputDirective } from './date-picker-input.directive';
import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-date-picker',
  template: `
    <span #trigger class="inline-flex w-fit" (click)="toggle($event)">
      <ng-content select="[hbDatePickerTrigger]" />
    </span>

    <ng-template #panel>
      <div [class]="panelClasses()">
        <ng-content />
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'date-picker'" },
  exportAs: 'hbDatePicker',
})
export class HbDatePickerComponent {
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);

  readonly hbCloseOnSelect = input(true, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbOpenChange = output<boolean>();

  private readonly trigger = viewChild.required<ElementRef>('trigger');
  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly calendar = contentChild(HbCalendarComponent);
  private readonly inputDir = contentChild(HbDatePickerInputDirective);

  protected readonly isOpen = signal(false);
  private overlayRef: OverlayRef | null = null;
  private prevValue: unknown;

  protected readonly panelClasses = computed(() => cn('rounded-lg shadow-md outline-none', this.class()));

  constructor() {
    effect(() => {
      const value = this.calendar()?.hbValue();
      const changed = value !== this.prevValue;
      this.prevValue = value;
      if (!changed) return;
      if (untracked(() => this.isOpen()) && this.hbCloseOnSelect() && this.shouldClose(value)) {
        this.close();
      }
    });

    effect(() => {
      const value = this.calendar()?.hbValue();
      const date = value instanceof Date ? value : null;
      untracked(() => this.inputDir()?.display(date));
    });

    effect(() => {
      const typed = this.inputDir()?.typed();
      untracked(() => {
        const calendar = this.calendar();
        if (typed && calendar && calendar.hbMode() === 'single') {
          calendar.hbValue.set(typed);
        }
      });
    });
  }

  protected toggle(event?: Event): void {
    const target = event?.target as HTMLElement | undefined;
    if (target?.closest('[data-slot="date-picker-input"]')) return;
    this.isOpen() ? this.close() : this.open();
  }

  open(): void {
    if (this.overlayRef) return;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger())
      .withPositions([
        { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 6 },
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -6 },
      ])
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
    });
    this.overlayRef.attach(new TemplatePortal(this.panel(), this.vcr));
    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.close();
    });
    this.isOpen.set(true);
    this.hbOpenChange.emit(true);
  }

  close(): void {
    if (!this.overlayRef) return;
    this.overlayRef.dispose();
    this.overlayRef = null;
    this.isOpen.set(false);
    this.hbOpenChange.emit(false);
  }

  private shouldClose(value: unknown): boolean {
    if (value instanceof Date) return true;
    if (value && typeof value === 'object' && 'start' in (value as object)) {
      const range = value as { start: Date | null; end: Date | null };
      return !!range.start && !!range.end;
    }
    return false;
  }
}
