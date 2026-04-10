import { useState, useEffect } from "react";
import "./City.css";
import { getSearchedCity } from "../../auxFuncs/Util";
import { weatherMap, humidityMap, surfacePressureMap } from "../../auxFuncs/Formats";

// 1. Receive settings prop
function City({ onBack, settings }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(getSearchedCity() || "");

  // convert C to F
  const formatTemp = (celsius) => {
    if (settings.temp === "F")
      return `${((celsius * 9) / 5 + 32).toFixed(1)}°F`;
    return `${celsius}°C`;
  };

  // convert kPa to mmHg
  const formatPressure = (kpa) => {
    if (settings.pressure === "mmHg")
      return `${(kpa * 0.750062).toFixed(2)} mmHg`;
    return `${kpa} kPa`;
  };

  const fetchWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=,temperature_2m&current=relative_humidity_2m,temperature_2m,precipitation,rain,wind_speed_10m,showers,apparent_temperature,weather_code,surface_pressure`,
    );
    const data = await res.json();
    setWeather(data);
  };

  useEffect(() => {
    const initialSearch = async () => {
      const cityName = getSearchedCity();
      if (cityName) {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`,
        );
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          setLocation(data.results[0]);
          fetchWeather(data.results[0].latitude, data.results[0].longitude);
        }
      }
    };
    initialSearch();
  }, []);

  let changeBg = new Promise((resolve, reject) => {
    if (weather != null) {
      resolve(weather);
    } else {
      reject("No weather information found.");
    }
  });
  changeBg.then(
    function (weather) {
      const temp = weather.current.temperature_2m;
      if (temp < 20) {
        document.documentElement.style.setProperty(
          "--background",
          "linear-gradient(to bottom, #163b41, #6fa3b6)",
        );
      } else if (temp >= 30 && temp < 36) {
        document.documentElement.style.setProperty(
          "--background",
          "linear-gradient(to bottom, #213345, #cfc9a2)",
        );
      } else if (temp > 35) {
        document.documentElement.style.setProperty(
          "--background",
          "linear-gradient(to bottom, #741c1c, #ceb590)",
        );
      }
    },
    function (weather) {
      console.log("The promise is taking its time to load...");
    },
  );

  return (
    <>
    <p className="location">
        {weather ? `${location.name}, ${location.country}` : "Finding location..."}
      </p>
      <h1 className="cityName">
        {weather ? formatTemp(weather.current.temperature_2m) : "Getting temperature..."}
      </h1>
      <h2 className="cityWeather">
        {weather
          ? `${weatherMap[weather.current.weather_code].icon} ${weatherMap[weather.current.weather_code].desc}`
          : "Loading weather report..."}
      </h2>
      <p className="feelsLike">
        {weather ? `Feels like ${formatTemp(weather.current.apparent_temperature)}` : ""}
      </p>
      <div className="two-grid">
        <div className="weather-card">
          <h2>
            {weather
              ? `${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}`
              : "--"} Humidity
          </h2>
          <p>
            {weather ? humidityMap(weather.current.relative_humidity_2m) : "..."}
          </p>
        </div>
        <div className="weather-card">
        <h2>
          Surface Pressure: {weather ? formatPressure(weather.current.surface_pressure) : "--"}
        </h2>
          <p>
            {weather ? surfacePressureMap(weather.current.surface_pressure) : "..."}
          </p>
        </div>
      </div>
      <div className="grid">
        <div className="controls">
          <button onClick={onBack}>Search new city</button>
        </div>
      </div>
    </>
  );
}

export default City;
