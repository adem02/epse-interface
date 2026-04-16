import type { Blueprint } from "../types/templates.types";

export const templatesBlueprints: Blueprint[] = [
  {
    id: "1",
    name: "PATTERN 01",
    title: "REST API",
    description:
      "Minimal Express/TypeScript structure with routes, controllers and error handling. Ready for a straightforward REST API.",
    command: "epse generate my-project --lite",
    commands: [
      "epse generate my-project --lite",
      "epse add route user /users --method GET --controller GetUsers",
      "epse add route user /users/:id --method GET --controller GetUserById",
      "epse add route user /users --method POST --controller CreateUser",
      "epse add middleware logger",
    ],
  },
  {
    id: "2",
    name: "PATTERN 02",
    title: "Auth Stack",
    description:
      "Complete JWT authentication setup with login, register, middleware and routes. Works on both Lite and Clean architectures.",
    command: "epse add auth",
    commands: [
      "epse generate my-project --lite",
      "epse add auth",
      "epse add route user /users --method GET --controller GetUsers",
      "epse add middleware rateLimiter",
    ],
  },
  {
    id: "3",
    name: "PATTERN 03",
    title: "CRUD API",
    description:
      "Full CRUD scaffold for a resource-driven API. Generates all routes, service and repository in one flow.",
    command: "epse add route user /users --crud",
    commands: [
      "epse generate my-project --lite",
      "epse add route user /users --crud",
      "epse add service user",
      "epse add repository user",
      "epse add middleware errorHandler",
    ],
  },
];
