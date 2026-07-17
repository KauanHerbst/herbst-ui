import {
  HbDemoChartBarComponent,
  HbDemoChartDoughnutComponent,
  HbDemoChartLineComponent,
  HbDemoChartOptionsComponent,
} from '../demos/chart';
import * as barSource from '../demos/chart/chart-bar' with { loader: 'text' };
import * as doughnutSource from '../demos/chart/chart-doughnut' with { loader: 'text' };
import * as lineSource from '../demos/chart/chart-line' with { loader: 'text' };
import * as optionsSource from '../demos/chart/chart-options' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const chartDoc: ComponentDoc = {
  slug: 'chart',
  title: 'Chart',
  description: {
    en: 'A thin wrapper over Chart.js. Pass a type and data, colour each series through hbConfig, and reach any Chart.js option through hbOptions; the theme, legend, and tooltip are handled for you.',
    pt: 'Uma camada fina sobre o Chart.js. Passe um tipo e os dados, colora cada série pelo hbConfig e alcance qualquer opção do Chart.js pelo hbOptions; o tema, a legenda e o tooltip já são tratados.',
  },
  demos: [
    {
      id: 'bar',
      title: { en: 'Bar', pt: 'Barra' },
      component: HbDemoChartBarComponent,
      source: sourceText(barSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'line',
      title: { en: 'Line', pt: 'Linha' },
      component: HbDemoChartLineComponent,
      source: sourceText(lineSource),
      align: 'start',
    },
    {
      id: 'doughnut',
      title: { en: 'Doughnut', pt: 'Rosca' },
      component: HbDemoChartDoughnutComponent,
      source: sourceText(doughnutSource),
      align: 'start',
    },
    {
      id: 'options',
      title: { en: 'Stacked & custom options', pt: 'Empilhado e opções customizadas' },
      component: HbDemoChartOptionsComponent,
      source: sourceText(optionsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-chart',
      rows: [
        {
          property: '[hbType]',
          description: {
            en: 'Chart.js chart type (bar, line, doughnut, pie, radar, …). Required.',
            pt: 'Tipo de gráfico do Chart.js (bar, line, doughnut, pie, radar, …). Obrigatório.',
          },
          type: 'ChartType',
          default: '—',
        },
        {
          property: '[hbData]',
          description: {
            en: 'Chart.js data — labels and datasets. Required.',
            pt: 'Dados do Chart.js — labels e datasets. Obrigatório.',
          },
          type: 'HbChartData',
          default: '—',
        },
        {
          property: '[hbConfig]',
          description: {
            en: 'Per-series settings (label, color, icon, theme), keyed by dataset or slice label.',
            pt: 'Ajustes por série (label, color, icon, theme), indexados pela label do dataset ou da fatia.',
          },
          type: 'HbChartConfig',
          default: '{}',
        },
        {
          property: '[hbOptions]',
          description: {
            en: 'Raw Chart.js options merged over the themed defaults.',
            pt: 'Opções cruas do Chart.js mescladas sobre os padrões do tema.',
          },
          type: 'HbChartOptions',
          default: '{}',
        },
        {
          property: '[hbLegend]',
          description: {
            en: 'Show the legend.',
            pt: 'Mostra a legenda.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbTooltip]',
          description: {
            en: 'Enable hover tooltips.',
            pt: 'Habilita os tooltips ao passar o mouse.',
          },
          type: 'boolean',
          default: 'true',
        },
        {
          property: '[hbHeight]',
          description: {
            en: 'CSS height of the chart canvas.',
            pt: 'Altura CSS do canvas do gráfico.',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[class]',
          description: {
            en: 'Extra CSS classes; give the host a definite width for the responsive canvas.',
            pt: 'Classes CSS extras; dê uma largura definida ao host para o canvas responsivo.',
          },
          type: 'string',
          default: `''`,
        },
      ],
    },
  ],
};
