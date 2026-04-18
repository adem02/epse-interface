import type { CommandConfigs, CommandType, CommandTypeLabel } from "../types/command-builder.types";

export const mapCommandTypeToLabel = (commandType: CommandType): CommandTypeLabel => {
  const mappedCommandToLabel: Record<CommandType, CommandTypeLabel> = {
    'generate': 'GENERATE',
    'add auth': 'AUTH',
    'add middleware': 'MIDDLEWARE',
    'add repository': 'MIDDLEWARE',
    'add route': 'ROUTE',
    'add service': 'SERVICE'
  }

  return mappedCommandToLabel[commandType];
};

export const commandConfigs: CommandConfigs = {
  generate: {
    fields: [
      { key: "name", label: "PROJECT NAME", placeholder: "my-api" },
      {
        key: "type",
        label: "ARCHITECTURE",
        placeholder: "lite",
        type: "select",
        options: ["lite", "clean"],
      },
      { key: "destination", label: "DESTINATION (optional)", placeholder: "./" },
    ],
  },
  "add route": {
    fields: [
      { key: "domain", label: "DOMAIN NAME", placeholder: "user" },
      { key: "url", label: "ROUTE URL", placeholder: "/users" },
      {
        key: "method",
        label: "HTTP METHOD",
        placeholder: "GET",
        type: "select",
        options: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      },
      { key: "controller", label: "CONTROLLER NAME", placeholder: "GetUsers" },
    ],
  },
  "add middleware": {
    fields: [{ key: "name", label: "MIDDLEWARE NAME", placeholder: "auth" }],
  },
  "add auth": {
    fields: [],
  },
  "add service": {
    fields: [{ key: "name", label: "SERVICE NAME", placeholder: "user" }],
  },
  "add repository": {
    fields: [{ key: "name", label: "REPOSITORY NAME", placeholder: "user" }],
  },
};

