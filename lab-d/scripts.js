const input = document.getElementById("input");
const searchBtn = document.getElementById("search");

const API_KEY = "9c3adf3244581fac3747e5272fe6c7b5";

searchBtn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city === "") {
    alert("Podaj nazwę miasta!");
    return;
  }

  getCurrentWeather(city);
  getForecast(city);
});

function getCurrentWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      console.log("Current weather:", data);

      displayCurrentWeather(data);
    } else {
      alert("Nie znaleziono miasta!");
    }
  };

  xhr.send();
}

function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pl`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("Forecast:", data);
      displayForecast(data);
    })
    .catch(() => alert("Błąd pobierania prognozy"));
}

function displayCurrentWeather(data) {
  let container = document.getElementById("weather-current");

  if (!container) {
    container = document.createElement("section");
    container.id = "weather-current";
    container.className = "weather-box";
    document.body.insertBefore(container, document.querySelector("footer"));
  }

  container.innerHTML = `
        <h2>Aktualna pogoda: ${data.name}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Odczuwalna: ${data.main.feels_like}°C</p>
        <p>Wilgotność: ${data.main.humidity}%</p>
        <p>Opis: ${data.weather[0].description}</p>
    `;
}

function displayForecast(data) {
  let container = document.getElementById("weather-forecast");

  if (!container) {
    container = document.createElement("section");
    container.id = "weather-forecast";
    container.className = "weather-box";
    document.body.insertBefore(container, document.querySelector("footer"));
  }

  let html = `<h2>Prognoza 5‑dniowa</h2>`;

  data.list.forEach(item => {
    html += `
            <div class="forecast-item">
                <p><strong>${item.dt_txt}</strong></p>
                <p>Temp: ${item.main.temp}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `;
  });

  container.innerHTML = html;
}
