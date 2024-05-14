import { useState } from "react";
import Weather from "./Weather";
import Header from "./Header";
import Music from "./Music";
import Footer from "./Footer";
import "./styles/App.css";

function App() {
  const [weatherDesc, setWeatherDesc] = useState<string | null>(null);
  const [dayTime, setDayTime] = useState<boolean>(false);

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="weather">
          <Weather weatherCheck={setWeatherDesc} daytime={setDayTime} />
        </div>
        <div className="music">
          <Music weather={weatherDesc} daytime={dayTime} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
