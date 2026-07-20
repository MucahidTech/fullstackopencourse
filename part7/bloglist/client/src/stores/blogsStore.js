import { create } from "zustand";
import blogService from "../services/blogs";

const useBlogsStore = create((set) => ({
  blogs: [],

  actions: {
    add: async (content) => {
      const blog = await blogService.create(content);
      set((state) => ({ blogs: [...state.blogs, blog] }));
    },
    initialize: async () => {
      const blogs = await blogService.getAll();
      set(() => ({ blogs }));
    },
  },
}));

export const useBlogs = () => useBlogsStore((state) => state.blogs);
export const useBlogsControls = () => useBlogsStore((state) => state.actions);
