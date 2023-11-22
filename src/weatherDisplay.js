import { weather } from "./weatherObject";

const mainContainer = document.getElementById("mainContainer");

const weatherEmojis = {
  Thermometer: "🌡️",
  //weather[0].main
  Clear: "🌞",
  Thunderstorm: "⛈️",
  Drizzle: "🌦️",
  Rain: "🌧️",
  Snow: "🌨️",
  Clouds: [
    //weather[0].id
    "🌤️", //801
    "⛅", //802
    "🌥️", //803
    "☁️", //804
  ],
};

//main.temp
//main.humidity
//wind.speed

const searchContainer = document.getElementById("searchContainer");
