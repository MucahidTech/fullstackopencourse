# ✍️ Bloglist (Part 7)

A full-stack blog application with advanced state management (Zustand or React Query + Context), user management, commenting, and polished UI. Built through exercises 7.7 - 7.20 of Full Stack Open Course.

## 🎯 What it does

- 🔐 User authentication (login/logout) with JWT
- ✍️ Create, like, and delete blog posts
- 👥 Users view: list all users with their blog counts
- 👤 Individual user view: see all blogs by a specific user
- 💬 Add and display comments on blog posts
- 🚨 Error boundary for graceful error handling
- 🧭 404 page for nonexistent routes

## 🧠 What I practiced

- 🗄️ State management with **Zustand** (or **React Query + Context**)
- 🧭 Advanced React Router (nested routes, splat routes for 404)
- 🚨 Error boundaries with fallback UI
- 🧹 Code cleanup: extracting localStorage logic into `persistentUser` service
- ⚓ Custom hooks: `useField` for form handling
- 💅 Styling with MaterialUI (tables, cards, avatars, chips)
- 💬 Full-stack comments: backend API + frontend integration

## 🚀 How to run locally

```bash
cd part7/bloglist

# Install dependencies for both client and server (from root)
npm run install:all

# Run both client and server in development mode
npm run dev

# Run only the backend
npm run dev:server

# Run only the frontend
npm run dev:client
```

## 🌐 Live Demo

You can try the application online at:

[Bloglist Live Demo](https://fullstackopencourse-akn9.onrender.com/)

> 📌 **Demo Credentials:**  
> **Username:** `test`  
> **Password:** `pass`

## 🌐 Backend API

- `GET /api/blogs` – List all blogs (with user and comments populated)
- `POST /api/blogs` – Create a new blog
- `PUT /api/blogs/:id` – Update a blog (likes)
- `DELETE /api/blogs/:id` – Delete a blog
- `POST /api/blogs/:id/comments` – Add a comment to a blog
- `GET /api/users` – List all users
- `GET /api/users/:id` – Get a single user with their blogs
- `POST /api/login` – User login

## 📚 Reference

- [Exercises 7.7 - 7.20](https://fullstackopen.com/en/part7/exercises_extending_the_bloglist)
