const input = document.getElementById("input");
const searchBtn = document.getElementById("search");

const API_KEY = "9c3adf3244581fac3747e5272fe6c7b5";

searchBtn.addEventListener("click", () => {
  const city = input.value.trim();

  if (city === "") {
    alert("Podaj nazwę miejscowości!");
    return;
  }

  getCurrentWeather(city);
  getForecast(city);
});

function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(() => alert("Nie znaleziono miejscowości!"));
}

function displayCurrentWeather(data) {
  let container = document.getElementById("weather-current");

  if (!container) {
    container = document.createElement("section");
    container.id = "weather-current";
    container.className = "weather-box";
    document.body.insertBefore(container, document.querySelector("footer"));
  }

  const icon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  container.innerHTML = `
    <div class="column-title">
      <h2>Aktualna pogoda: ${data.name}</h2>
      <div class="row">
        <img src="${iconUrl}" alt="ikona pogody">
        <div class="column">
          <p>Temperatura: <strong>${data.main.temp}°C</strong></p>
          <p>Odczuwalna: <strong>${data.main.feels_like}°C</strong></p>
          <p>Wilgotność: <strong>${data.main.humidity}%</strong></p>
          <p>Opis: <strong>${data.weather[0].description}</strong></p>
        </div>
      </div>
    </div>
  `;
}

function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(data => {
      displayForecast(data);
    })
    .catch(() => alert("Błąd pobierania prognozy"));
}

function displayForecast(data) {
  let container = document.getElementById("weather-forecast");

  if (!container) {
    container = document.createElement("section");
    container.id = "weather-forecast";
    container.className = "weather-box";
    document.body.insertBefore(container, document.querySelector("footer"));
  }

  let html = `
    <div class="column-title">
      <h2>Prognoza 5-dniowa</h2>
    </div>
    <div class="forecast-grid">
  `;

  let currentDate = "";

  data.list.forEach(item => {
    const [date, time] = item.dt_txt.split(" ");

    if (date !== currentDate) {
      currentDate = date;
      html += `
        <div class="forecast-day">
          <h3>${date}</h3>
        </div>
      `;
    }

    const icon = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    html += `
      <div class="forecast-card">
        <p class="forecast-time">${time.slice(0,5)}</p>
        <img src="${iconUrl}" alt="ikona">
        <p class="forecast-temp">${item.main.temp}°C</p>
        <p class="forecast-desc">${item.weather[0].description}</p>
      </div>
    `;
  });

  html += `</div>`;

  container.innerHTML = html;
}