const menuContainer = document.querySelector("#menu-items");
const filterButtons = document.querySelectorAll(".filter-button");
const menuModal = document.querySelector("#menu-modal");
const modalContent = document.querySelector("#modal-content");
const closeModal = document.querySelector("#close-modal");

let menuItems = [];

async function getMenuItems() {
    try {
        const response = await fetch("data/menu.json");

        if (!response.ok) {
            throw new Error("Unable to load menu data.");
        }

        menuItems = await response.json();
        displayMenuItems(menuItems);
    } catch (error) {
        console.error("Error loading menu:", error);
    }
}

function displayMenuItems(items) {
    menuContainer.innerHTML = "";

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
            <button class="details-button" data-id="${item.id}">
                More Details
            </button>
        `;

        menuContainer.appendChild(card);
    });
}
function displayModal(item) {
    let price;

    if (item.regularPrice !== undefined && item.largePrice !== undefined) {
        price = `Regular $${item.regularPrice.toFixed(2)} | Large $${item.largePrice.toFixed(2)}`;
    } else {
        price = `$${item.price.toFixed(2)}`;
    }

    modalContent.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p class="price">${price}</p>
    `;

    menuModal.showModal();
}
menuContainer.addEventListener("click", event => {
    if (event.target.classList.contains("details-button")) {
        const itemId = Number(event.target.dataset.id);

        const selectedItem = menuItems.find(item => item.id === itemId);

        if (selectedItem) {
            displayModal(selectedItem);
        }
    }
});

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;

        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        if (category === "All") {
            displayMenuItems(menuItems);
        } else {
            const filteredItems = menuItems.filter(
                item => item.category === category
            );

            displayMenuItems(filteredItems);
        }
    });
});
closeModal.addEventListener("click", () => {
    menuModal.close();
});

menuModal.addEventListener("click", event => {
    if (event.target === menuModal) {
        menuModal.close();
    }
});

getMenuItems();