const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");
const dateTime = document.getElementById("date-time");
const title = document.getElementById("title");
const maxTemperature = document.getElementById("max-temp");
const minTemperature = document.getElementById("min-temp");
const humidity = document.getElementById("humidity");
const cloudiness = document.getElementById("clouds");
const windSpeed = document.getElementById("wind");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("btn");

searchBtn.addEventListener("click", () => {
  const city = searchInput.value;
  if (city === "") {
    return;
  }
  getWeather({ city });
  searchInput.value = "";
});

const API_KEY = "4bb0324851d437735c61dac4feb4c5e2";
const URL = "https://api.openweathermap.org/data/2.5/weather";

const getWeather = async (info) => {
  const { lat, long, city } = info || undefined;

  try {
    const fetchURL = city
      ? `${URL}?q=${city}&appid=${API_KEY}&units=metric`
      : `${URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    const response = await fetch(fetchURL);
    const data = await response.json();
    console.log(data);
    cityName.innerText = data?.name === "Sāmāir" ? "Dhaka" : data?.name;
    temperature.innerText = `${Math.round(data?.main?.temp)}°c`;

    dateTime.innerHTML = `<p>
        ${getFormattedDate(data?.dt, "time", false)} - ${getFormattedDate(
      data?.dt,
      "date",
      false
    )}
    </p>`;

    title.innerHTML = `
       <p>
        The climate is <u class="text-orange-500">${data?.weather[0]?.main}</u>
       </p>
    `;

    maxTemperature.innerText = `${Math.round(data?.main?.temp_max)}°c`;
    minTemperature.innerText = `${Math.round(data?.main?.temp_min)}°c`;
    humidity.innerText = `${data?.main?.humidity}%`;
    cloudiness.innerText = `${data?.clouds?.all}%`;
    windSpeed.innerText = `${data?.wind?.speed} m/s`;

    if (data?.weather[0]?.main === "Haze") {
      weatherIcon.src = "./assets/haze.svg";
    }
    if (data?.weather[0]?.main === "Fog") {
      weatherIcon.src = "./assets/haze.svg";
    }
    if (data?.weather[0]?.main === "Mist") {
      weatherIcon.src = "./assets/haze.svg";
    }
    if (data?.weather[0]?.main === "Clouds") {
      weatherIcon.src = "./assets/cloud.svg";
    }
    if (data?.weather[0]?.main === "Clear") {
      weatherIcon.src = "./assets/sun.svg";
    }
    if (data?.weather[0]?.main === "Rain") {
      weatherIcon.src = "./assets/rainy.svg";
    }
    if (data?.weather[0]?.main === "Thunderstorm") {
      weatherIcon.src = "./assets/thunder.svg";
    }
    if (data?.weather[0]?.main === "Snow") {
      weatherIcon.src = "./assets/icons/snow.svg";
    }
  } catch (error) {
    console.log(error.message);
  }
};

navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  getWeather({ lat: latitude, long: longitude });
});

function getFormattedDate(value, type, inMS) {
  if (!type) return value;

  if (!inMS) {
    value = value * 1000;
  }

  const date = new Date(value);
  let options;

  if (type === "date") {
    options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  } else if (type === "time") {
    options = {
      hour: "numeric",
      minute: "numeric",
    };
  }

  return new Intl.DateTimeFormat("en-us", options).format(date);
}
