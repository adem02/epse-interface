import type { ProjectPreview as DashboardProject } from "../types/project.types";
import type { Project } from "../types/project.types";

export const projectsPageMockData: Project[] = [
  {
    id: "1",
    name: "core-api-service",
    type: "CLEAN",
    auth: true,
    routes: [{ domaine: "user", routeBasePath: "/users" }],
    customMiddlewares: [{ name: "auth" }],
    lastSync: "2023-11-24T14:22:01Z",
  },
  {
    id: "2",
    name: "mobile-auth-v2",
    type: "LITE",
    auth: false,
    routes: [],
    customMiddlewares: [],
    lastSync: "2023-11-24T12:05:44Z",
  },
  {
    id: "3",
    name: "legacy-gateway",
    type: "CLEAN",
    auth: true,
    routes: [
      { domaine: "product", routeBasePath: "/products" },
      { domaine: "order", routeBasePath: "/orders" },
    ],
    customMiddlewares: [{ name: "cors" }, { name: "logger" }],
    lastSync: "2023-11-23T09:11:15Z",
  },
  {
    id: "4",
    name: "payment-gateway",
    type: "CLEAN",
    auth: true,
    routes: [{ domaine: "payment", routeBasePath: "/payments" }],
    customMiddlewares: [],
    lastSync: "2023-11-22T23:09:00Z",
  },
];

export const dashboardProjectsMockData: DashboardProject[] = [
  { id: "1", name: "epse-core-alpha", type: "CLEAN", lastSync: "2023-11-24T14:22:01Z" },
  { id: "2", name: "edge-router-minimal", type: "LITE", lastSync: "2023-11-24T12:05:44Z" },
  { id: "3", name: "v3-deployment-clean", type: "CLEAN", lastSync: "2023-11-23T09:11:15Z" },
  { id: "4", name: "beta-sandbox-node", type: "LITE", lastSync: "2023-11-22T23:09:00Z" },
];

export const dashboardTotalRoutes = 128;
