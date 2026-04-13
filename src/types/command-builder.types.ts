export type CommandType =
  | "generate"
  | "add route"
  | "add middleware"
  | "add auth"
  | "add service"
  | "add repository";

export interface RecentGeneration {
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
