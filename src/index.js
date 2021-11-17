let date = new Date();
let hour = date.getHours();
let minutes = date.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
console.log(day);
let currentDateTime = document.querySelector(".datetime");
currentDateTime.innerHTML = `${day}, ${hour}: ${minutes}`;

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#hum").innerHTML = response.data.main.humidity;
  document.querySelector("#current-conditions").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#hi").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#lo").innerHTML = Math.round(
    response.data.main.temp_min
  );
}

function searchCity(city) {
  let units = "imperial";
  let apiKey = "4af869c2b16527dd3b375c7f352dada0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function findLocation(position) {
  let apiKey = "4af869c2b16527dd3b375c7f352dada0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", currentLocation);

searchCity("Portland");
