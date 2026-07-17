export const ALIAS_TOKEN = '{{alias}}';

export const DEFAULT_REGISTRY =
  'https://raw.githubusercontent.com/KauanHerbst/herbst-ui/main/registry';

export interface HerbstConfig {
  componentsDir: string;
  alias: string;
  stylesPath: string;
  iconProvider: string;
  registry?: string;
}

export interface RegistryFile {
  path: string;
  content: string;
}

export type RegistryType = 'registry:component' | 'registry:lib';

export interface RegistryItem {
  name: string;
  type: RegistryType;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
  files: RegistryFile[];
  demos?: RegistryFile[];
}

export interface RegistryIndexEntry {
  name: string;
  type: RegistryType;
  dependencies: string[];
  devDependencies: string[];
  registryDependencies: string[];
}

export interface RegistryIndex {
  version: string;
  items: RegistryIndexEntry[];
}
