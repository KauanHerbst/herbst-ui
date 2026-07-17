import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  numberAttribute,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { cn, type ClassValue } from '../../utils';
import { HbMeterGroupEndDirective } from './meter-group-end.directive';
import { HbMeterGroupIconDirective } from './meter-group-icon.directive';
import { HbMeterGroupLabelDirective } from './meter-group-label.directive';
import { HbMeterGroupMeterDirective } from './meter-group-meter.directive';
import { HbMeterGroupStartDirective } from './meter-group-start.directive';
import type {
  HbMeterGroupIconContext,
  HbMeterGroupLabelContext,
  HbMeterGroupLabelPosition,
  HbMeterGroupMeterContext,
  HbMeterGroupOrientation,
  HbMeterItem,
} from './meter-group.types';
import {
  labelItemClass,
  labelsClass,
  meterGroupClass,
  metersHorizontalClass,
  metersVerticalClass,
} from './meter-group.variants';


function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}
interface MeterEntry {
  readonly item: HbMeterItem;
  readonly index: number;
  readonly size: number;
}

@Component({
  selector: 'hb-meter-group',
  imports: [NgTemplateOutlet, NgIcon],
  template: `
    <ng-template #labels>
      @if (labelTpl(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="labelContext()" />
      } @else {
        <ol [class]="labelsListClasses()" data-slot="meter-group-labels">
          @for (m of meters(); track m.index) {
            <li [class]="labelItemClass" data-slot="meter-group-label">
              @if (iconTpl(); as tpl) {
                <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="iconContext(m.item)" />
              } @else if (m.item.icon) {
                <ng-icon [name]="m.item.icon" [style.color]="m.item.color" />
              } @else {
                <span class="size-2 shrink-0 rounded-full" [style.background]="m.item.color"></span>
              }
              <span>{{ m.item.label }}</span>
              <span class="text-muted-foreground">{{ round(m.size) }}%</span>
            </li>
          }
        </ol>
      }
    </ng-template>

    @if (startTpl(); as tpl) {
      <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="labelContext()" />
    }

    @if (hbLabelPosition() === 'start') {
      <ng-container [ngTemplateOutlet]="labels" />
    }

    <div [class]="metersClasses()" data-slot="meter-group-meters" role="meter">
      @for (m of meters(); track m.index) {
        @if (meterTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="meterContext(m)" />
        } @else {
          <span
            class="h-full"
            data-slot="meter-group-meter"
            [style.background]="m.item.color"
            [style.width]="hbOrientation() === 'horizontal' ? m.size + '%' : null"
            [style.height]="hbOrientation() === 'vertical' ? m.size + '%' : null"
          ></span>
        }
      }
    </div>

    @if (hbLabelPosition() === 'end') {
      <ng-container [ngTemplateOutlet]="labels" />
    }

    @if (endTpl(); as tpl) {
      <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="labelContext()" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'meter-group'",
    '[attr.data-orientation]': 'hbOrientation()',
  },
  exportAs: 'hbMeterGroup',
})
export class HbMeterGroupComponent {
  readonly hbValue = input<HbMeterItem[]>([]);
  readonly hbMin = input(0, { transform: numberAttribute });
  readonly hbMax = input(100, { transform: numberAttribute });
  readonly hbOrientation = input<HbMeterGroupOrientation>('horizontal');
  readonly hbLabelPosition = input<HbMeterGroupLabelPosition>('end');
  readonly hbLabelOrientation = input<HbMeterGroupOrientation>('horizontal');
  readonly class = input<ClassValue>('');

  protected readonly labelTpl = contentChild(HbMeterGroupLabelDirective, { read: TemplateRef });
  protected readonly meterTpl = contentChild(HbMeterGroupMeterDirective, { read: TemplateRef });
  protected readonly startTpl = contentChild(HbMeterGroupStartDirective, { read: TemplateRef });
  protected readonly endTpl = contentChild(HbMeterGroupEndDirective, { read: TemplateRef });
  protected readonly iconTpl = contentChild(HbMeterGroupIconDirective, { read: TemplateRef });

  protected readonly labelItemClass = labelItemClass;

  private readonly range = computed(() => {
    const r = this.hbMax() - this.hbMin();
    return r <= 0 ? 1 : r;
  });
  protected readonly meters = computed<MeterEntry[]>(() =>
    this.hbValue().map((item, index) => ({
      item,
      index,
      size: clamp((item.value / this.range()) * 100),
    })),
  );
  private readonly totalPercent = computed(() => this.meters().reduce((sum, m) => sum + m.size, 0));
  private readonly percentages = computed(() => {
    let acc = 0;
    return this.meters().map((m) => (acc += m.size));
  });

  protected readonly classes = computed(() =>
    cn(
      meterGroupClass,
      this.hbOrientation() === 'horizontal' ? 'flex-col' : 'flex-row items-stretch',
      this.class(),
    ),
  );
  protected readonly metersClasses = computed(() =>
    this.hbOrientation() === 'horizontal' ? metersHorizontalClass : metersVerticalClass,
  );
  protected readonly labelsListClasses = computed(() =>
    cn(labelsClass, this.hbLabelOrientation() === 'vertical' ? 'flex-col' : 'flex-wrap'),
  );

  protected round(value: number): number {
    return Math.round(value);
  }

  protected labelContext(): HbMeterGroupLabelContext {
    return {
      $implicit: this.hbValue(),
      totalPercent: this.totalPercent(),
      percentages: this.percentages(),
    };
  }
  protected meterContext(entry: MeterEntry): HbMeterGroupMeterContext {
    return {
      $implicit: entry.item,
      index: entry.index,
      orientation: this.hbOrientation(),
      size: entry.size,
      totalPercent: this.totalPercent(),
    };
  }
  protected iconContext(item: HbMeterItem): HbMeterGroupIconContext {
    return { $implicit: item, icon: item.icon };
  }
}

