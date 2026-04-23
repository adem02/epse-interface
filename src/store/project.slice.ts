import type { StateCreator } from "zustand";
import type { Project } from "../core/types";

export interface ProjectSlice {
  projects: Project[],
  actions: {
    setProjects: (projects: Project[]) => void;
    addProject: (project: Project) => void;
    getProjectById: (id: string) => Project | null;
    updateProject: (project: Project) => void;
  }
}

export const createProjectSlice: StateCreator<
  ProjectSlice,
  [],
  [],
  ProjectSlice
> = (set, get) => ({
  projects: [],
  actions: {
    setProjects: (projects: Project[]) => {
      set({projects})
    },
    addProject: (project: Project) => {
      set(state => {
        return {
          projects: [project, ...state.projects]
        }
      })
    },
    getProjectById: (id: string) => {
      const project = get().projects.find(project => project.id === id);

      return project ?? null;
    },
    updateProject: (updatedProject: Project) => {
      set(state => {
        const projects = state.projects.map(project => {
          if (project.id === updatedProject.id) {
            return updatedProject;
          }
          return project;
        })

        return { projects }
      })
    }
  }
});