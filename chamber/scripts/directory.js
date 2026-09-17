const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displayMembers(data.members);
}

getMembers();

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement("section");
        if (member.membership === 4) {
            card.classList.add("gold");
        } else if (member.membership === 3) {
            card.classList.add("silver");
        } else if (member.membership === 2) {
            card.classList.add("bronze");
        } else {
            card.classList.add("nonprofit");
        }

        const image = document.createElement("img");
        const name = document.createElement("h2");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("a");
        const category = document.createElement("p");
        const membership = document.createElement("p");

        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;

        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener";

        category.textContent = member.category;

        let membershipLevel;

        if (member.membership === 4) {
            membershipLevel = "Gold Member";
        } else if (member.membership === 3) {
            membershipLevel = "Silver Member";
        } else if (member.membership === 2) {
            membershipLevel = "Bronze Member";
        } else {
            membershipLevel = "Nonprofit Member";
        }

        membership.textContent = membershipLevel;

        card.append(
            image,
            name,
            address,
            phone,
            website,
            category,
            membership
        );
        membersContainer.appendChild(card);
    });
}
gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});