# 💬 Anecdotes (Zustand)

A full-featured anecdote voting app with server communication, filtering, and notifications, all managed with Zustand. Built through exercises 6.2 - 6.15 of Full Stack Open Course.

## 🎯 What it does

- 🗳️ Vote for your favorite anecdotes
- ➕ Add new anecdotes (with server persistence)
- 🔍 Filter anecdotes by content
- 🔔 Shows notifications for votes and additions
- 🗑️ Delete anecdotes with zero votes

## 🧠 What I practiced

- 🗄️ Managing complex state with Zustand (anecdotes, filter, notifications)
- 🌐 Fetching and persisting data to a JSON Server backend using the Fetch API
- 🧪 Testing Zustand stores and custom hooks with Vitest and React Testing Library
- 🔄 Sorting anecdotes immutably with `toSorted`
- 🧩 Creating custom hooks (`useAnecdotes`, `useAnecdoteActions`, `useNotification`)

## 🚀 How to run

```bash
# Install dependencies and start the JSON server
cd part6/anecdotes-zustand
npm install
npm run server

# In a new terminal, start the React app
npm run dev
```

## 📚 Reference

- [Exercises 6.2 - 6.6](https://fullstackopen.com/en/part6/flux_architecture_and_zustand#exercises-6-2-6-6)
- [Exercises 6.6 - 6.15](https://fullstackopen.com/en/part6/complex_state_fetch_testing)
