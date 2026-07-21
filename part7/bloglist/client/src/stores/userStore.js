import { create } from "zustand";
import blogService from "../services/blogs";
import loginService from "../services/login";
import localService from "../services/persistentUser";

const storedUser = localService.getUser();

if (storedUser) {
  blogService.setToken(storedUser.token);
}

const useUserStore = create((set) => ({
  user: storedUser || null,

  actions: {
    login: async (username, password) => {
      const user = await loginService.login({ username, password });
      localService.saveUser(user);
      blogService.setToken(user.token);
      set({ user });
    },

    logout: () => {
      localService.removeUser();
      blogService.setToken(null);
      set({ user: null });
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserControls = () => useUserStore((state) => state.actions);
