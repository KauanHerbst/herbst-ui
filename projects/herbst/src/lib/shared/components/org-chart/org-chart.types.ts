export type HbOrgChartKey = string | number;

export type HbOrgChartSelectionMode = 'none' | 'single' | 'multiple' | 'checkbox';

export type HbOrgChartLayout = 'vertical' | 'horizontal';

export interface HbOrgChartNode {
  key: HbOrgChartKey;
  label?: string;
  type?: string;
  data?: unknown;
  children?: HbOrgChartNode[];
  selectable?: boolean;
  collapsible?: boolean;
  styleClass?: string;
}

export interface HbOrgChartIndexEntry {
  node: HbOrgChartNode;
  parentKey: HbOrgChartKey | null;
  childKeys: HbOrgChartKey[];
  descendantKeys: HbOrgChartKey[];
}
