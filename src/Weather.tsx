import { useState, useEffect } from "react";
import "./styles/Weather.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

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
  weatherCode: (code: number) => void;
}

function Weather({ weatherCheck, daytime, weatherCode }: WeatherProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const cityName = await getCityName(lat, lon);
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            setWeather(data);
            console.log(data);
            weatherCheck(data.weather[0].description);
            weatherCode(data.weather[0].id);
            daytime(isDayTime(data));
          });
        } else {
          console.error("Geolocation is not supported by this browser");
        }
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };
    fetchWeatherData();
  }, []);

  // Reverse geocoding
  async function getCityName(lat: number, lon: number) {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await response.json();
    if (data.length > 0) {
      const cityName = data[0].name.replace(/\s+/g, "+");
      return cityName;
    } else {
      throw new Error("Failed to fetch city name");
    }
  }

  // Check if it is daytime
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
          <h2>{weather.name}</h2>
          <div className="weather-info">
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="weather icon"
              />
              <p id="temp">{weather.main.temp.toFixed(0)}°C</p>
            </div>
            <div className="weather-description">
              <p>
                H:{weather.main.temp_max.toFixed(0)}° L:
                {weather.main.temp_min.toFixed(0)}°
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default Weather;
