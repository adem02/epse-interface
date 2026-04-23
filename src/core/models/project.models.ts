import type { CustomMiddlewareInterface, ProjectType, RouteInterface } from "../types/project.types";

export interface CreateProjectData {
  ownerId: string;
  name: string;
  type: ProjectType;
  database: boolean;
  auth: boolean;
  routes: RouteInterface[];
  customMiddlewares: CustomMiddlewareInterface[];
  lastSync: Date;
}

export interface UpdateProjectData {
  name: string;
  type: ProjectType;
  database: boolean;
  controllersPath?: string;
  auth: boolean;
  routes: RouteInterface[];
  customMiddlewares: CustomMiddlewareInterface[];
  lastSync: Date;
}
