import { useAnecdotes } from "../hooks/useAnecdotes";
import useNotification from "../hooks/useNotification";

const AnecdoteForm = () => {
  const { addAnecdote: addAnecdoteToServer } = useAnecdotes();
  const { showNotification } = useNotification();

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.reset();
    if (content.length < 5) {
      showNotification(
        "too short anecdote, must be at least 5 characters long",
      );
      return;
    }
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
