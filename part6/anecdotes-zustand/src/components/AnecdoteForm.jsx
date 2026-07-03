import { useAnecdoteActions, getId } from "../store";

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    add({ id: getId(), content, votes: 0 });
    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
