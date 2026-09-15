const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast-container");

const spotlightCards = document.querySelector("#spotlight-cards");

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
async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.members);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const qualifiedMembers = members.filter(member =>
        member.membership === 2 || member.membership === 3
    );

    const shuffledMembers = qualifiedMembers.sort(() => Math.random() - 0.5);
    const selectedMembers = shuffledMembers.slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement("section");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";

        const membership = document.createElement("p");
        membership.textContent =
            member.membership === 3 ? "Gold Member" : "Silver Member";

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        spotlightCards.appendChild(card);
    });
}

getCurrentWeather();
getForecast();

getSpotlights();