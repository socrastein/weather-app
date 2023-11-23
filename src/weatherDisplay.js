import "./weatherDisplay.css";

import rainGIF from "./gifs/rain.gif";
import sunnyGIF from "./gifs/sunny.gif";
import snowGIF from "./gifs/snow.gif";
import hazeGIF from "./gifs/haze.gif";
import thunderGIF from "./gifs/thunderstorm.gif";
import lightGIF from "./gifs/cloudsLight.gif";
import heavyGIF from "./gifs/cloudsHeavy.gif";

import { getWeather, weather } from "./weatherObject";
import { newIconButton } from "./buttonFactory";

const mainContainer = document.getElementById("mainContainer");

const weatherEmojis = {
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

const weatherGifs = {
  Clear: sunnyGIF,
  Thunderstorm: thunderGIF,
  Drizzle: rainGIF,
  Rain: rainGIF,
  Snow: snowGIF,
  Clouds: [lightGIF, heavyGIF],
};

const make = (type, id = "") => {
  const element = document.createElement(type);
  element.id = id;
  return element;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const tempConversion = (temp) => {
  temp = parseInt(temp);
  //Convert to celsius
  if (degrees === "F") {
    degrees = "C";
    return ((temp - 32) * 5) / 9;
    //Convert to fahrenheit
  } else {
    degrees = "F";
    return (temp * 9) / 5 + 32;
  }
};

export const buildDisplay = (weatherObject) => {
  //Clear current display
  mainContainer.innerHTML = "";

  //Header with app title
  const headerContainer = make("div", "headerContainer");
  mainContainer.append(headerContainer);

  const appTitle = make("h1", "appTitle");
  appTitle.textContent = "🌤 Weather App ⛈";

  headerContainer.append(appTitle);

  //Display city and search bar
  const searchContainer = make("div", "searchContainer");
  mainContainer.append(searchContainer);

  const currentCity = make("p", "currentCity");
  searchContainer.append(currentCity);

  const searchBoxContainer = make("div", "searchBoxContainer");

  const searchBox = make("input", "searchBox");
  searchBox.placeholder = "Enter City or Zip";
  searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBox.value.length > 1) {
      searchCity(searchBox.value);
    }
  });

  const searchIcon = newIconButton("search", "searchIcon");
  searchIcon.onclick = async () => {
    if (searchBox.value.length > 1) searchCity(searchBox.value);
  };

  searchBoxContainer.append(searchBox);
  searchBoxContainer.append(searchIcon);
  searchContainer.append(searchBoxContainer);

  //Display current temp + min/max temps
  const tempContainer = make("div", "tempContainer");
  mainContainer.append(tempContainer);

  const temperature = make("p", "temperature");
  tempContainer.append(temperature);

  const tempRangeContainer = make("div", "tempRangeContainer");
  tempContainer.append(tempRangeContainer);

  const tempMin = make("p", "tempMin");
  const tempMax = make("p", "tempMax");
  tempRangeContainer.append(tempMin);
  tempRangeContainer.append(tempMax);

  //Display current weather
  const weatherContainer = make("div", "weatherContainer");
  mainContainer.append(weatherContainer);

  const weatherMain = make("p", "weatherMain");
  const weatherDesc = make("p", "weatherDesc");
  const weatherEmoji = make("p", "weatherEmoji");

  weatherContainer.append(weatherMain);
  weatherContainer.append(weatherDesc);
  weatherContainer.append(weatherEmoji);

  //Display wind speed & humidity
  const airContainer = make("div", "airContainer");
  mainContainer.append(airContainer);

  const windSpeed = make("p", "windSpeed");
  const humidity = make("p", "humidity");
  airContainer.append(windSpeed);
  airContainer.append(humidity);

  //.name "Boise"
  //.main.temp
  //.main.temp_min
  //.main.temp_max
  //.main.feels_like
  //.main.humidity
  //.wind.speed
  //.weather[0].main
  //.weather[0].description
  //.weather[0].id

  if (weatherObject) {
    if (weatherObject.cod === `404`) {
      currentCity.textContent = "😭 City not found...";
    } else {
      currentCity.textContent = weatherObject.name;
      let degrees = "F";

      let tempF = Math.round(weatherObject.main.temp * 10) / 10;
      let tempC = Math.round((((tempF - 32) * 5) / 9) * 10) / 10;
      let minF = Math.round(weatherObject.main.temp_min * 10) / 10;
      let minC = Math.round((((minF - 32) * 5) / 9) * 10) / 10;
      let maxF = Math.round(weatherObject.main.temp_max * 10) / 10;
      let maxC = Math.round((((maxF - 32) * 5) / 9) * 10) / 10;

      temperature.textContent = `🌡️ ${tempF}°${degrees}`;
      tempMin.textContent = `Min ${minF}°`;
      tempMax.textContent = `Max ${maxF}°`;

      tempContainer.onclick = () => {
        if (degrees === "F") {
          degrees = "C";
          temperature.textContent = `🌡️ ${tempC}°${degrees}`;
          tempMin.textContent = `Min ${minC}°`;
          tempMax.textContent = `Max ${maxC}°`;
        } else {
          degrees = "F";
          temperature.textContent = `🌡️ ${tempF}°${degrees}`;
          tempMin.textContent = `Min ${minF}°`;
          tempMax.textContent = `Max ${maxF}°`;
        }
      };

      weatherMain.textContent = weatherObject.weather[0].main;
      weatherDesc.textContent = capitalize(
        weatherObject.weather[0].description
      );
      if (weatherObject.weather[0].main === "Clouds") {
        switch (weatherObject.weather[0].id) {
          case 801:
            weatherEmoji.textContent = weatherEmojis.Clouds[0];
            searchContainer.style.backgroundImage = `url(${weatherGifs.Clouds[0]})`;
            break;
          case 802:
            weatherEmoji.textContent = weatherEmojis.Clouds[1];
            searchContainer.style.backgroundImage = `url(${weatherGifs.Clouds[0]})`;
            break;
          case 803:
            weatherEmoji.textContent = weatherEmojis.Clouds[2];
            searchContainer.style.backgroundImage = `url(${weatherGifs.Clouds[1]})`;
            break;
          case 804:
            weatherEmoji.textContent = weatherEmojis.Clouds[3];
            searchContainer.style.backgroundImage = `url(${weatherGifs.Clouds[1]})`;
            break;

          default:
            break;
        }
      } else if (("" + weatherObject.weather[0].id)[0] === "7") {
        weatherEmoji.textContent = "🌫";
        searchContainer.style.backgroundImage = `url(${hazeGIF})`;
      } else {
        weatherEmoji.textContent =
          weatherEmojis[`${weatherObject.weather[0].main}`];
        searchContainer.style.backgroundImage = `url(${
          weatherGifs[`${weatherObject.weather[0].main}`]
        })`;
      }
      let wind = "MPH";
      let windMPH = Math.round(weatherObject.wind.speed * 10) / 10;
      let windKPH = Math.round(windMPH * 1.6 * 10) / 10;
      windSpeed.textContent = `💨 Wind Speed ${windMPH} mph`;
      humidity.textContent = `💧 Humidity ${weatherObject.main.humidity}%`;

      airContainer.onclick = () => {
        if (wind === "MPH") {
          wind = "KPH";
          windSpeed.textContent = `💨 Wind Speed ${windKPH} kph`;
        } else {
          wind = "MPH";
          windSpeed.textContent = `💨 Wind Speed ${windMPH} mph`;
        }
      };
    }
    currentCity.style.fontSize = "1.5rem";
  } else {
    currentCity.textContent = "🌎";
    currentCity.style.fontSize = "3rem";
  }
};

const searchCity = async (input) => {
  input = input.replace(/\s/g, "");
  console.log(`Searching for ${input}`);
  let weather = await getWeather(input);
  buildDisplay(weather);
};
