import { create } from "zustand";
import blogService from "../services/blogs";
import loginService from "../services/login";

const storedUser = JSON.parse(
  window.localStorage.getItem("loggedBlogappUser") || "null"
);

if (storedUser) {
  blogService.setToken(storedUser.token);
}

const useUserStore = create((set) => ({
  user: storedUser,

  actions: {
    login: async (username, password) => {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      set({ user });
    },

    logout: () => {
      window.localStorage.removeItem("loggedBlogappUser");
      blogService.setToken(null);
      set({ user: null });
    },
  },
}));

export const useUser = () => useUserStore((state) => state.user);
// export const useToken = () => useUserStore((state) => state.token);
export const useUserControls = () => useUserStore((state) => state.actions);
