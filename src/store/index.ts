import { create } from "zustand";
import { createProjectSlice, type ProjectSlice } from "./project.slice";

const useStore = create<
  ProjectSlice
>((...a) => ({
  ...createProjectSlice(...a)
}));

// states
export const useProjects = () => useStore(state => state.projects);

// actions
export const useProjectActions = () => useStore(state => state.actions);
