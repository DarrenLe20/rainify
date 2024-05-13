import { useState, useEffect } from "react";
import "./styles/Weather.css";

// interface for weather data
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: {
    icon: any;
    description: string;
  }[];
}

interface WeatherProps {
  weatherCheck: (description: string) => void;
  daytime: (description: boolean) => void;
}

function Weather({ weatherCheck, daytime }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?id=5128581&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeather(data);
        console.log(data);
        // show icon code
        console.log(data.weather[0].icon);
        weatherCheck(data.weather[0].description);
        daytime(isDayTime(data));
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };
    fetchWeatherData();
  }, []);

  function isDayTime(weatherData: WeatherData): boolean {
    if (!weatherData) return false;
    const currentTime = new Date().valueOf() / 1000;
    return (
      currentTime > weatherData.sys.sunrise &&
      currentTime < weatherData.sys.sunset
    );
  }

  return (
    <div className="weather-container">
      {weather ? (
        <div className="weather-card">
          <div className="weather-left">
            <h2>{weather.name}</h2>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
              <p id="temp">{weather.main.temp.toFixed(0)}°C</p>
            </div>
          </div>
          <div className="weather-info">
            <p>
              H:{weather.main.temp_max.toFixed(0)}° L:
              {weather.main.temp_min.toFixed(0)}°
            </p>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;
