export const weatherMap = {
  0: { desc: { en: "Clear Sky", jp: "快晴" }, icon: "☀️" },
  1: { desc: { en: "Mainly Clear", jp: "概ね晴れ" }, icon: "🌤️" },
  2: { desc: { en: "Partly Cloudy", jp: "晴れ時々曇り" }, icon: "⛅" },
  3: { desc: { en: "Overcast", jp: "曇り" }, icon: "☁️" },
  45: { desc: { en: "Misty", jp: "霧雨" }, icon: "🌫️" },
  48: { desc: { en: "Foggy", jp: "霧" }, icon: "🌫️" },
  51: { desc: { en: "Light Drizzle", jp: "弱い霧雨" }, icon: "🌧️" },
  53: { desc: { en: "Moderate Drizzle", jp: "霧雨" }, icon: "🌧️" },
  55: { desc: { en: "Heavy Drizzle", jp: "強い霧雨" }, icon: "🌧️" },
  61: { desc: { en: "Slight Rain", jp: "小雨" }, icon: "🌧️" },
  63: { desc: { en: "Moderate Rain", jp: "雨" }, icon: "🌧️" },
  65: { desc: { en: "Heavy Rain", jp: "大雨" }, icon: "⛈️" },
  71: { desc: { en: "Slight Snow", jp: "小雪" }, icon: "❄️" },
  73: { desc: { en: "Moderate Snow", jp: "雪" }, icon: "❄️" },
  75: { desc: { en: "Heavy Snow", jp: "大雪" }, icon: "❄️" },
  77: { desc: { en: "Snow Grains", jp: "霧雪" }, icon: "❄️" },
  80: { desc: { en: "Slight Showers", jp: "にわか雨" }, icon: "🌧️" },
  81: { desc: { en: "Moderate Showers", jp: "強いにわか雨" }, icon: "🌧️" },
  82: { desc: { en: "Violent Showers", jp: "激しいにわか雨" }, icon: "⛈️" },
  85: { desc: { en: "Slight Snow Showers", jp: "にわか雪" }, icon: "❄️" },
  86: { desc: { en: "Heavy Snow Showers", jp: "強いにわか雪" }, icon: "❄️" },
  95: { desc: { en: "Thunderstorm", jp: "雷雨" }, icon: "⛈️" },
  96: { desc: { en: "Thunderstorm with Hail", jp: "あられを伴う雷雨" }, icon: "⛈️" },
  99: { desc: { en: "Thunderstorm with Heavy Hail", jp: "激しいあられを伴う雷雨" }, icon: "⛈️" },
};

export const humidityMap = (humidity, lang = "en") => {
  let description = "";

  const content = {
    en: {
      veryDry: "The air is very dry. You may notice your skin or throat feels dry, and static electricity is more common.",
      low: "There is very little moisture in the air. It feels crisp and light, which is typical for dry climates or indoor heating.",
      comfortable: "This is the most comfortable range for most people. The air feels balanced—neither too dry nor too sticky.",
      damp: "The air starts to feel heavy and damp. On warm days, this can make it feel a bit warmer than the actual temperature.",
      humid: "The air is full of moisture. You will likely see fog, mist, or dew, and it can feel very thick and damp.",
      none: "Humidity data unavailable."
    },
    jp: {
      veryDry: "空気が非常に乾燥しています。肌やのどの乾燥を感じやすく、静電気が発生しやすくなります。",
      low: "空気中の水分が非常に少ないです。乾燥した気候や暖房の効いた室内によく見られる、カラッとした軽い空気感です。",
      comfortable: "多くの人にとって最も快適な範囲です。乾燥しすぎず、ベタつきもない、バランスの取れた状態です。",
      damp: "空気が重く、湿っぽく感じ始めます。気温が高い日は、実際の温度よりも少し暑く感じることがあります。",
      humid: "空気が水分で満たされています。霧や露が発生しやすく、非常にジメジメとした厚苦しい空気感になります。",
      none: "湿度データが利用できません。"
    }
  };

  const t = content[lang] || content.en;

  if (humidity >= 0 && humidity < 20) {
    description = t.veryDry;
  } else if (humidity >= 20 && humidity < 40) {
    description = t.low;
  } else if (humidity >= 40 && humidity < 60) {
    description = t.comfortable;
  } else if (humidity >= 60 && humidity < 80) {
    description = t.damp;
  } else if (humidity >= 80 && humidity <= 100) {
    description = t.humid;
  } else {
    description = t.none;
  }
  
  return description;
};

