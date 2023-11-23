import "./weatherDisplay.css";

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

const make = (type, id = "") => {
  const element = document.createElement(type);
  element.id = id;
  return element;
};

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

let degrees = "F";

export const buildDisplay = (weatherObject) => {
  //Clear current display
  mainContainer.innerHTML = "";

  //Header with app title
  const headerContainer = make("div", "headerContainer");
  mainContainer.append(headerContainer);

  const appTitle = make("h1", "appTitle");
  appTitle.textContent = "Weather App";

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
  tempContainer.append(tempMin);
  tempContainer.append(tempMax);

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
      temperature.textContent = `🌡️ ${weatherObject.main.temp}° ${degrees}`;
      tempMin.textContent = `Min ${weatherObject.main.temp_min}°`;
      tempMax.textContent = `Max ${weatherObject.main.temp_max}°`;
      weatherMain.textContent = weatherObject.weather[0].main;
      weatherDesc.textContent = capitalize(
        weatherObject.weather[0].description
      );
      if (weatherObject.weather[0].main === "Clouds") {
        switch (weatherObject.weather[0].id) {
          case 801:
            weatherEmoji.textContent = weatherEmojis.Clouds[0]
            break;
          case 802:
            weatherEmoji.textContent = weatherEmojis.Clouds[1]
            break;
          case 803:
            weatherEmoji.textContent = weatherEmojis.Clouds[2]
            break;
          case 804:
            weatherEmoji.textContent = weatherEmojis.Clouds[3]
            break;

          default:
            break;
        }
      } else {
        weatherEmoji.textContent =
          weatherEmojis[`${weatherObject.weather[0].main}`];
      }
      windSpeed.textContent = `Wind Speed: ${weatherObject.wind.speed} mph`;
      humidity.textContent = `Humidity: ${weatherObject.main.humidity}%`;
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
