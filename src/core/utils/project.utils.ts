import type { EpseConfig, Project } from "../types/project.types";

export const mapProjectToEpseConfig = (project: Project): EpseConfig => {
  return {
    projectName: project.name,
    projectType: project.type,
    controllersPath: project.controllersPath,
    database: project.database,
    auth: project.auth,
    routes: project.routes,
    customMiddlewares: project.customMiddlewares
  }
}

export const parseJsonDataToEpseConfig = (jsonData: any): EpseConfig => {
  return {
    projectName: jsonData.projectName,
    projectType: jsonData.projectType,
    controllersPath: jsonData.controllersPath,
    database: jsonData.database,
    auth: jsonData.auth,
    routes: jsonData.routes,
    customMiddlewares: jsonData.customMiddlewares
  }
}