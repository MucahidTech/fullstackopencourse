import {
  useAnecdotes,
  useAnecdoteActions,
  useNotificationActions,
} from "../store";

const AnecdoteList = () => {
  const anecdotes = useAnecdotes().toSorted((a, b) => b.votes - a.votes);
  const { vote } = useAnecdoteActions();
  const { showNotification } = useNotificationActions();

  const handleVote = (id, content) => {
    vote(id);
    showNotification(`You voted '${content}'`);
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
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
