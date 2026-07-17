export interface AngularTarget {
  project: string;
  stylesPath: string;
}

interface AngularJson {
  defaultProject?: string;
  projects: Record<
    string,
    {
      projectType?: string;
      architect?: { build?: { options?: { styles?: string[] } } };
    }
  >;
}

export function applicationProjects(angularJson: AngularJson): string[] {
  return Object.keys(angularJson.projects).filter(
    (name) => angularJson.projects[name].projectType === 'application',
  );
}

export function pickAngularProject(angularJson: AngularJson, chosen?: string): AngularTarget {
  const apps = applicationProjects(angularJson);
  const project = chosen ?? angularJson.defaultProject ?? apps[0];
  if (!project || !angularJson.projects[project]) {
    throw new Error(`Angular project "${project ?? '(none)'}" not found in angular.json`);
  }
  const styles = angularJson.projects[project].architect?.build?.options?.styles ?? [];
  const stylesPath =
    styles.find((s) => typeof s === 'string' && s.endsWith('.css')) ?? 'src/styles.css';
  return { project, stylesPath };
}
