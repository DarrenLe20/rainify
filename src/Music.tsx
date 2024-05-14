import { useState, useEffect } from "react";
import * as algoConst from "./constants";
import "./styles/Music.css";

const API_KEY = import.meta.env.VITE_SPOTIFY_API_KEY;
const SECRET_KEY = import.meta.env.VITE_SPOTIFY_SECRET;
const WEATHER_CATEGORIES_CODE = algoConst.WEATHER_CATEGORIES_CODE;
const WEATHER_VALENCE = algoConst.WEATHER_VALENCE;

interface MusicProps {
  weather: string | null;
  daytime: boolean;
  weatherCode: number | null;
}

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { images: { url: string }[] };
  external_urls: { spotify: string };
}

function Music({ weather, daytime, weatherCode }: MusicProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch access token");
        }
        const data = await response.json();
        setAccessToken(data.access_token);
      } catch (error) {
        console.error("Error fetching access token: ", error);
      }
    };
    fetchAccessToken();
  }, []);

  const dayOrNight = () => (daytime ? "day" : "night");

  const handleRoll = async () => {
    try {
      const getRandomSongsArray = [
        "%25a%25",
        "a%25",
        "%25a",
        "%25e%25",
        "e%25",
        "%25e",
        "%25i%25",
        "i%25",
        "%25i",
        "%25o%25",
        "o%25",
        "%25o",
        "%25u%25",
        "u%25",
        "%25u",
      ];
      const getRandomSongs =
        getRandomSongsArray[
          Math.floor(Math.random() * getRandomSongsArray.length)
        ];

      let validTracks: Track[] = [];
      let getRandomOffset = Math.floor(Math.random() * 200);

      while (validTracks.length < 5) {
        const response = await fetch(
          `https://api.spotify.com/v1/search?query=${getRandomSongs}&type=track&offset=${getRandomOffset}&market=US`,
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

        const tracksIds = tracks.map((track: any) => track.id).join(",");
        const audioFeaturesResponse = await fetch(
          `https://api.spotify.com/v1/audio-features?ids=${tracksIds}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (!audioFeaturesResponse.ok) {
          throw new Error("Failed to fetch audio features");
        }
        const audioFeaturesData = await audioFeaturesResponse.json();

        const valence = getValence(weatherCode!);

        for (let i = 0; i < tracks.length; i++) {
          if (!audioFeaturesData.audio_features[i]?.valence) {
            console.warn(`Track ${tracks[i].id} is missing valence data`);
            continue; // Skip tracks without valence data
          }
          tracks[i].valence = audioFeaturesData.audio_features[i].valence;
        }
        const filteredTracks = tracks.filter(
          (track: any) =>
            track.valence > WEATHER_VALENCE[valence][0] &&
            track.valence < WEATHER_VALENCE[valence][1]
        );

        validTracks = validTracks.concat(filteredTracks);
        getRandomOffset += 50;
      }

      const randomTracks = getRandomElements(validTracks, 5);
      setTracks(randomTracks);
      console.log(randomTracks);
    } catch (error) {
      console.error("Error fetching random tracks:", error);
    }
  };

  const getValence = (weatherCode: number) => {
    const possibleMoods = [];
    for (const mood in WEATHER_CATEGORIES_CODE) {
      if (WEATHER_CATEGORIES_CODE[mood].includes(weatherCode)) {
        possibleMoods.push(mood);
      }
    }
    if (possibleMoods.length > 0) {
      const mood =
        possibleMoods[Math.floor(Math.random() * possibleMoods.length)];
      console.log(mood);
      return mood;
    }
    return "unknown";
  };

  const getRandomElements = (array: any[], numElements: number) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numElements);
  };

  const renderTrackCards = () => {
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
  };

  return (
    <div className="music-container">
      <div className="intro">
        {weather && (
          <p>
            Some tunes for a {dayOrNight()} of{" "}
            <span className="weather-cond">{weather}</span>
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
