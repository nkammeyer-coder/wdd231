const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        menuButton.innerHTML = "&times;";
        menuButton.setAttribute("aria-label", "Close navigation menu");
    } else {
        menuButton.innerHTML = "&#9776;";
        menuButton.setAttribute("aria-label", "Open navigation menu");
    }
});