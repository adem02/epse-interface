import type { CustomMiddlewareInterface, RouteInterface } from "../types/project.types";

export interface CreateEpseConfigData {
  projectName: string;
  projectType: "lite" | "clean";
  database: boolean;
  auth: boolean;
  routes: RouteInterface[];
  customMiddlewares: CustomMiddlewareInterface[];
  createdAt: Date;
}
