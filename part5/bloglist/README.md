# ✍️ Bloglist

An end-to-end full-stack web application featuring a React frontend and a Node.js/Express backend. Users can securely log in, manage blog posts, like entries, and navigate through a seamless client-side routed interface.

Built as part of **Exercises 5.1 - 5.16** and **5.24 - 5.31** of the Full Stack Open Course.

> **Note:** The backend for this project was built in [Part 4](https://github.com/MucahidTech/fullstackopencourse/tree/main/part4/bloglist).

## 🎯 Features

- 🔐 **Secure Authentication:** User login/logout with JWT tokens stored securely.
- ✍️ **Blog Management:** Create, view, like, and delete blog posts (with strict creator-permission checks).
- 🧭 **Client-Side Routing:** Dynamic navigation via React Router (List view, Single Blog view, User statistics).
- 💬 **Live Notifications:** Real-time feedback for user actions (success/error alerts).
- 🧩 **Interactive UI:** Toggleable components for clean form management and UX.

## 💻 Tech Stack

**Frontend:**

- React (Vite)
- React Router
- Axios
- MaterialUI

**Backend (Part 4 Reference):**

- Node.js & Express
- MongoDB (Mongoose)
- JSON Web Tokens (JWT)

**Testing:**

- Vitest & React Testing Library (Unit & Integration)
- Playwright (End-to-End Testing)

## 🧠 What I practiced

- 🧪 Testing with Vitest and React Testing Library
- 🔐 Managing authentication state with JWT tokens
- 🧭 Implementing client-side routing with React Router (`useNavigate`, `useMatch`)
- 🔄 Consuming a REST API with Axios
- 🧹 Creating reusable UI components
- 🚦 Conditional rendering based on user authentication
- 🧩 Using `Togglable` for form visibility

## 🚀 How to run

```bash
# 1. Clone the repository
git clone https://github.com/MucahidTech/fullstackopencourse.git
cd fullstackopencourse/part5/bloglist

# 2. Run the backend
cd bloglist-backend
npm install
npm run dev

# 3. Run the frontend (in a new terminal)
cd ../bloglist-frontend
npm install
npm run dev
```

Then open http://localhost:5173

## 🧪 Running Tests

This project includes comprehensive testing suites to ensure code reliability and quality.

```bash
cd bloglist-frontend
npm run test
```

## 📚 Reference

- [Full Stack Open Part 5](https://fullstackopen.com/en/part5)
