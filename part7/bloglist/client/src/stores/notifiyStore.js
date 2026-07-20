import { create } from "zustand";

let timeoutId = null;

const useNotifyStore = create((set) => ({
  notification: null,
  type: null,
  actions: {
    show: (msg, type = "success") => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      set({ notification: msg, type });

      timeoutId = setTimeout(() => {
        set({ notification: null, type: null });
        timeoutId = null;
      }, 3000);
    },
  },
}));

export const useNotify = () => useNotifyStore((state) => state.notification);
export const useNotifyType = () => useNotifyStore((state) => state.type);
export const useNotifyControls = () => useNotifyStore((state) => state.actions);
