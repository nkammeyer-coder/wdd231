const featuredContainer = document.querySelector("#featured-items");

const stopsContainer = document.querySelector("#upcoming-stops");

let savedStops = JSON.parse(localStorage.getItem("savedStops")) || [];

async function getMenuItems() {
    try {
        const response = await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Unable to load menu data.");
        }

        const menuItems = await response.json();
        const featuredItems = getRandomFeatured(menuItems, 3);

        displayFeaturedItems(featuredItems);
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

function getRandomFeatured(items, count) {
    const featuredItems = items.filter(item => item.featured);

    for (let i = featuredItems.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [featuredItems[i], featuredItems[randomIndex]] =
            [featuredItems[randomIndex], featuredItems[i]];
    }

    return featuredItems.slice(0, count);
}

function displayFeaturedItems(items) {
    featuredContainer.innerHTML = "";

    items.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("menu-card");

        let price;

        if (item.regularPrice !== undefined && item.largePrice !== undefined) {
            price = `Regular $${item.regularPrice.toFixed(2)} | Large $${item.largePrice.toFixed(2)}`;
        } else {
            price = `$${item.price.toFixed(2)}`;
        }

        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">${price}</p>
        `;

        featuredContainer.appendChild(card);
    });
}
async function getUpcomingStops() {
    try {
        const response = await fetch("data/stops.json");

        if (!response.ok) {
            throw new Error("Unable to load upcoming stops.");
        }

        const stops = await response.json();
        displayUpcomingStops(stops);
    } catch (error) {
        console.error("Error loading upcoming stops:", error);
    }
}

function displayUpcomingStops(stops) {
    stopsContainer.innerHTML = "";

    stops.forEach(stop => {
        const card = document.createElement("article");
        card.classList.add("stop-card");

        if (savedStops.includes(stop.id)) {
            card.classList.add("saved");
}

        const stopDate = new Date(`${stop.date}T00:00:00`);

        const formattedDate = stopDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
        });

        card.innerHTML = `
            <h3>${stop.name}</h3>
            <p><strong>${stop.location}</strong></p>
            <p>${stop.city}, Arizona</p>
            <p>${formattedDate}</p>
            <p>${stop.time}</p>
            <button class="save-stop" data-id="${stop.id}">
                ${savedStops.includes(stop.id) ? "Saved ✓" : "Save This Stop"}
            </button>
        `;

        stopsContainer.appendChild(card);
    });
}
stopsContainer.addEventListener("click", event => {
    if (event.target.classList.contains("save-stop")) {
        const stopId = Number(event.target.dataset.id);
        const card = event.target.closest(".stop-card");

        if (savedStops.includes(stopId)) {
            savedStops = savedStops.filter(id => id !== stopId);
            event.target.textContent = "Save This Stop";
            card.classList.remove("saved");
        } else {
            savedStops.push(stopId);
            event.target.textContent = "Saved ✓";
            card.classList.add("saved");
        }

        localStorage.setItem("savedStops", JSON.stringify(savedStops));
    }
});

getMenuItems();
getUpcomingStops();