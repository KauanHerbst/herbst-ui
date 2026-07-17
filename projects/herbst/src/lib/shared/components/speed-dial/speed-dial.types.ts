export type HbSpeedDialType = 'linear' | 'circle' | 'semi-circle' | 'quarter-circle';

export type HbSpeedDialDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right';

export interface HbSpeedDialItem {
  icon?: string;
  label?: string;
  tooltip?: string;
  disabled?: boolean;
  command?: (item: HbSpeedDialItem) => void;
  ariaLabel?: string;
  styleClass?: string;
  data?: unknown;
}
