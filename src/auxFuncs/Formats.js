export const weatherMap = {
  0: { desc: "Clear Sky", icon: "☀️" },
  1: { desc: "Mainly Clear", icon: "🌤️" },
  2: { desc: "Partly Cloudy", icon: "⛅" },
  3: { desc: "Overcast", icon: "☁️" },
  45: { desc: "Misty", icon: "🌫️" },
  48: { desc: "Foggy", icon: "🌫️" },
  51: { desc: "Light Drizzle", icon: "🌧️" },
  53: { desc: "Moderate Drizzle", icon: "🌧️" },
  55: { desc: "Heavy Drizzle", icon: "🌧️" },
  61: { desc: "Slight Rain", icon: "🌧️" },
  63: { desc: "Moderate Rain", icon: "🌧️" },
  65: { desc: "Heavy Rain", icon: "⛈️" },
  71: { desc: "Slight Snow", icon: "❄️" },
  73: { desc: "Moderate Snow", icon: "❄️" },
  75: { desc: "Heavy Snow", icon: "❄️" },
  77: { desc: "Snow Grains", icon: "❄️" },
  80: { desc: "Slight Showers", icon: "🌧️" },
  81: { desc: "Moderate Showers", icon: "🌧️" },
  82: { desc: "Violent Showers", icon: "⛈️" },
  85: { desc: "Slight Snow Showers", icon: "❄️" },
  86: { desc: "Heavy Snow Showers", icon: "❄️" },
  95: { desc: "Thunderstorm", icon: "⛈️" },
  96: { desc: "Thunderstorm with Hail", icon: "⛈️" },
  99: { desc: "Thunderstorm with Heavy Hail", icon: "⛈️" },
};

export const humidityMap = (humidity) => {
  let description = "";
  if (humidity >= 0 && humidity < 20) {
    description = "The air is very dry. You may notice your skin or throat feels dry, and static electricity is more common.";
  } else if (humidity >= 20 && humidity < 40) {
    description = "There is very little moisture in the air. It feels crisp and light, which is typical for dry climates or indoor heating.";
  } else if (humidity >= 40 && humidity < 60) {
    description = "This is the most comfortable range for most people. The air feels balanced—neither too dry nor too sticky.";
  } else if (humidity >= 60 && humidity < 80) {
    description = "The air starts to feel heavy and damp. On warm days, this can make it feel a bit warmer than the actual temperature.";
  } else if (humidity >= 80 && humidity <= 100) {
    description = "The air is full of moisture. You will likely see fog, mist, or dew, and it can feel very thick and damp.";
  } else {
    description = "Humidity data unavailable.";
  }
  return description;
}

export const surfacePressureMap = (hPa) => {
  let description = "";

  if (hPa < 980) {
    description = "Pressure is significantly below average. This is often associated with stormy conditions, strong winds, and heavy precipitation.";
  } else if (hPa >= 980 && hPa < 1000) {
    description = "Pressure is low, which usually brings unsettled weather such as clouds, rain, or wind as air rises and cools.";
  } else if (hPa >= 1000 && hPa < 1020) {
    description = "Pressure is near the global average. You can typically expect stable but changeable weather conditions.";
  } else if (hPa >= 1020 && hPa < 1040) {
    description = "Pressure is high, which generally leads to clear skies, calm winds, and dry, settled weather.";
  } else if (hPa >= 1040) {
    description = "Pressure is exceptionally high. This usually indicates very stable air, leading to prolonged periods of fair and dry weather.";
  } else {
    description = "Pressure data unavailable.";
  }
  return description;
}

export const windSpeedMap = (kmh) => {
  let description = "";

  if (kmh < 1) {
    description = "Calm. Smoke rises vertically and the air feels still.";
  } else if (kmh >= 1 && kmh < 11) {
    description = "Light breeze. You might feel the wind on your face and see leaves rustle slightly.";
  } else if (kmh >= 11 && kmh < 28) {
    description = "Moderate breeze. Small branches move, and dust or loose paper might blow around.";
  } else if (kmh >= 28 && kmh < 49) {
    description = "Strong breeze. Large branches are in motion and umbrellas become difficult to use.";
  } else if (kmh >= 49 && kmh < 74) {
    description = "High wind. Whole trees move and walking against the wind is noticeably difficult.";
  } else if (kmh >= 74) {
    description = "Gale force. Possible slight structural damage and very dangerous coastal conditions.";
  } else {
    description = "Wind data unavailable.";
  }
  return description;
};

export const tempMap = {
  extremeCold: "❄️",   // Snow cloud
  veryCold: "🌨️",     // Cold cloud
  cold: "☁️",          // Standard cloud
  cool: "🌥️",          // Cloud with sun peeking
  mild: "🌤️",          // Sun with small cloud
  warm: "☀️",          // Full sun
  hot: "🌞",           // Sun with face
  veryHot: "🌅",       // Intense sun / Sunrise
  extremeHeat: "🔥",   // Heat (Heat usually implies clear/sun)
};

export const tempIcon = (temp) => {
  if (temp < -0) return tempMap.extremeCold;
  if (temp < 0) return tempMap.veryCold;
  if (temp <= 10) return tempMap.cold;
  if (temp <= 18) return tempMap.cool;
  if (temp <= 24) return tempMap.mild;
  if (temp <= 29) return tempMap.warm;
  if (temp <= 35) return tempMap.hot;
  if (temp <= 40) return tempMap.veryHot;
  return tempMap.extremeHeat;
};