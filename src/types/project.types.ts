export interface ProjectPreview {
  id: string;
  name: string;
  type: "CLEAN" | "LITE";
  lastSync: string;
}
export interface Project {
  id: string;
  name: string;
  type: "CLEAN" | "LITE";
  auth: boolean;
  routes: { domaine: string; routeBasePath: string; }[];
  customMiddlewares: { name: string; }[];
  lastSync: string;
}

export interface EpseConfig {
  projectName: string;
  projectType: "lite" | "clean";
  auth: boolean;
  routes: { domaine: string; routeBasePath: string; }[];
  customMiddlewares: { name: string; }[];
}

