import { useState, useEffect } from "react";
import anecdoteService from "../services/anecdotes";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdoteService.getAll().then((data) => setAnecdotes(data));
  }, []);

  const addAnecdote = (object) => {
    anecdoteService
      .createNew(object)
      .then((newAnecdote) => setAnecdotes(anecdotes.concat(newAnecdote)));
  };

  const deleteAnecdote = (id) => {
    anecdoteService
      .remove(id)
      .then(setAnecdotes(anecdotes.filter((n) => n.id !== id)));
  };

  return { anecdotes, addAnecdote, deleteAnecdote };
};
