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
formateDate();

// Display searched or default City
function displayCity(response) {
  console.log(response);
  let city = document.querySelector(".currentCity");
  let temperature = document.querySelector("#temp");
  let weather = document.querySelector("#pronostic");
  let pin = document.querySelector("#pin");

  city.innerHTML = `${response.data.name} , ${response.data.sys.country}`;
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  weather.innerHTML = response.data.weather[0].main;
  pin.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//Search City
function searchCity(city) {
  let apiKey = "940d67fee297ecd4e75bb56949c97896";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCity);
}
//
function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  searchCity(city.value);
}

searchCity("Vancouver");
let search = document.querySelector("#search-form");
search.addEventListener("submit", handleSearch);

// Change to Celsius and Farenheit
function changetoCelsius() {
  let temp = document.querySelector("#temp");
  temp.innerHTML = `00`;
}
function changetoFahren() {
  let temp = document.querySelector("#temp");
  temp.innerHTML = `70`;
}
let celsius = document.querySelector("#celsius-link");
let fahrenheit = document.querySelector("#fahrenheit-link");

celsius.addEventListener("click", changetoCelsius);
fahrenheit.addEventListener("click", changetoFahren);

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

//Change days in table
function getdays() {
  let now = new Date();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentday = Number(now.getDay());
  let count = 0;
  let nextday = currentday;
  while (count < 6) {
    let day = document.querySelector(`.day${count}`);
    if (nextday === 6) {
      nextday = 0;
    } else {
      nextday += 1;
    }
    day.innerHTML = days[nextday];
    count += 1;
  }
}
getdays();
