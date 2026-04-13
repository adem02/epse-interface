import type { EpseConfig } from "../types/project.types";

export const projectDetailMockConfig: EpseConfig = {
  projectName: "my-api-service",
  projectType: "lite",
  auth: true,
  routes: [{ domaine: "api.domain.com", routeBasePath: "/api/v1" }],
  customMiddlewares: [
    { name: "request_logger" },
    { name: "cors_handler" },
    { name: "auth_enforcer" },
  ],
};
