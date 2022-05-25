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
const formData = document.querySelectorAll(".formData");
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

// Form Validation
form.addEventListener("submit", validateForm)

function validateForm(e) {
  e.preventDefault();

  removeAlerts();

  let valid = true

  if (!firstNameValidation()) valid = false
  if (!lastNameValidation()) valid = false
  if (!emailValidation()) valid = false
  if (!birthdateValidation()) valid = false
  if (!quantityValidation()) valid = false
  if (!locationsValidation()) valid = false
  if (!checkbox1Validation()) valid = false

  if (valid) {
    alert("Merci ! Votre réservation a été reçue.")
    //form.submit()
  }
}

function firstNameValidation() {
  const firstName = document.getElementById("first");
  if (firstName.value.length >= 2) {
    return true
  }
  alertMessage(firstName, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")
  return false
}

function lastNameValidation() {
  const lastName = document.getElementById("last");
  if (lastName.value.length >= 2) {
    return true
  }
  alertMessage(lastName, "Veuillez entrer 2 caractères ou plus pour le champ du nom.")
  return false
}

function emailValidation() {
  const email = document.getElementById("email");
  const emailRegex = /^[a-z]([.-]{0,1}[a-z0-9]+)*@[a-z0-9]([.-]{0,1}[a-z0-9]+)*\.[a-z0-9]{2,4}$/i;
  if (emailRegex.test(email.value)) {
    return true
  }
  alertMessage(email, "Veuillez entrer une adresse email valide.")
  return false
}

function birthdateValidation() {
  const birthdate = document.getElementById("birthdate");
  if (birthdate.value) {
    return true
  }
  alertMessage(birthdate, "Veuillez entrer une date de naissance.")
  return false
}

function quantityValidation(){
  const quantity = document.getElementById("quantity");
  quantityRegex = /^[0-9]+$/i
  if (quantityRegex.test(quantity.value)) {
    return true
  }
  alertMessage(quantity, "Veuillez entrer un nombre valide.")
  return false
}

function locationsValidation() {
  const radioButtons = document.querySelectorAll("input[name='location']")
  let valid = false
  radioButtons.forEach(radio => {
    if (radio.checked === true) {
      console.log(radio.value)
      valid = true;
    }
  })
  if (!valid) alertMessage(radioButtons, "Veuillez choisir une ville", true)
  return valid
}

function checkbox1Validation() {
  let checkbox1 = document.getElementById("checkbox1");
  if (checkbox1.checked) {
    return true
  }
  alertMessage(checkbox1, "Vous devez accepter au moins les termes et conditions.")
  return false
}

function alertMessage(input, message, radio = false) {
  let alertMessage = document.createElement("div")
  alertMessage.classList.add("alert_form");
  alertMessage.innerHTML = message

  if (!radio) {
    input.parentElement.appendChild(alertMessage)
  } else {
    input[0].parentElement.appendChild(alertMessage)
  }
  //alert(message)
}

function removeAlerts(){
  const alerts = document.querySelectorAll(".alert_form")
  console.log(alerts)
  if (alerts.length > 0){
    alerts.forEach(alert => {
      alert.remove();
    })
  }
}