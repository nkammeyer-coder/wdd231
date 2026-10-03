const featuredContainer = document.querySelector("#featured-items");

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

getMenuItems();