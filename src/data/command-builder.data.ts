import type { CommandConfigs, RecentGeneration } from "../types/command-builder.types";

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

export const mockRecentGenerations: RecentGeneration[] = [
  { id: "1", command: "epse add route user /users --method GET --controller GetUsers", type: "ROUTE", time: "2 min ago" },
  { id: "2", command: "epse add auth", type: "AUTH", time: "15 min ago" },
  { id: "3", command: "epse add service email", type: "SERVICE", time: "1 hour ago" },
];
