export function setupModal() {
    // DOM Elements
    const modalbg = document.querySelector(".bground");
    const modalBtn = document.querySelectorAll(".modal-btn");
    const closeModalBtn = document.getElementById("close")

    // launch modal event
    modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

    // launch modal form
    function launchModal() {
        modalbg.style.display = "block";
    }

    // Close modal event
    closeModalBtn.addEventListener("click", closeModal)

    // Close modal form
    function closeModal() {
        modalbg.style.display = "none";
    }
}