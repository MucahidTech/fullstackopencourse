import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useAnecdotesActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Test", votes: 0 }];
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("filter anecdotes according to user search", async () => {
    const anecdote1 = { id: 1, content: "Test", votes: 0 };
    const anecdote2 = { id: 2, content: "filtered", votes: 0 };
    useAnecdoteStore.setState({ anecdotes: [anecdote1, anecdote2] });

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.setFilter("filter");
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual([anecdote2]);
  });

  it("vote increases the number of votes for an anecdote", async () => {
    const anecdote = { id: 1, content: "Test", votes: 0 };
    useAnecdoteStore.setState({ anecdotes: [anecdote] });
    anecdoteService.update.mockResolvedValue({
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.vote(1);
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current[0].votes).toBe(1);
  });
});
