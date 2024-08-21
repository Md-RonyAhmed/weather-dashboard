// DOM Elements
const elements = {
  formData: document.getElementById("form-data"),
  loadingElement: document.getElementById("loading"),
  weatherIconElement: document.getElementById("weather-icon"),
};

// Function to update elements dynamically
function updateElement(id, content, isHtml = false) {
  const element = document.getElementById(id);
  if (!element) return;

  if (isHtml) {
    element.innerHTML = content;
  } else {
    element.innerText = content;
  }
}

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
elements.formData.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = e.target["search-input"].value.trim();
  if (city) {
    getWeather({ city });
    e.target["search-input"].value = "";
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
    console.log(data);
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
  // Updating the weather UI using the dynamic function
  updateElement("city-name", data?.name === "Sāmāir" ? "Dhaka" : data?.name);
  updateElement("temp", `${Math.round(data?.main?.temp)}°c`);
  updateElement("date-time", formatDateTime(data?.dt), true); // using true for isHtml
  updateElement("title", formatWeatherTitle(data?.weather[0]?.main), true); // using true for isHtml
  updateElement("max-temp", `${Math.round(data?.main?.temp_max)}°c`);
  updateElement("min-temp", `${Math.round(data?.main?.temp_min)}°c`);
  updateElement("humidity", `${data?.main?.humidity}%`);
  updateElement("clouds", `${data?.clouds?.all}%`);
  updateElement("wind", `${data?.wind?.speed} m/s`);

  // Set the src attribute of the weather-icon element
  elements.weatherIconElement.src =
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
