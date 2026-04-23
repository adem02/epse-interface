import { toast } from "sonner"
import type { StateCreator } from "zustand"

export interface ToastSlice {
  toastActions: {
    success: (message: string) => void
    error: (message: string) => void,
    warning: (message: string) => void,
    info: (message: string) => void,
  }
}

export const createToastSlice: StateCreator<
  ToastSlice,
  [],
  [],
  ToastSlice
> = () => ({
  toastActions: {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    warning: (message: string) => toast.warning(message),
    info: (message: string) => toast.info(message),
  }
})
