import { create } from "zustand";
import { createProjectSlice, type ProjectSlice } from "./project.slice";
import { createToastSlice, type ToastSlice } from "./toast.slice";

const useStore = create<
  ProjectSlice &
  ToastSlice
>((...a) => ({
  ...createProjectSlice(...a),
  ...createToastSlice(...a),
}));

// states
export const useProjects = () => useStore(state => state.projects);

// actions
export const useProjectActions = () => useStore(state => state.actions);
export const useToastActions = () => useStore(state => state.toastActions);
