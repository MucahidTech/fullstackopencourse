# 🌍 Country Data Viewer

A React app for browsing countries and viewing their capital's weather. Built through exercises 2.18 - 2.20 of Full Stack Open Course.

## 🎯 What it does

- 🔍 Search countries by name
- 📋 Show matching countries
- 📄 Display country details (capital, area, languages, flag, ...)
- ☁️ Show current weather in the capital (temperature, wind, icon)

## 🧠 What I practiced

- 🌐 Fetching data from REST API with `axios` + `useEffect`
- 🗂️ Rendering lists with `.map()` and unique `key`
- 🚦 Conditional rendering based on result count
- ☁️ Integrating weather API with OpenWeatherMap
- 🔒 Securing API keys using environment variables

## 🚀 How to run

```bash
npm install
npm run dev
```

Create `.env` file:

```env
VITE_WEATHER_API_KEY=your_api_key_here
```

## 📚 Reference

- [Exercises 2.18 - 2.20](https://fullstackopen.com/en/part2/adding_styles_to_react_app#exercises-2-18-2-20)
