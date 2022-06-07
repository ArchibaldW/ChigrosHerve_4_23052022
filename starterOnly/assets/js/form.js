/**
 * Global fonction for forom validation, checking all the required fields and submiting if all good
 * @param {Event} e 
 */
export function validateForm(e) {
    e.preventDefault();

    const isValidFirst = displayField("text", document.getElementById("first"));
    const isValidLast = displayField("text", document.getElementById("last"));
    const isValidEmail = displayField("email", document.getElementById("email"));
    const isValidBirthdate = displayField("date", document.getElementById("birthdate"));
    const isValidQuantity = displayField("number", document.getElementById("quantity"));
    const isValidRadio = displayField("radio", document.querySelectorAll("input[name='location']"));
    const isValidCheckbox = displayField("checkbox", document.getElementById("checkbox1"));

    if (isValidFirst && isValidLast && isValidEmail && isValidBirthdate && isValidQuantity && isValidRadio && isValidCheckbox) {
        document.getElementById("form").reset()
    }
}

/**
 * Adding change or blur listeners to form fields
 */
export function addChangeListeners() {
    const first = document.getElementById("first");
    first.addEventListener("blur", () => displayField("text", first))

    const last = document.getElementById("last")
    last.addEventListener("blur", () => displayField("text", last))


    const email = document.getElementById("email")
    email.addEventListener("blur", () => displayField("email", email))


    const birthdate = document.getElementById("birthdate")
    birthdate.addEventListener("blur", () => displayField("date", birthdate))


    const quantity = document.getElementById("quantity")
    quantity.addEventListener("blur", () => displayField("number", quantity))


    const radios = document.querySelectorAll("input[name='location']")
    radios.forEach(radio => {
        radio.addEventListener('change', () => displayField("radio", radios))
    })
}

/**
 * Displaying or removing error message from a specific field with a specific type
 * @param {string} type 
 * @param {Element | null | NodeList} field 
 * @return {Boolean} - Is the field is valid
 */
function displayField(type, field) {
    let {
        isValid,
        message
    } = validateField(type, field);

    let alert_form = type == "radio" ? field[0].parentElement.querySelector(".alert_form") : field.parentElement.querySelector(".alert_form")

    if (!isValid) {
        if (type != "checkbox" && type != "radio") {
            if (!alert_form.classList.contains("is_wrong")) {
                field.classList.add("bounce");
                setTimeout(function () {
                    field.classList.remove("bounce");
                }, 1000);
                field.addEventListener("input", () => displayField(type, field));
            }
            field.classList.remove("form_ok");
            field.classList.add("form_wrong");
        }
        alert_form.classList.add("is_wrong");
        alert_form.textContent = message;
    } else {
        if (type != "checkbox" && type != "radio") {
            if (alert_form.classList.contains("is_wrong")) {
                // field.removeEventListener("input", inputOnField())
            }
            field.classList.remove("form_wrong")
            field.classList.add("form_ok")
        }
        alert_form.classList.remove("is_wrong")
        alert_form.textContent = null
    }

    return isValid
}

/**
 * Check if the field is valid for a given type and returns true or false
 * @param {string} type 
 * @param {Element | null | NodeList} field 
 * @return {Boolean} - Is the field is valid
 */
function validateField(type, field) {
    let isValid = false
    let message = null
    switch (type) {
        /**
         * Checking if the text field have 2 or more characters
         */
        case "text":
            if (field.value.length >= 2) isValid = true;
            else message = "Veuillez entrer 2 caractères ou plus.";
            break;

            /**
             * Cheking email input value with a Regex with multiple rules :
             * - Only allowed characters are lower case letters between a and z (no accent no cedilla), figures, dashs and dots
             * - Mail prefix don't begin by a figure, a dot or a dash and don't finish by a dot or a dash
             * - Part between at symbol and dot of domain name don't begin or finish by a dot or a dash
             * - The email can't have two special characters in a row (".." or ".-" for exemple)
             * - Domain name have between 2 and 4 characters
             */
        case "email":
            const emailRegex = /^[a-z]([.-]{0,1}[a-z0-9]+)*@[a-z0-9]([.-]{0,1}[a-z0-9]+)*\.[a-z0-9]{2,4}$/g;
            if (emailRegex.test(field.value)) isValid = true;
            else message = "Veuillez entrer une adresse email valide.";
            break;

            /**
             * Checking date input value with a Regex : 
             * - Years between 1900 or 2099
             * - Months between 1 and 12
             * - Days between 1 and 31 (maybe need a more powerfull Regex for month with less than 31 days)
             */
        case "date":
            let dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
            if (dateRegex.test(field.value)) isValid = true;
            else message = "Veuillez entrer une date valide.";
            break;

            /**
             * Checking number iunput value with a Regex : 
             * - One or more number
             */
        case "number":
            let numberRegex = /^[0-9]+$/;
            if (numberRegex.test(field.value)) isValid = true;
            else message = "Veuillez entrer un nombre valide.";
            break;

            /**
             * Checking if one radio button is checked
             */
        case "radio":
            field.forEach(radio => {
                if (radio.checked === true) isValid = true;
            })
            if (!isValid) message = "Veuillez choisir au moins une ville."
            break;

            /**
             * Checking if the checkbox input is checked
             */
        case "checkbox":
            if (field.checked) isValid = true;
            else message = "Vous devez accepter les termes et conditions."
            break;

            /**
             * If none of case, isValid will remain false and break
             */
        default:
            break;
    }
    return {
        isValid,
        message
    };
}

/**
 * Change the modal body for the confirmation message
 */
function validationModal() {
    document.getElementsByClassName("modal-body")[0].innerHTML = "<div>Merci, votre reservation a bien été recue</div>"
}