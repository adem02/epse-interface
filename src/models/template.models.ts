import type { ProjectType } from "../types/project.types";

export interface CreateTemplateBlueprintData {
  name: string;
  title: string;
  description: string;
  projectType: ProjectType;
  command: string;
  commands: string[];
}
