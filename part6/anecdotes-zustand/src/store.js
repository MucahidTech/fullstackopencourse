import { create } from "zustand";
import anecdoteService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((n) => n.id === id);
      const updated = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updated : anecdote,
        ),
      }));
    },
    add: async (content) => {
      const anecdote = await anecdoteService.createNew(content);
      set((state) => ({ anecdotes: [...state.anecdotes, anecdote] }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll();
      set(() => ({ anecdotes }));
    },
  },
}));

let timeoutId = null;

const useNotificationStore = create((set) => ({
  message: null,
  actions: {
    showNotification: (message) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      set({ message });

      timeoutId = setTimeout(() => {
        set({ message: null });
        timeoutId = null;
      }, 5000);
    },

    clearNotification: () => {
      if (timeoutId) clearTimeout(timeoutId);
      set({ message: null });
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter((n) =>
    n.content.toLowerCase().includes(filter.toLowerCase()),
  );
};

export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);

export const useNotification = () =>
  useNotificationStore((state) => state.message);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
