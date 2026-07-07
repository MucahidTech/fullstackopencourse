# ⚛️ Anecdotes (TanStack Query)

A modern anecdote app leveraging TanStack Query for efficient server-state management, with notifications handled via React Context. Built through exercises 6.16 - 6.22 of Full Stack Open Course.

## 🎯 What it does

- 📖 Fetches and displays anecdotes from a server
- ➕ Adds new anecdotes with content validation (min 5 characters)
- 🗳️ Votes on anecdotes with automatic UI updates
- 🔔 Displays success and error notifications using the Context API

## 🧠 What I practiced

- 🔄 Managing server-state with TanStack Query (`useQuery`, `useMutation`)
- 📦 Handling client-state and notifications with React Context API
- 🧹 Creating custom hooks (`useAnecdotes`, `useNotification`)
- 🌐 Making HTTP requests using the native Fetch API
- 🧪 Error handling for network failures and server validation

## 🚀 How to run

```bash
# Install dependencies and start the JSON server
cd part6/anecdotes-tanstack
npm install
npm run server

# In a new terminal, start the React app
npm run dev
```

## 📚 Reference

- [Exercises 6.16 - 6.22](https://fullstackopen.com/en/part6/react_query_context_api)
