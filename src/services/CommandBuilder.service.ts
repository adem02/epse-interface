import {
  HTTP_METHODS,
  type CommandArgsType,
  type CommandBuilderResult,
  type CommandType,
  type CreateMiddlewareCommandArgs,
  type CreateRepositoryCommandArgs,
  type CreateRouteCommandArgs,
  type CreateServiceCommandArgs,
  type GenerateCommandArgs,
  type ParsedCommandArgsResult,
} from "../types/command-builder.types";
import type { ProjectType } from "../types/project.types";


export class CommandBuilderService {
  private readonly commandType: CommandType;
  private readonly fields: Record<string, string>;

  constructor(commandType: CommandType, fields: Record<string, string>) {
    this.commandType = commandType;
    this.fields = fields;
  }

  static createCommand(commandType: CommandType, fields: Record<string, string>): CommandBuilderResult {
    const service = new CommandBuilderService(commandType, fields);
    const parsed = service.parseFields();

    if (!parsed.ok) {
      return parsed;
    }

    return {
      ok: true,
      command: service.formatCommand(parsed.args),
    };
  }

  parseFields(): ParsedCommandArgsResult {
    switch (this.commandType) {
      case "generate":
        return this.parseGenerateCommandFields();
      case "add route":
        return this.parseCreateRouteCommandFields();
      case "add middleware":
        return this.parseCreateMiddlewareCommandFields();
      case "add service":
        return this.parseCreateServiceCommandFields();
      case "add repository":
        return this.parseCreateRepositoryCommandFields();
      default:
        return { ok: false, errors: ["Unsupported command type."] };
    }
  }

  private formatCommand(args: CommandArgsType): string {
    switch (this.commandType) {
      case "generate": {
        const generateArgs = args as GenerateCommandArgs;
        const tokens = ["epse", "generate", generateArgs.projectName];

        if (generateArgs.destination) {
          tokens.push(generateArgs.destination);
        } else if (!generateArgs.destination) {
          tokens.push('.')
        }

        tokens.push(`--${generateArgs.projectType}`);
        return tokens.join(" ");
      }
      case "add route": {
        const routeArgs = args as CreateRouteCommandArgs;
        const tokens = [
          "epse",
          "add",
          "route",
          routeArgs.domain,
          routeArgs.routePath,
          `--controller=${routeArgs.controllerName}`,
        ];

        if (routeArgs.method && routeArgs.method !== "GET") {
          tokens.push(`--method=${routeArgs.method}`);
        }

        return tokens.join(" ");
      }
      case "add service":
        return `epse add service ${(args as CreateServiceCommandArgs).name}`;
      case "add middleware":
        return `epse add middleware ${(args as CreateMiddlewareCommandArgs).name}`;
      case "add repository":
        return `epse add repository ${(args as CreateRepositoryCommandArgs).name}`;
      case "add auth":
        return "epse add auth";
      default:
        return "";
    }
  }

  private parseGenerateCommandFields(): ParsedCommandArgsResult {
    const projectName = this.getRequiredField("name");
    const rawProjectType = this.getRequiredField("type");
    const destination = this.getOptionalField("destination");

    const errors: string[] = [];

    if (!projectName) {
      errors.push("PROJECT NAME is required.");
    }

    if (!rawProjectType) {
      errors.push("ARCHITECTURE is required.");
    } else if (!this.isProjectType(rawProjectType)) {
      errors.push("ARCHITECTURE must be 'lite' or 'clean'.");
    }

    if (!projectName || !rawProjectType || !this.isProjectType(rawProjectType)) {
      return {
        ok: false,
        errors: errors.length > 0 ? errors : ["Invalid generate command arguments."],
      };
    }

    return {
      ok: true,
      args: {
        projectName,
        projectType: rawProjectType as ProjectType,
        destination,
      },
    };
  }

  private parseCreateRouteCommandFields(): ParsedCommandArgsResult {
    const domain = this.getRequiredField("domain");
    const routePath = this.getRequiredField("url");
    const controllerName = this.getRequiredField("controller");
    const rawMethod = this.getOptionalField("method")?.toUpperCase();

    const errors: string[] = [];

    if (!domain) {
      errors.push("DOMAIN NAME is required.");
    }

    if (!routePath) {
      errors.push("ROUTE URL is required.");
    }

    if (!controllerName) {
      errors.push("CONTROLLER NAME is required.");
    }

    if (rawMethod && !HTTP_METHODS.includes(rawMethod as (typeof HTTP_METHODS)[number])) {
      errors.push("HTTP METHOD must be GET, POST, PUT, PATCH, or DELETE.");
    }

    if (!domain || !routePath || !controllerName) {
      return { ok: false, errors };
    }

    return {
      ok: true,
      args: {
        domain,
        routePath,
        controllerName,
        method: rawMethod,
      },
    };
  }

  private parseCreateServiceCommandFields(): ParsedCommandArgsResult {
    const name = this.getRequiredField("name");

    if (!name) {
      return { ok: false, errors: ["SERVICE NAME is required."] };
    }

    return { ok: true, args: { name } };
  }

  private parseCreateMiddlewareCommandFields(): ParsedCommandArgsResult {
    const name = this.getRequiredField("name");

    if (!name) {
      return { ok: false, errors: ["MIDDLEWARE NAME is required."] };
    }

    return { ok: true, args: { name } };
  }

  private parseCreateRepositoryCommandFields(): ParsedCommandArgsResult {
    const name = this.getRequiredField("name");

    if (!name) {
      return { ok: false, errors: ["REPOSITORY NAME is required."] };
    }

    return { ok: true, args: { name } };
  }

  private getRequiredField(key: string): string | undefined {
    const rawValue = this.fields[key];

    if (typeof rawValue !== "string") {
      return undefined;
    }

    const value = rawValue.trim();
    return value.length > 0 ? value : undefined;
  }

  private getOptionalField(key: string): string | undefined {
    const rawValue = this.fields[key];

    if (typeof rawValue !== "string") {
      return undefined;
    }

    const value = rawValue.trim();
    return value.length > 0 ? value : undefined;
  }

  private isProjectType(value: string): value is ProjectType {
    return value === "lite" || value === "clean";
  }
}