export const surfacePressureMap = (hPa, lang = "en") => {
  let description = "";

  const content = {
    en: {
      significantlyLow: "Pressure is significantly below average. This is often associated with stormy conditions, strong winds, and heavy precipitation.",
      low: "Pressure is low, which usually brings unsettled weather such as clouds, rain, or wind as air rises and cools.",
      average: "Pressure is near the global average. You can typically expect stable but changeable weather conditions.",
      high: "Pressure is high, which generally leads to clear skies, calm winds, and dry, settled weather.",
      exceptionallyHigh: "Pressure is exceptionally high. This usually indicates very stable air, leading to prolonged periods of fair and dry weather.",
      none: "Pressure data unavailable."
    },
    jp: {
      significantlyLow: "気圧が平均を大幅に下回っています。嵐のような天候、強風、激しい降水が伴うことが多いです。",
      low: "低気圧です。空気が上昇して冷えるため、雲や雨、風などの不安定な天候をもたらします。",
      average: "気圧は世界の平均に近いです。通常、安定していますが変化しやすい天候が予想されます。",
      high: "高気圧です。一般的に晴天、穏やかな風、そして安定した乾燥した天候につながります。",
      exceptionallyHigh: "気圧が非常に高いです。これは空気が非常に安定していることを示し、晴天で乾燥した天候が長く続くことを意味します。",
      none: "気圧データが利用できません。"
    }
  };

  const t = content[lang] || content.en;

  if (hPa < 980) {
    description = t.significantlyLow;
  } else if (hPa >= 980 && hPa < 1000) {
    description = t.low;
  } else if (hPa >= 1000 && hPa < 1020) {
    description = t.average;
  } else if (hPa >= 1020 && hPa < 1040) {
    description = t.high;
  } else if (hPa >= 1040) {
    description = t.exceptionallyHigh;
  } else {
    description = t.none;
  }
  
  return description;
};

export const windSpeedMap = (kmh, lang = "en") => {
  let description = "";

  const content = {
    en: {
      calm: "Calm. Smoke rises vertically and the air feels still.",
      light: "Light breeze. You might feel the wind on your face and see leaves rustle slightly.",
      moderate: "Moderate breeze. Small branches move, and dust or loose paper might blow around.",
      strong: "Strong breeze. Large branches are in motion and umbrellas become difficult to use.",
      high: "High wind. Whole trees move and walking against the wind is noticeably difficult.",
      gale: "Gale force. Possible slight structural damage and very dangerous coastal conditions.",
      none: "Wind data unavailable."
    },
    jp: {
      calm: "静穏。煙がまっすぐに立ちのぼり、空気は穏やかです。",
      light: "軽風。顔に風を感じ、木の葉がわずかに揺れます。",
      moderate: "和風。小枝が動き、砂ぼこりや紙くずが舞い上がります。",
      strong: "強風。大きな枝が動き、傘がさしにくくなります。",
      high: "疾風。樹木全体が揺れ、風に向かって歩くのが困難になります。",
      gale: "強風。建物にわずかな被害が出る可能性があり、海上は非常に危険な状態です。",
      none: "風のデータが取得できません。"
    }
  };

  const t = content[lang] || content.en;

  if (kmh < 1) {
    description = t.calm;
  } else if (kmh >= 1 && kmh < 11) {
    description = t.light;
  } else if (kmh >= 11 && kmh < 28) {
    description = t.moderate;
  } else if (kmh >= 28 && kmh < 49) {
    description = t.strong;
  } else if (kmh >= 49 && kmh < 74) {
    description = t.high;
  } else if (kmh >= 74) {
    description = t.gale;
  } else {
    description = t.none;
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