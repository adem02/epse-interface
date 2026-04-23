export interface ProjectPreview {
  id: string;
  name: string;
  type: "CLEAN" | "LITE";
  lastSync: string;
}
export interface Project {
  id: string;
  ownerId: string;
  name: string;
  type: ProjectType;
  controllersPath?: string;
  database: boolean;
  auth: boolean;
  routes: { domain: string; routeBasePath: string; }[];
  customMiddlewares: { name: string; }[];
  lastSync: Date;
}

export interface EpseConfig {
  projectName: string;
  projectType: ProjectType;
  controllersPath?: string;
  database: boolean;
  auth: boolean;
  routes: { domain: string; routeBasePath: string; }[];
  customMiddlewares: { name: string; }[];
}

export interface RouteInterface {
  domain: string;
  routeBasePath: string;
}

export interface CustomMiddlewareInterface {
  name: string;
}

export type ProjectType = "clean" | "lite";
