//Current date
function formateDate() {
  let date = document.querySelector("#date");
  let time = document.querySelector("#hour");
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wendnesday",
    "Thuersday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = now.getDate();
  let month = months[now.getMonth()];
  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  date.innerHTML = `${month}, ${day}`;
  time.innerHTML = `${hour}:${minutes}`;
}

// Get Forcast
function getForecast(coordinates) {
  let apiKey = "940d67fee297ecd4e75bb56949c97896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// Display searched or default City
function displayCity(response) {
  let city = document.querySelector(".currentCity");
  let temperature = document.querySelector("#temp");
  let weather = document.querySelector("#pronostic");
  let pin = document.querySelector("#pin");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  celsiusTemperature = response.data.main.temp;

  city.innerHTML = `${response.data.name} , ${response.data.sys.country}`;
  temperature.innerHTML = `${Math.round(celsiusTemperature)}`;
  weather.innerHTML = response.data.weather[0].main;
  wind.innerHTML = Math.round(response.data.wind.speed);
  humidity.innerHTML = response.data.main.humidity;
  pin.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}
//Search city
function searchCity(city) {
  let apiKey = "940d67fee297ecd4e75bb56949c97896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCity);
}
// Handle search input
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  searchCity(city.value);
}

//Display forecast // injecting
function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
       <div class="weather-forecast-date">${day}</div>
       <img src="_" class="weather-forecast-icon" />
       <div class="weather-forecast-temperatures">
         <span class="weather-forecast-temperatures-max">00°</span>
         <span class="weather-forecast-temperatures-min">00°</span>
         <span class="weather-forecast-temperatures-unit">C</span>
       </div>
     </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Change to Celsius and Farenheit
function displayFahrenheit(event) {
  event.preventDefault();
  celsius.style.fontWeight = "normal";
  fahrenheit.style.fontWeight = "bold";

  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsius(event) {
  event.preventDefault();
  fahrenheit.style.fontWeight = "normal";
  celsius.style.fontWeight = "bold";

  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

//Change to Current location
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat);
  let apiKey = "940d67fee297ecd4e75bb56949c97896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showCurrentCity);
}

//navigator.geolocation.getCurrentPosition(handlePosition);

//Calls
//Default city
searchCity("Vancouver");
//Search input city
let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSearch);

//Currente temperature
let celsiusTemperature = null;
// Change currente temperature
let fahrenheit = document.querySelector("#fahrenheit-link");
let celsius = document.querySelector("#celsius-link");
fahrenheit.addEventListener("click", displayFahrenheit);
celsius.addEventListener("click", displayCelsius);

// Current date
formateDate();
