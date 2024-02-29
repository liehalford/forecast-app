function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature-id");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let city = response.data.city;
  let descriptionElement = document.querySelector(".description");
  let description = response.data.condition.description;
  let humidityElement = document.querySelector("#current-humidity");
  let humidity = `${response.data.temperature.humidity}%`;
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = `${response.data.wind.speed} km/h`;
  let timeElement = document.querySelector(".current-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#weather-icon");
  cityElement.innerHTML = city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = windSpeed;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0 ${minutes}`;
  }
  return ` ${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "ef28bo275ed9fd6ce37aba445ad5t8b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function makeSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "ef28bo275ed9fd6ce37aba445ad5t8b0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <span class="forecast-day">${day}</span>
    <span class="forecast-icon">
      <img src="img/rain-day.png" alt="rainy day" />
    </span>
    <span class="forecast-temperature">
      <strong>11°</strong> 5°
    </span>
  </div>
`;
  });
  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", makeSearch);

searchCity("Paris");
