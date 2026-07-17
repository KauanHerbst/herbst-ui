import {
  HbDemoCalendarCellComponent,
  HbDemoCalendarConstraintsComponent,
  HbDemoCalendarPresetsComponent,
  HbDemoCalendarRangeComponent,
  HbDemoCalendarSingleComponent,
} from '../demos/calendar';
import * as cellSource from '../demos/calendar/calendar-cell' with { loader: 'text' };
import * as constraintsSource from '../demos/calendar/calendar-constraints' with { loader: 'text' };
import * as presetsSource from '../demos/calendar/calendar-presets' with { loader: 'text' };
import * as rangeSource from '../demos/calendar/calendar-range' with { loader: 'text' };
import * as singleSource from '../demos/calendar/calendar-single' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const calendarDoc: ComponentDoc = {
  slug: 'calendar',
  title: 'Calendar',
  description: {
    en: 'An inline month grid for picking dates. It selects a single day, a range, or several days, honours min, max, and disabled dates, and offers presets, dropdown captions, multiple months, and a time picker.',
    pt: 'Uma grade de mês inline para escolher datas. Seleciona um único dia, um intervalo ou vários dias, respeita min, max e datas desabilitadas, e oferece presets, legendas em dropdown, múltiplos meses e seletor de hora.',
  },
  demos: [
    {
      id: 'single',
      title: { en: 'Single', pt: 'Único' },
      component: HbDemoCalendarSingleComponent,
      source: sourceText(singleSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'range',
      title: { en: 'Range & two months', pt: 'Intervalo e dois meses' },
      component: HbDemoCalendarRangeComponent,
      source: sourceText(rangeSource),
      align: 'start',
    },
    {
      id: 'constraints',
      title: { en: 'Multiple, min/max & disabled', pt: 'Múltiplo, min/max e desabilitados' },
      component: HbDemoCalendarConstraintsComponent,
      source: sourceText(constraintsSource),
      align: 'start',
    },
    {
      id: 'presets',
      title: { en: 'Presets, dropdowns & time', pt: 'Presets, dropdowns e hora' },
      component: HbDemoCalendarPresetsComponent,
      source: sourceText(presetsSource),
      align: 'start',
    },
    {
      id: 'cell',
      title: { en: 'Custom day cell', pt: 'Célula do dia customizada' },
      component: HbDemoCalendarCellComponent,
      source: sourceText(cellSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-calendar',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'Selected value: a Date, a { start, end } range, an array of Dates, or null.',
            pt: 'Valor selecionado: um Date, um intervalo { start, end }, um array de Dates ou null.',
          },
          type: 'HbCalendarValue',
          default: 'null',
        },
        {
          property: '[hbMode]',
          description: {
            en: 'Selection behaviour.',
            pt: 'Comportamento de seleção.',
          },
          type: `'single' | 'range' | 'multiple'`,
          default: `'single'`,
        },
        {
          property: '[hbDefaultDate]',
          description: {
            en: 'Month shown first when there is no value.',
            pt: 'Mês exibido inicialmente quando não há valor.',
          },
          type: 'Date | null',
          default: 'null',
        },
        {
          property: '[hbMin] / [hbMax]',
          description: {
            en: 'Earliest and latest selectable dates.',
            pt: 'Datas mínima e máxima selecionáveis.',
          },
          type: 'Date | null',
          default: 'null',
        },
        {
          property: '[hbDisabledDates]',
          description: {
            en: 'A list of dates or a predicate that disables days.',
            pt: 'Uma lista de datas ou um predicado que desabilita dias.',
          },
          type: 'Date[] | ((date: Date) => boolean)',
          default: '[]',
        },
        {
          property: '[hbNumberOfMonths]',
          description: {
            en: 'How many months to render side by side.',
            pt: 'Quantos meses renderizar lado a lado.',
          },
          type: 'number',
          default: '1',
        },
        {
          property: '[hbWeekStartsOn]',
          description: {
            en: 'First day of the week (0 = Sunday … 6 = Saturday).',
            pt: 'Primeiro dia da semana (0 = domingo … 6 = sábado).',
          },
          type: '0 | 1 | 2 | 3 | 4 | 5 | 6',
          default: '0',
        },
        {
          property: '[hbCaption]',
          description: {
            en: 'Header as a static label or month/year dropdowns.',
            pt: 'Cabeçalho como rótulo estático ou dropdowns de mês/ano.',
          },
          type: `'label' | 'dropdowns'`,
          default: `'label'`,
        },
        {
          property: '[hbPresets]',
          description: {
            en: 'Quick presets: a label and a value (or a function returning one).',
            pt: 'Presets rápidos: um rótulo e um valor (ou uma função que o retorna).',
          },
          type: 'HbCalendarPreset[]',
          default: '[]',
        },
        {
          property: '[hbShowTime]',
          description: {
            en: 'Add a time picker below the grid.',
            pt: 'Adiciona um seletor de hora abaixo da grade.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbLocale]',
          description: {
            en: 'date-fns locale for month and weekday names.',
            pt: 'Locale do date-fns para nomes de mês e dias da semana.',
          },
          type: 'Locale | null',
          default: 'null',
        },
        {
          property: '[hbTimezone]',
          description: {
            en: 'IANA timezone used to compute the current day.',
            pt: 'Timezone IANA usado para calcular o dia atual.',
          },
          type: 'string | null',
          default: 'null',
        },
        {
          property: '[hbDisabled]',
          description: {
            en: 'Disable the whole calendar.',
            pt: 'Desabilita o calendário inteiro.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: 'ng-template[hbCalendarDay]',
          description: {
            en: 'Replace the content of each day cell. Context: $implicit = date, plus selected, today, disabled, outside, and inRange.',
            pt: 'Substitui o conteúdo de cada célula de dia. Contexto: $implicit = date, mais selected, today, disabled, outside e inRange.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
