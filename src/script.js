let coords = {};
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

// Format for forecast week-day
function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

//Format for forecasts hour
function formateHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();

  let time = `${hour}:00`;
  return time;
}
// Get Forecast
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
  fahrenheit.style.fontWeight = "normal";
  celsius.style.fontWeight = "bold";

  searchCityLat = response.data.coord.lat;
  searchCityLon = response.data.coord.lon;

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

//Display forecast week
function displayForecast(response) {
  let forecast = response.data.daily;
  todayButton.style.fontWeight = "normal";
  weekButton.style.fontWeight = "bold";
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast"><div class= "col-2"></div>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7 && index !== 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
       <div class="weather-forecast-date">${formateDay(forecastDay.dt)}</div>
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" alt="" width="50px"/>
       <div class="weather-forecast-temperatures">
         <span class="weather-forecast-temperatures-max">${Math.round(
           forecastDay.temp.max
         )}°  | </span>
         <span class="weather-forecast-temperatures-min">${Math.round(
           forecastDay.temp.min
         )}°</span>
         
       </div>
     </div>`;
    }
  });

  forecastHTML = forecastHTML + `<div class= "col-2"></div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Display today forecast
function displayTodayForecast(response) {
  let forecast = response.data.hourly;
  todayButton.style.fontWeight = "bold";
  weekButton.style.fontWeight = "normal";
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row forecast"><div class= "col-2"></div>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
       <div class="weather-forecast-date">${formateHour(forecastDay.dt)}</div>
       <img src="http://openweathermap.org/img/wn/${
         forecastDay.weather[0].icon
       }@2x.png" alt="" width="50px"/>
       <div class="weather-forecast-temperatures">
         <span class="weather-forecast-temperatures-max">${Math.round(
           forecastDay.temp
         )}°          
       </div>
     </div>`;
    }
  });
  forecastHTML = forecastHTML + `<div class= "col-2"></div></div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Change forecast to hourly
function getTodayForecast(event) {
  event.preventDefault();
  let apiKey = "940d67fee297ecd4e75bb56949c97896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTodayForecast);
}
function getWeekForecast(event) {
  event.preventDefault();
  let apiKey = "940d67fee297ecd4e75bb56949c97896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
  axios.get(apiUrl).then(displayCity);
}
function getposition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let position = document.querySelector("#position");
position.addEventListener("click", getposition);

//Calls
//Default city
searchCity("Vancouver");
//Search input city
let searchCityLat = null;
let searchCityLon = null;
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

//
let todayButton = document.querySelector("#today-button");
todayButton.addEventListener("click", getTodayForecast);
let weekButton = document.querySelector("#week-button");
weekButton.addEventListener("click", getWeekForecast);
