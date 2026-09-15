const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast-container");

const apiKey = "9a54416b4e8b160d53dc166d23545e6e";
const lat = 34.51;
const lon = -109.36;

const currentUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getCurrentWeather() {
    try {
        const response = await fetch(currentUrl);

        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    currentTemp.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;
}

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);

        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    const dailyForecasts = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    const threeDayForecast = dailyForecasts.slice(0, 3);

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt_txt);

        const dayName = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        const temperature = Math.round(day.main.temp);

        const forecastItem = document.createElement("p");

        forecastItem.innerHTML =
            `<strong>${dayName}:</strong> ${temperature}&deg;F`;

        forecastContainer.appendChild(forecastItem);
    });
}

getCurrentWeather();
getForecast();