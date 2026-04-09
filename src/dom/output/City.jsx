import { useState, useEffect } from "react";
import "./City.css";
import { getSearchedCity } from "../../auxFuncs/Util";

function City({ onBack }) {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(getSearchedCity() || "");

  // take the searched city's corordinates
  const fetchWeather = async (lat, lon) => {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=relative_humidity_2m,temperature_2m,precipitation,rain,wind_speed_10m,showers,apparent_temperature`,
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
    if(weather != null){
        resolve(weather);
    } else {
        reject("No weather information found.");
    }
  })
  changeBg.then(
    function(weather){
        const temp = weather.current.temperature_2m;
        if (temp < 20) {
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #163b41, #6fa3b6)');
        } else if (temp > 30 && temp < 36) {
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #213345, #cfc9a2)');
        } else if (temp > 35){
            document.documentElement.style.setProperty('--background', 'linear-gradient(to bottom, #741c1c, #ceb590)');
        }
    },
    function(weather){
        console.log("The promise is taking its time to load...")
    }
  )
  
  return (
    <>
      <h1 className="cityName">
        {weather ? `${weather.current.temperature_2m}${weather.current_units.temperature_2m}` : "--°C"}
      </h1>
      <p className="description">
        {location.name}, {location.country}
      </p>
      <div className="two-grid">
        <div className="weather-card">
            <p>Humidity: {weather ? `${weather.current.relative_humidity_2m}${weather.current_units.relative_humidity_2m}` : "--"}</p>
            <p>Wind Speed: {weather ? `${weather.current.wind_speed_10m}${weather.current_units.wind_speed_10m}` : "--"}</p>
            <p>Feels like {weather ? `${weather.current.apparent_temperature}${weather.current_units.apparent_temperature}` : "--"}</p>
        </div>
        <div className="weather-card">

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
