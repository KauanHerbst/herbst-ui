export type HbTreeKey = string | number;

export interface HbTreeNode {
  key: HbTreeKey;
  label: string;
  icon?: string;
  children?: HbTreeNode[];
  leaf?: boolean;
  disabled?: boolean;
  selectable?: boolean;
  loading?: boolean;
  data?: unknown;
}

export type HbTreeSelectionMode = 'none' | 'single' | 'multiple';
export type HbTreeFilterMode = 'lenient' | 'strict';

export interface HbTreeFlatNode {
  node: HbTreeNode;
  level: number;
  expandable: boolean;
  expanded: boolean;
  parentKey: HbTreeKey | null;
}

export interface HbTreeIndexEntry {
  node: HbTreeNode;
  parentKey: HbTreeKey | null;
  level: number;
  childKeys: HbTreeKey[];
  descendantKeys: HbTreeKey[];
  ancestorKeys: HbTreeKey[];
}
