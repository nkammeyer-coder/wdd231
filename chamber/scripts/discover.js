import { places } from "../data/places.mjs";

const discoverCards = document.querySelector("#discover-cards");

function displayPlaces(places) {
    places.forEach((place) => {
        const card = document.createElement("article");
        const title = document.createElement("h2");
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const address = document.createElement("address");
        const description = document.createElement("p");
        const button = document.createElement("button");

        title.textContent = place.name;

        image.src = `images/${place.image}`;
        image.alt = place.name;
        image.loading = "lazy";
        image.width = 300;

        address.textContent = place.address;
        description.textContent = place.description;
        button.textContent = "Learn More";

        figure.appendChild(image);

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        discoverCards.appendChild(card);
    });
}

displayPlaces(places);