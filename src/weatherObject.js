const key = "0a435c1c1973ab9b4493dc1750da6d7e";

export const getWeather = async (location) => {
  if (!location) location = "Boise,ID,US";
  let response;
  let weatherObject;
  try {
    response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${key}`,
      {
        mode: "cors",
      }
    );
    weatherObject = await response.json();
  } catch (error) {
    console.log("Error:");
    console.log(error);
  }

  return weatherObject;
};


