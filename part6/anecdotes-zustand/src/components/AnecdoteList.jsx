import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes);
  const { vote, remove } = useAnecdoteActions();
  const { showNotification } = useNotificationActions();

  const handleVote = (id, content) => {
    vote(id);
    showNotification(`You voted '${content}'`);
  };
  const handleDelete = (id, content) => {
    remove(id);
    showNotification(`anecdote '${content}' has been deleted`);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
              vote
            </button>
            {anecdote.votes === 0 && (
              <button
                onClick={() => handleDelete(anecdote.id, anecdote.content)}
              >
                delete
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
