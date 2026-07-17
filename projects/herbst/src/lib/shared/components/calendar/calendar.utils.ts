import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  isAfter,
  isBefore,
  isSameDay,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

export type HbCalendarWeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface HbCalendarDateRange {
  start: Date | null;
  end: Date | null;
}

export type HbCalendarValue = Date | HbCalendarDateRange | Date[] | null;

export interface HbCalendarPreset {
  label: string;
  value: HbCalendarValue | (() => HbCalendarValue);
}
export type HbCalendarDisabledDates = Date[] | ((date: Date) => boolean);

export function todayInZone(timezone: string | null): Date {
  const now = new Date();
  const zoned = timezone ? toZonedTime(now, timezone) : now;
  return new Date(zoned.getFullYear(), zoned.getMonth(), zoned.getDate());
}

export function buildMonthMatrix(monthDate: Date, weekStartsOn: HbCalendarWeekStart): Date[][] {
  const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn });
  const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn });
  const days = eachDayOfInterval({ start, end });
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function isDateDisabled(
  date: Date,
  min: Date | null,
  max: Date | null,
  disabled: HbCalendarDisabledDates,
): boolean {
  const day = startOfDay(date);
  if (min && isBefore(day, startOfDay(min))) return true;
  if (max && isAfter(day, startOfDay(max))) return true;
  if (typeof disabled === 'function') return disabled(date);
  return disabled.some((d) => isSameDay(d, date));
}
