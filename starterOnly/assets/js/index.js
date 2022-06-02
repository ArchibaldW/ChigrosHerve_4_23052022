import {validateForm, addChangeListeners} from "./formValidation.js"

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.getElementById("close")
const form = document.getElementById("form")

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

// Form Validation when change
addChangeListeners()

// Form Validation when submit
form.addEventListener("submit", validateForm)