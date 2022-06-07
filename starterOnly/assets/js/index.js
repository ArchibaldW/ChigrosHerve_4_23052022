import {validateForm, addChangeListeners} from "./form.js"
import {setupModal} from './modal.js'

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

setupModal()

const form = document.getElementById("form")
// Form Validation when change
addChangeListeners()

// Form Validation when submit
form.addEventListener("submit", validateForm)