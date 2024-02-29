function searchCity(city) {
  let apiKey = "ef28bo275ed9fd6ce37aba445ad5t8b0";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query={query}&key={key}";
}

function makeSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");

  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", makeSearch);
