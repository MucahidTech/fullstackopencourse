# 📞 Phonebook Frontend (Full Stack)

Frontend UI for the Phonebook application, built with React. Connects to a backend API and deploys as static files served by the backend.

## 🎯 What it does

- 🔍 Search contacts by name (case-insensitive)
- ➕ Add new contacts (name + number)
- ✏️ Update existing contact numbers
- 🗑️ Delete contacts with confirmation
- ✅ Displays success/error notifications

## 🧠 What I practiced

- 🔄 Full-stack integration with REST API (GET, POST, PUT, DELETE)
- 🧹 Extracting API calls into a service module
- 📝 Controlled forms and client‑side validation
- 🚦 Conditional rendering (filtered list, loading states)
- 🌐 Deploying the frontend as static files served by the backend

## 🛠️ Tech Stack

- **Library:** React 18
- **Build tool:** Vite
- **HTTP client:** Axios
- **Styling:** CSS
- **Deployment:** Static build integrated with backend on Render

## 🚀 How to run locally

### Option 1: Development mode (frontend only)

```bash
cd frontend/part3/phonebook
npm install
npm run dev
```

Then open http://localhost:5173

### Option 2: Full-stack local (frontend + backend)

```bash

# Terminal 1: backend

cd backend/part3
npm run dev

# Terminal 2: frontend

cd frontend/part3/phonebook
npm run dev
```

Update Vite proxy to forward `/api` requests to `http://localhost:3001`.

### Option 3: Production build served by backend

```bash

# Build frontend

cd frontend/part3/phonebook
npm run build

# Copy dist/ to backend directory

cp -r dist ../backend/part3/

# Start backend

cd ../backend/part3
npm start
```

Then open http://localhost:3001

## 🌐 Live demo

[Phonebook on Render](https://phonebook-fso-q5hx.onrender.com)

## 📚 Reference

- [Full Stack Open Part 3](https://fullstackopen.com/en/part3)
- Exercises 3.9 - 3.11, 3.19 - 3.20
