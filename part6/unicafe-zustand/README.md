# 🍴 Unicafe (Zustand)

Reimplementation of the classic Unicafe feedback app, now with state management powered by Zustand. Built through exercise 6.1 of Full Stack Open Course.

## 🎯 What it does

- Collects user feedback (good, neutral, bad)
- Displays statistics: total, average score, and positive feedback percentage
- Uses a global Zustand store for state management

## 🧠 What I practiced

- 💎 Managing application state with Zustand
- 📊 Separating state (values) from actions (functions) using the `actions` pattern
- 🧩 Creating custom hooks (`useStatistics`, `useStatisticsActions`) for cleaner component consumption

## 🚀 How to run

```bash
cd part6/unicafe-zustand
npm install
npm run dev
```

## 📚 Reference

- [Exercise 6.1](https://fullstackopen.com/en/part6/flux_architecture_and_zustand#exercise-6-1)
