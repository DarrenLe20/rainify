import { useState } from "react";
import Weather from "./Weather";
import Header from "./Header";
import Music from "./Music";
import "./styles/App.css";

function App() {
  const [weatherDesc, setWeatherDesc] = useState<string | null>(null);
  const [dayTime, setDayTime] = useState<boolean>(false);

  return (
    <>
      <Header />
      <div className="weather">
        <Weather weatherCheck={setWeatherDesc} daytime={setDayTime} />
      </div>
      <div className="music">
        <Music weather={weatherDesc} daytime={dayTime} />
      </div>
    </>
  );
}

export default App;
