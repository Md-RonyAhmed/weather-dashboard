// DOM Elements
const elements = {
  cityName: document.getElementById("city-name"),
  temperature: document.getElementById("temp"),
  weatherIcon: document.getElementById("weather-icon"),
  dateTime: document.getElementById("date-time"),
  title: document.getElementById("title"),
  maxTemperature: document.getElementById("max-temp"),
  minTemperature: document.getElementById("min-temp"),
  humidity: document.getElementById("humidity"),
  cloudiness: document.getElementById("clouds"),
  windSpeed: document.getElementById("wind"),
  searchInput: document.getElementById("search-input"),
  searchBtn: document.getElementById("btn"),
  loadingElement: document.getElementById("loading"),
};

// Weather API Configuration
const API_KEY = "4bb0324851d437735c61dac4feb4c5e2";
const URL = "https://api.openweathermap.org/data/2.5/weather";

// Icon Mapping
const weatherIcons = {
  Haze: "/assets/haze.svg",
  Fog: "/assets/haze.svg",
  Mist: "/assets/haze.svg",
  Clouds: "/assets/cloud.svg",
  Clear: "/assets/sun.svg",
  Rain: "/assets/rainy.svg",
  Thunderstorm: "/assets/thunder.svg",
  Snow: "/assets/icons/snow.svg",
  Drizzle: "/assets/drizzle-svgrepo-com.svg",
};

// Event Listener for Search Button
elements.searchBtn.addEventListener("click", () => {
  const city = elements.searchInput.value.trim();
  if (city) {
    getWeather({ city });
    elements.searchInput.value = "";
  }
});

// Get Weather Data
const getWeather = async (info) => {
  const { lat, long, city } = info || {};
  toggleLoader(true);

  try {
    const fetchURL = city
      ? `${URL}?q=${city}&appid=${API_KEY}&units=metric`
      : `${URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    const data = await fetchData(fetchURL);
    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  } finally {
    toggleLoader(false);
  }
};

// Fetch Data
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch data");
  return await response.json();
};

// Update UI with Weather Data
const updateWeatherUI = (data) => {
  elements.cityName.innerText = data?.name === "Sāmāir" ? "Dhaka" : data?.name;
  elements.temperature.innerText = `${Math.round(data?.main?.temp)}°c`;
  elements.dateTime.innerHTML = formatDateTime(data?.dt);
  elements.title.innerHTML = formatWeatherTitle(data?.weather[0]?.main);
  elements.maxTemperature.innerText = `${Math.round(data?.main?.temp_max)}°c`;
  elements.minTemperature.innerText = `${Math.round(data?.main?.temp_min)}°c`;
  elements.humidity.innerText = `${data?.main?.humidity}%`;
  elements.cloudiness.innerText = `${data?.clouds?.all}%`;
  elements.windSpeed.innerText = `${data?.wind?.speed} m/s`;
  elements.weatherIcon.src =
    weatherIcons[data?.weather[0]?.main] || "/assets/cloud.svg";
};

// Toggle Loader Visibility
const toggleLoader = (show) => {
  if (show) {
    elements.loadingElement.classList.remove("hidden");
    elements.loadingElement.classList.add("flex");
  } else {
    elements.loadingElement.classList.add("hidden");
    elements.loadingElement.classList.remove("flex");
  }
};

// Format Date and Time
const formatDateTime = (timestamp) => {
  const timeString = getFormattedDate(timestamp, "time", false);
  const dateString = getFormattedDate(timestamp, "date", false);
  return `<p>${timeString} - ${dateString}</p>`;
};

// Format Weather Title
const formatWeatherTitle = (mainWeather) => {
  return `<p>The climate is <u class="text-orange-500">${mainWeather}</u></p>`;
};

// Get Formatted Date
function getFormattedDate(value, type, inMS) {
  if (!type) return value;
  if (!inMS) value *= 1000;

  const date = new Date(value);
  const options =
    type === "date"
      ? { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      : { hour: "numeric", minute: "numeric" };

  return new Intl.DateTimeFormat("en-us", options).format(date);
}

// Get Weather on Page Load Using Geolocation
navigator.geolocation.getCurrentPosition((position) => {
  const { latitude, longitude } = position.coords;
  getWeather({ lat: latitude, long: longitude });
});
