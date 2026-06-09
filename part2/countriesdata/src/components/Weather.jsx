import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!capital) return;

    const api_key = import.meta.env.VITE_WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;

    setLoading(true);
    setError(null);

    axios
      .get(url)
      .then((response) => {
        setWeather(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
        setError("Could not fetch weather data. Please try again later.");
        setLoading(false);
      });
  }, [capital]);

  if (loading) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>
        <strong>Temperature:</strong> {weather.main.temp} °C
      </p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>
        <strong>Wind:</strong> {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default Weather;
