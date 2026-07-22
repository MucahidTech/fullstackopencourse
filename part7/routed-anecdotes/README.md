# 📖 Routed Anecdotes

A React app for managing software engineering anecdotes with routing, custom hooks, and full CRUD operations. Built through exercises 7.1 - 7.6 of Full Stack Open Course.

## 🎯 What it does

- 📋 Displays a list of anecdotes
- ➕ Create new anecdotes with validation (min 5 characters)
- 🗑️ Delete anecdotes
- 🧭 Navigate between views using React Router
- 🔄 Fetch and persist data to a JSON Server backend

## 🧠 What I practiced

- ⚓ Creating custom hooks: `useField` (form input management with reset) and `useAnecdotes` (server communication)
- 🧭 Client-side routing with React Router
- 🧩 Separating logic from UI with custom hooks
- 🌐 Using the Fetch API for HTTP requests
- 🧹 Refactoring to remove prop drilling and let components call hooks directly

## 🚀 How to run

```bash
cd part7/routed-anecdotes
npm install

# Start the JSON server
npm run server

# Start the React app (in a new terminal)
npm run dev
```

## 📚 Reference

- [Exercises 7.1 - 7.6](https://fullstackopen.com/en/part7/more_about_react_hooks#exercises-7-1-7-6)
