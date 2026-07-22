import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import blogService from "../services/blogs";

const useBlogsStore = create((set, get) => ({
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
    like: async (id) => {
      const blog = get().blogs.find((b) => b.id === id);
      const updated = await blogService.update(id, {
        ...blog,
        likes: blog.likes + 1,
      });
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === id
            ? { ...updated, user: blog.user, comments: blog.comments }
            : blog
        ),
      }));
    },
    remove: async (id) => {
      await blogService.remove(id);
      set((state) => ({
        blogs: state.blogs.filter((b) => b.id !== id),
      }));
    },
    addComment: async (blogId, comment) => {
      const newComment = await blogService.createComment(blogId, comment);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog.id === blogId
            ? { ...blog, comments: [...blog.comments, newComment] }
            : blog
        ),
      }));
      return newComment;
    },
  },
}));

export const useBlogs = () => useBlogsStore(useShallow((state) => state.blogs));
export const useBlogsControls = () => useBlogsStore((state) => state.actions);
