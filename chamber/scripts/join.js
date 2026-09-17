const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();

const modalButtons = document.querySelectorAll("[data-modal]");
const closeButtons = document.querySelectorAll(".close-modal");

modalButtons.forEach(button => {
    button.addEventListener("click", () => {
        const modal = document.querySelector(`#${button.dataset.modal}`);
        modal.showModal();
    });
});

closeButtons.forEach(button => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});