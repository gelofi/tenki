import { useState, useEffect, useRef } from "react";
import "./City.css";
import { getSearchedCity } from "../../auxFuncs/Util";
import { weatherMap, humidityMap, surfacePressureMap, tempIcon, windSpeedMap } from "../../auxFuncs/Formats";

// 1. Receive settings prop
function City({ onBack, settings }) {
  const [weather, setWeather] = useState(null); // variable for the weather data
  const [location, setLocation] = useState(getSearchedCity() || ""); // variable for location data (lat, lon)
  const [isForecastOpen, setIsForecastOpen] = useState(false); // variable for collapsible daily data (default: unopened)

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
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&hourly=temperature_2m,uv_index&current=relative_humidity_2m,temperature_2m,precipitation,rain,wind_speed_10m,showers,apparent_temperature,weather_code,surface_pressure`,
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
          fetchWeather(
            data.results[0].latitude,
            data.results[0].longitude,
          ).catch((error) => {
            console.error(
              "Cannot find weather data for this location. " + error,
            );
          });
        }
      }
    };
    initialSearch().catch(error => {
      console.error("Cannot find coordinate data for this location. " + error)
    });
  }, []);

  const changeBg = new Promise((resolve, reject) => {
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

  const dailyWeatherReport = (index, weather) => {
    if (!weather) return null;
    return (
      <>
        <p>{weather.daily.time[index]}</p>
        <h1>
          {tempIcon((weather.daily.temperature_2m_min[index] + weather.daily.temperature_2m_max[index]) / 2)}
        </h1>
        <p className="dailyTemp">
          {formatTemp(weather.daily.temperature_2m_min[index])} /{" "}
          {formatTemp(weather.daily.temperature_2m_max[index])}
        </p>
      </>
    );
  };

  // the actual DOM part
  return (
    <>
      <p className="location">
        {weather
          ? `${location.name}, ${location.country}`
          : "Finding location..."}
      </p>
      <h1 className="cityName">
        {weather
          ? formatTemp(weather.current.temperature_2m)
          : "--°"}
      </h1>
      <h2 className="cityWeather">
        {weather
          ? `${weatherMap[weather.current.weather_code].icon} ${weatherMap[weather.current.weather_code].desc}`
          : "Loading weather report..."}
      </h2>
      <p className="feelsLike">
        {weather
          ? `Feels like ${formatTemp(weather.current.apparent_temperature)}`
          : ""}
      </p>

      <div className="two-grid">
        <div className="weather-card">
          <h2>Humidity</h2>
          <h1>
            {weather
              ? `${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}`
              : "--"}
          </h1>
          <p>
            {weather
              ? humidityMap(weather.current.relative_humidity_2m)
              : "..."}
          </p>
        </div>
        <div className="weather-card">
          <h2>Surface Pressure</h2>
          <h1 id="pressure">
            {weather
              ? formatPressure(weather.current.surface_pressure)
              : "--"}{" "}
          </h1>
          <p>
            {weather
              ? surfacePressureMap(weather.current.surface_pressure)
              : "..."}
          </p>
        </div>
      </div>
      <div className="grid">
        <div className="weather-card">
          <h2>Wind Speed</h2>
          <h1>
            {weather
              ? `${weather.current.wind_speed_10m}${weather.current_units.wind_speed_10m}`
              : "--"}
          </h1>
          <p>
            {weather ? windSpeedMap(weather.current.wind_speed_10m) : "..."}
          </p>
        </div>
      </div>
      <div className="grid">
        <div className="weather-card daily">
          <h2
            onClick={() => setIsForecastOpen(!isForecastOpen)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Daily Forecast
            <span>{isForecastOpen ? "▲" : "▼"}</span>
          </h2>

          {isForecastOpen && (
            <div className="seven-grid">
              <div className="card">{dailyWeatherReport(0, weather)}</div>
              <div className="card">{dailyWeatherReport(1, weather)}</div>
              <div className="card">{dailyWeatherReport(2, weather)}</div>
              <div className="card">{dailyWeatherReport(3, weather)}</div>
              <div className="card">{dailyWeatherReport(4, weather)}</div>
              <div className="card">{dailyWeatherReport(5, weather)}</div>
              <div className="card">{dailyWeatherReport(6, weather)}</div>
            </div>
          )}
        </div>

        <div className="controls">
          <button onClick={onBack}>Search new city</button>
        </div>
      </div>
    </>
  );
}

export default City;
