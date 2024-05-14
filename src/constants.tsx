const WEATHER_CATEGORIES_CODE = {
  good: [600, 601, 800, 801, 802],
  moody: [
    300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 520, 521,
    522, 531, 602, 611, 612, 613, 615, 616, 620, 621, 622, 701, 711, 721, 731,
    741, 751, 761, 762, 771, 781, 803, 804,
  ],
  chill: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  moderate: [
    300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 502, 503, 504, 511,
    520, 521, 522, 531, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622,
  ],
  fun: [800, 801, 802, 803, 804],
  bad: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232, 504, 511, 622, 781],
};

const WEATHER_VALENCE = {
  good: [0.7, 1],
  moody: [0.2, 0.5],
  chill: [0.5, 0.7],
  moderate: [0.4, 0.6],
  fun: [0.8, 1],
  bad: [0.3, 0.6],
  dangerous: [0, 0.3],
};

const WEATHER_CODES = {
  200: "thunderstorm with light rain",
  201: "thunderstorm with rain",
  202: "thunderstorm with heavy rain",
  210: "light thunderstorm",
  211: "thunderstorm",
  212: "heavy thunderstorm",
  221: "ragged thunderstorm",
  230: "thunderstorm with light drizzle",
  231: "thunderstorm with drizzle",
  232: "thunderstorm with heavy drizzle",
  300: "light intensity drizzle",
  301: "drizzle",
  302: "heavy intensity drizzle",
  310: "light intensity drizzle rain",
  311: "drizzle rain",
  312: "heavy intensity drizzle rain",
  313: "shower rain and drizzle",
  314: "heavy shower rain and drizzle",
  321: "shower drizzle",
  500: "light rain",
  501: "moderate rain",
  502: "heavy intensity rain",
  503: "very heavy rain",
  504: "extreme rain",
  511: "freezing rain",
  520: "light intensity shower rain",
  521: "shower rain",
  522: "heavy intensity shower rain",
  531: "ragged shower rain",
  600: "light snow",
  601: "snow",
  602: "heavy snow",
  611: "sleet",
  612: "light shower sleet",
  613: "shower sleet",
  615: "light rain and snow",
  616: "rain and snow",
  620: "light shower snow",
  621: "shower snow",
  622: "heavy shower snow",
  701: "mist",
  711: "smoke",
  721: "haze",
  731: "sand, dust whirls",
  741: "fog",
  751: "sand",
  761: "dust",
  762: "volcanic ash",
  771: "squalls",
  781: "tornado",
  800: "clear sky",
  801: "few clouds",
  802: "scattered clouds",
  803: "broken clouds",
  804: "overcast clouds",
};

const GENRES = [
  "acoustic",
  "afrobeat",
  "alt-rock",
  "alternative",
  "ambient",
  "anime",
  "black-metal",
  "bluegrass",
  "blues",
  "bossanova",
  "brazil",
  "breakbeat",
  "british",
  "cantopop",
  "chicago-house",
  "children",
  "chill",
  "classical",
  "club",
  "comedy",
  "country",
  "dance",
  "dancehall",
  "death-metal",
  "deep-house",
  "detroit-techno",
  "disco",
  "disney",
  "drum-and-bass",
  "dub",
  "dubstep",
  "edm",
  "electro",
  "electronic",
  "emo",
  "folk",
  "forro",
  "french",
  "funk",
  "garage",
  "german",
  "gospel",
  "goth",
  "grindcore",
  "groove",
  "grunge",
  "guitar",
  "happy",
  "hard-rock",
  "hardcore",
  "hardstyle",
  "heavy-metal",
  "hip-hop",
  "holidays",
  "honky-tonk",
  "house",
  "idm",
  "indian",
  "indie",
  "indie-pop",
  "industrial",
  "iranian",
  "j-dance",
  "j-idol",
  "j-pop",
  "j-rock",
  "jazz",
  "k-pop",
  "kids",
  "latin",
  "latino",
  "malay",
  "mandopop",
  "metal",
  "metal-misc",
  "metalcore",
  "minimal-techno",
  "movies",
  "mpb",
  "new-age",
  "new-release",
  "opera",
  "pagode",
  "party",
  "philippines-opm",
  "piano",
  "pop",
  "pop-film",
  "post-dubstep",
  "power-pop",
  "progressive-house",
  "psych-rock",
  "punk",
  "punk-rock",
  "r-n-b",
  "rainy-day",
  "reggae",
  "reggaeton",
  "road-trip",
  "rock",
  "rock-n-roll",
  "rockabilly",
  "romance",
  "sad",
  "salsa",
  "samba",
  "sertanejo",
  "show-tunes",
  "singer-songwriter",
  "ska",
  "sleep",
  "songwriter",
  "soul",
  "soundtracks",
  "spanish",
  "study",
  "summer",
  "swedish",
  "synth-pop",
  "tango",
  "techno",
  "trance",
  "trip-hop",
  "turkish",
  "work-out",
  "world-music",
];