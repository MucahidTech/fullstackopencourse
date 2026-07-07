import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes();
  const { showNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    addAnecdoteToServer(content);
    showNotification(`anecdote '${content}' added`);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
