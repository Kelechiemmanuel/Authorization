import { useEffect, useState } from "react";
import axios from "axios";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);

useEffect(() => {

  axios
    .get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        q: "Lagos",
        units: "metric",
        appid: import.meta.env.VITE_WEATHER_KEY,
      },
    })
    .then((res) => {
      console.log("SUCCESS:", res.data);
      setWeather(res.data);
    })
    .catch((err) => {
      console.log("ERROR RESPONSE:", err.response?.data);
      console.log("ERROR MESSAGE:", err.message);
    });
}, []);

  if (!weather) return <p>Loading weather...</p>;

  return (
    <div className="text-sm">
      🌤 {weather.name}: {weather.main.temp}°C
    </div>
  );
};

export default WeatherWidget;