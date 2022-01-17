// Default City
function displayCity(response) {
  let city = document.querySelector(".currentCity");
  city.innerHTML = `${response.data.name} , ${response.data.sys.country}`;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = `${Math.round(response.data.main.temp)}`;
  let weather = document.querySelector("#pronostic");
  currentWeather = response.data.weather[0].main;
  weather.innerHTML =
    currentWeather.charAt(0).toUpperCase() + currentWeather.slice(1);
}
let apiKey = "940d67fee297ecd4e75bb56949c97896";
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Vancouver&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayCity);

//Currente date
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
