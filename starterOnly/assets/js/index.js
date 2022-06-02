import {validateForm, displayField} from "./formValidation.js"

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
const first = document.getElementById("first");
first.addEventListener("blur", () => displayField("text",first))

const last = document.getElementById("last")
last.addEventListener("blur", () => displayField("text",last))


const email = document.getElementById("email")
email.addEventListener("blur", () => displayField("email",email))


const birthdate = document.getElementById("birthdate")
birthdate.addEventListener("blur", () => displayField("date",birthdate))


const quantity = document.getElementById("quantity")
quantity.addEventListener("blur", () => displayField("number",quantity))


const radios = document.querySelectorAll("input[name='location']")
let prev = null;
radios.forEach(radio => {
    radio.addEventListener('change', () => displayField("radio",radios))
})

// Form Validation when submit
form.addEventListener("submit", validateForm)