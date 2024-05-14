import { useState, useEffect } from "react";
import "./styles/Music.css";

const API_KEY = import.meta.env.VITE_SPOTIFY_API_KEY;
const SECRET_KEY = import.meta.env.VITE_SPOTIFY_SECRET;

interface MusicProps {
  weather: string | null;
  daytime: boolean;
}

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

function Music({ weather, daytime }: MusicProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    var authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        API_KEY +
        "&client_secret=" +
        SECRET_KEY,
    };
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((response) => response.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  function dayOrNight() {
    if (daytime) {
      return "day";
    } else {
      return "night";
    }
  }

  async function handleRoll() {
    console.log("clicked");
    try {
      const getRandomSongsArray = [
        "%25a%25",
        "a%25",
        "%25e%25",
        "e%25",
        "%25i%25",
        "i%25",
        "%25o%25",
        "o%25",
      ];
      const getRandomSongs =
        getRandomSongsArray[
          Math.floor(Math.random() * getRandomSongsArray.length)
        ];
      console.log(getRandomSongs);
      const getRandomOffset = Math.floor(Math.random() * 1000) + 1; // Random offset between 1 and 1000
      const response = await fetch(
        `https://api.spotify.com/v1/search?query=${getRandomSongs}&type=track&offset=${getRandomOffset}&limit=10&market=US`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch random tracks");
      }
      const data = await response.json();
      const tracks = data.tracks.items;
      const randomTracks = getRandomElements(tracks, 10);
      setTracks(randomTracks);
      console.log(randomTracks);
    } catch (error) {
      console.error("Error fetching random tracks:", error);
    }
  }

  function getRandomElements(array: any[], numElements: number) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  }

  function renderTrackCards() {
    return tracks.map((track) => (
      <a
        key={track.id}
        className="track-card"
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={track.album.images[0].url} alt={track.name} />
        <div className="track-info">
          <h3>{track.name}</h3>
          <p>{track.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
      </a>
    ));
  }

  return (
    <div className="music-container">
      <div className="intro">
        {weather && (
          <p>
            A tune for a {dayOrNight()} of{" "}
            <span className="name">{weather}</span>
          </p>
        )}
      </div>
      <button className="roll-btn" onClick={handleRoll}>
        OwO
      </button>
      <div className="track-container">{renderTrackCards()}</div>
    </div>
  );
}

export default Music;
