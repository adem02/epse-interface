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
  projectType: ProjectType;
  database?: boolean;
  auth: boolean;
  routes: { domaine: string; routeBasePath: string; }[];
  customMiddlewares: { name: string; }[];
  lastSync?: string;
}

export interface RouteInterface {
  domaine: string;
  routeBasePath: string;
}

export interface CustomMiddlewareInterface {
  name: string;
}

export type ProjectType = "clean" | "lite";
