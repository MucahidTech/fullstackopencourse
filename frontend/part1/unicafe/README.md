# 🍴 Unicafe Feedback App

A React app for collecting customer feedback (good/neutral/bad) and displaying statistics. Built through exercises 1.6 - 1.11 of Full Stack Open.

## 🎯 What this project does

Collects feedback and shows: total count, average score (good=1, neutral=0, bad=-1), and positive percentage.

## 🧠 What I practiced

- ⏰ **useState hook** - Managing multiple state variables (good, neutral, bad)
- 🎛️ **Event handling** - Updating state on button clicks
- 🔁 **Conditional rendering** - Showing statistics only after feedback is given
- 📊 **Derived state** - Calculating total, average, and percentage from existing state
- 🧩 **Component composition** - Extracting Button, Statistics, and StatisticLine components
- 🗃️ **HTML tables** - Displaying statistics in structured format
- ♻️ **Reusable components** - StatisticLine component for DRY code

## 🚀 How to run

```bash
npm install
npm run dev
```

Then open **http://localhost:5173**

## 📈 Evolution Through Exercises

| Exercise | Key Concept                                            |
| -------- | ------------------------------------------------------ |
| **1.6**  | Basic state with three counters (good/neutral/bad)     |
| **1.7**  | Derived values (total, average, positive percentage)   |
| **1.8**  | Extracting Statistics component                        |
| **1.9**  | Conditional rendering (show stats only after feedback) |
| **1.10** | Extracting StatisticLine component for reusability     |
| **1.11** | Display statistics in HTML table                       |

## 📚 Reference

- [Exercises 1.6 - 1.11](https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#exercises-1-6-1-14)
