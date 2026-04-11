import { useState, useEffect, useRef } from "react";
import "./City.css";
import { getSearchedCity } from "../../auxFuncs/Util";
import { weatherMap, humidityMap, surfacePressureMap, tempIcon, windSpeedMap } from "../../auxFuncs/Formats";

function City({ onBack, settings }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(getSearchedCity() || "");
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [error, setError] = useState(false); 

  const formatTemp = (celsius) => {
    if (settings.temp === "F")
      return `${((celsius * 9) / 5 + 32).toFixed(1)}°F`;
    return `${celsius}°C`;
  };

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
        try {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`,
          );
          const data = await res.json();
          
          if (data.results && data.results.length > 0) {
            setError(false); 
            setLocation(data.results[0]);
            await fetchWeather(data.results[0].latitude, data.results[0].longitude);
          } else {
            setError(true); 
          }
        } catch (err) {
          setError(true); 
          console.error(err);
        }
      }
    };
    initialSearch();
  }, []);

  useEffect(() => {
    if (weather) {
      const temp = weather.current.temperature_2m;
      if (temp < 20) {
        document.documentElement.style.setProperty("--background", "linear-gradient(to bottom, #163b41, #6fa3b6)");
      } else if (temp >= 30 && temp < 36) {
        document.documentElement.style.setProperty("--background", "linear-gradient(to bottom, #213345, #cfc9a2)");
      } else if (temp > 35) {
        document.documentElement.style.setProperty("--background", "linear-gradient(to bottom, #741c1c, #ceb590)");
      }
    }
  }, [weather]);

  const dailyWeatherReport = (index, weather) => {
    if (!weather) return null;
    return (
      <>
        <p>{weather.daily.time[index]}</p>
        <h1>{tempIcon((weather.daily.temperature_2m_min[index] + weather.daily.temperature_2m_max[index]) / 2)}</h1>
        <p className="dailyTemp">
          {formatTemp(weather.daily.temperature_2m_min[index])} / {formatTemp(weather.daily.temperature_2m_max[index])}
        </p>
      </>
    );
  };

  return (
    <>
      <p className="location">
        {error ? `No results for '${getSearchedCity()}'` : weather ? `${location.name}, ${location.country}` : "Finding location..."}
      </p>
      
      <h1 className="cityName">
        {error ? "Error 404" : weather ? formatTemp(weather.current.temperature_2m) : "--°"}
      </h1>

      <h2 className="cityWeather">
        {error 
          ? (settings.language === "jp" ? "都市が見つかりません" : "City not found.") 
          : weather 
            ? `${weatherMap[weather.current.weather_code].icon} ${weatherMap[weather.current.weather_code].desc[settings.language]}` 
            : "..."}
      </h2>

      {!error && (
        <>
          <p className="feelsLike">
            {weather 
              ? `${settings.language === "jp" ? "体感温度" : "Feels like"} ${formatTemp(weather.current.apparent_temperature)}` 
              : ""}
          </p>

          <div className="two-grid">
            <div className="weather-card">
              <h2>{settings.language === "jp" ? "湿度" : "Humidity"}</h2>
              <h1>{weather ? `${weather.current.relative_humidity_2m}%` : "--"}</h1>
              <p>{weather ? humidityMap(weather.current.relative_humidity_2m, settings.language) : "..."}</p>
            </div>
            <div className="weather-card">
              <h2>{settings.language === "jp" ? "気圧" : "Surface Pressure"}</h2>
              <h1 id="pressure">{weather ? formatPressure(weather.current.surface_pressure) : "--"}</h1>
              <p>{weather ? surfacePressureMap(weather.current.surface_pressure, settings.language) : "..."}</p>
            </div>
          </div>

          <div className="grid">
            <div className="weather-card">
              <h2>{settings.language === "jp" ? "風速" : "Wind Speed"}</h2>
              <h1>{weather ? `${weather.current.wind_speed_10m} km/h` : "--"}</h1>
              <p>{weather ? windSpeedMap(weather.current.wind_speed_10m, settings.language) : "..."}</p>
            </div>
          </div>

          <div className="grid">
            <div className="weather-card daily">
              <h2 onClick={() => setIsForecastOpen(!isForecastOpen)} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {settings.language === "jp" ? "週間予報" : "Daily Forecast"} <span>{isForecastOpen ? "▲" : "▼"}</span>
              </h2>
              {isForecastOpen && (
                <div className="seven-grid">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="card">{dailyWeatherReport(i, weather)}</div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <div className="grid">
        <div className="controls">
          <button onClick={onBack}>{settings.language === "jp" ? "新しい都市を検索" : "Search new city"}</button>
        </div>
      </div>
    </>
  );
}

export default City;