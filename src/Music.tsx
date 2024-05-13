import "./styles/Music.css";

interface MusicProps {
  weather: string | null;
  daytime: boolean;
}

function Music({ weather, daytime }: MusicProps) {
  function dayOrNight() {
    if (daytime) {
      return "day";
    } else {
      return "night";
    }
  }

  return (
    <div className="music-container">
      <div className="music-card">
        {weather && (
          <p>
            A tune for a {dayOrNight()} of{" "}
            <span className="name">{weather}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Music;
