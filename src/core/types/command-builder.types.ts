import type { ProjectType } from "./project.types";

export type CommandBuildMode = "interactive" | "manual"

export type CommandType =
  | "generate"
  | "add route"
  | "add middleware"
  | "add auth"
  | "add service"
  | "add repository";

export type CommandTypeLabel = "ROUTE" | "AUTH" | "SERVICE" | "MIDDLEWARE" | "REPOSITORY" | "GENERATE";

export interface CopyHistoryInterface {
  id: string;
  command: string;
  type: string;
  time: string;
}

export interface CommandField {
  key: string;
  label: string;
  placeholder: string;
  type?: "text" | "select";
  options?: string[];
}

export type CommandConfigs = Record<CommandType, { fields: CommandField[] }>;

export interface GenerateCommandArgs {
  projectName: string;
  projectType: ProjectType;
  destination?: string;
}

export interface CreateRouteCommandArgs {
  domain: string;
  routePath: string;
  controllerName: string;
  method?: string;
}

export interface CreateServiceCommandArgs {
  name: string;
}

export interface CreateMiddlewareCommandArgs {
  name: string;
}

export interface CreateRepositoryCommandArgs {
  name: string;
}

export type CommandArgsType = GenerateCommandArgs | CreateRouteCommandArgs | CreateServiceCommandArgs | CreateMiddlewareCommandArgs | CreateRepositoryCommandArgs;

export type ParsedCommandArgsResult =
  | { ok: true; args: CommandArgsType }
  | { ok: false; errors: string[] };

export type CommandBuilderResult =
  | { ok: true; command: string }
  | { ok: false; errors: string[] };

export const HTTP_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
