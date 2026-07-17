import {
  HbDemoTabsAdvancedComponent,
  HbDemoTabsAppearanceComponent,
  HbDemoTabsBasicComponent,
} from '../demos/tabs';
import * as advancedSource from '../demos/tabs/tabs-advanced' with { loader: 'text' };
import * as appearanceSource from '../demos/tabs/tabs-appearance' with { loader: 'text' };
import * as basicSource from '../demos/tabs/tabs-basic' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const tabsDoc: ComponentDoc = {
  slug: 'tabs',
  title: 'Tabs',
  description: {
    en: 'A set of panels shown one at a time behind a row of triggers. Two-way bind the active value, choose a line, pills, or underline variant, size and align the triggers, place the list on any side, scroll overflowing tabs with arrows, activate on focus or on click, lazy-render panels, and swap the active indicator with a template.',
    pt: 'Um conjunto de painéis exibidos um por vez atrás de uma fileira de gatilhos. Faça bind bidirecional do valor ativo, escolha a variante line, pills ou underline, dimensione e alinhe os gatilhos, posicione a lista em qualquer lado, role tabs que transbordam com setas, ative por foco ou por clique, renderize painéis sob demanda e troque o indicador ativo por um template.',
  },
  demos: [
    {
      id: 'basic',
      title: { en: 'Value, icons & badges', pt: 'Valor, ícones e badges' },
      component: HbDemoTabsBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'appearance',
      title: {
        en: 'Variant, size, position & align',
        pt: 'Variante, tamanho, posição e alinhamento',
      },
      component: HbDemoTabsAppearanceComponent,
      source: sourceText(appearanceSource),
      align: 'start',
    },
    {
      id: 'advanced',
      title: { en: 'Scroll, manual, lazy & indicator', pt: 'Scroll, manual, lazy e indicador' },
      component: HbDemoTabsAdvancedComponent,
      source: sourceText(advancedSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-tabs',
      rows: [
        {
          property: '[(hbValue)]',
          description: {
            en: 'The active tab value, two-way bound. Any value type — matched by strict equality.',
            pt: 'O valor da tab ativa, bidirecional. Qualquer tipo de valor — comparado por igualdade estrita.',
          },
          type: 'unknown',
          default: 'undefined',
        },
        {
          property: '[hbDefaultValue]',
          description: {
            en: 'Initial value when hbValue is undefined; otherwise the first enabled tab is used.',
            pt: 'Valor inicial quando hbValue é undefined; caso contrário, usa a primeira tab habilitada.',
          },
          type: 'unknown',
          default: 'undefined',
        },
        {
          property: '(hbChange)',
          description: {
            en: 'Emits the value when a tab is activated.',
            pt: 'Emite o valor quando uma tab é ativada.',
          },
          type: 'unknown',
          default: '—',
        },
        {
          property: '[hbVariant]',
          description: {
            en: 'Trigger and indicator styling.',
            pt: 'Estilo dos gatilhos e do indicador.',
          },
          type: `'line' | 'pills' | 'underline'`,
          default: `'line'`,
        },
        {
          property: '[hbSize]',
          description: {
            en: 'Trigger height, padding, and text scale.',
            pt: 'Altura, padding e escala de texto dos gatilhos.',
          },
          type: `'xs' | 'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
        },
        {
          property: '[hbPosition]',
          description: {
            en: 'Side the tab list sits on; left/right make the tabs vertical.',
            pt: 'Lado onde a lista de tabs fica; left/right tornam as tabs verticais.',
          },
          type: `'top' | 'bottom' | 'left' | 'right'`,
          default: `'top'`,
        },
        {
          property: '[hbAlign]',
          description: {
            en: 'Distribution of triggers along the list; stretch makes them fill the width equally.',
            pt: 'Distribuição dos gatilhos ao longo da lista; stretch os faz preencher a largura igualmente.',
          },
          type: `'start' | 'center' | 'end' | 'stretch'`,
          default: `'start'`,
        },
        {
          property: '[hbActivationMode]',
          description: {
            en: 'Automatic activates the focused tab as you arrow through; manual waits for Enter/Space or click.',
            pt: 'Automatic ativa a tab focada conforme você navega com as setas; manual espera Enter/Espaço ou clique.',
          },
          type: `'automatic' | 'manual'`,
          default: `'automatic'`,
        },
      ],
    },
    {
      title: 'hb-tabs — overflow & indicator',
      rows: [
        {
          property: '[hbShowArrows]',
          description: {
            en: 'Force the scroll container and show back/forward arrows when tabs overflow.',
            pt: 'Força o container de rolagem e mostra setas de voltar/avançar quando as tabs transbordam.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbScrollThreshold]',
          description: {
            en: 'Switch to the scrollable list once the tab count exceeds this number (0 disables).',
            pt: 'Passa para a lista rolável quando a contagem de tabs excede este número (0 desabilita).',
          },
          type: 'number',
          default: '0',
        },
        {
          property: '[hbIndicatorClass]',
          description: {
            en: 'Extra classes merged onto the moving active indicator.',
            pt: 'Classes extras mescladas no indicador ativo que se move.',
          },
          type: 'ClassValue',
          default: `''`,
        },
        {
          property: 'exportAs "hbTabs"',
          description: {
            en: 'Reference the instance to read value()/isActive() or call select(value).',
            pt: 'Referencie a instância para ler value()/isActive() ou chamar select(value).',
          },
          type: 'methods',
          default: '—',
        },
      ],
    },
    {
      title: 'Parts',
      rows: [
        {
          property: 'hb-tab-list [class]',
          description: {
            en: 'The role="tablist" row/column of triggers; hosts the indicator and scroll arrows.',
            pt: 'A linha/coluna role="tablist" de gatilhos; hospeda o indicador e as setas de rolagem.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'hb-tab [hbValue] [hbDisabled] [hbIcon] [hbBadge]',
          description: {
            en: 'A trigger. hbValue links it to its panel; hbIcon renders a leading icon; hbBadge shows a count pill.',
            pt: 'Um gatilho. hbValue o liga ao seu painel; hbIcon renderiza um ícone à esquerda; hbBadge mostra uma pílula de contagem.',
          },
          type: 'unknown / boolean / string / string | number',
          default: 'null / false / "" / null',
        },
        {
          property: 'hb-tab-panel [hbValue] [hbLazy]',
          description: {
            en: 'The content for a value; hidden unless active. hbLazy defers rendering until first activated.',
            pt: 'O conteúdo de um valor; oculto a menos que ativo. hbLazy adia a renderização até a primeira ativação.',
          },
          type: 'unknown / boolean',
          default: 'null / false',
        },
        {
          property: 'hb-tab-menu',
          description: {
            en: 'A standalone tab list (its own hb-tabs context) for menu/navigation bars without panels.',
            pt: 'Uma lista de tabs autônoma (com seu próprio contexto hb-tabs) para barras de menu/navegação sem painéis.',
          },
          type: 'component',
          default: '—',
        },
        {
          property: 'ng-template[hbTabsIndicator]',
          description: {
            en: 'Project custom content into the moving active indicator.',
            pt: 'Projeta conteúdo customizado no indicador ativo que se move.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
