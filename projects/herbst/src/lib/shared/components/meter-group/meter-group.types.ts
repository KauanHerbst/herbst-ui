export type HbMeterGroupOrientation = 'horizontal' | 'vertical';
export type HbMeterGroupLabelPosition = 'start' | 'end';

export interface HbMeterItem {
  readonly label: string;
  readonly value: number;
  readonly color?: string;
  readonly icon?: string;
}

export interface HbMeterGroupLabelContext {
  readonly $implicit: HbMeterItem[];
  readonly totalPercent: number;
  readonly percentages: number[];
}

export interface HbMeterGroupMeterContext {
  readonly $implicit: HbMeterItem;
  readonly index: number;
  readonly orientation: HbMeterGroupOrientation;
  readonly size: number;
  readonly totalPercent: number;
}

export interface HbMeterGroupIconContext {
  readonly $implicit: HbMeterItem;
  readonly icon: string | undefined;
}
