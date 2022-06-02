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
        validationModal()
    }
}

/**
 * Displaying or removing error message from a specific field with a specific type
 * @param {string} type 
 * @param {DomElement | Array<DomElement>} field 
 * @return {Boolean} - Is the field is valid
 */
export function displayField(type, field) {
    let isValid = false;

    if (validateField(type, field)) {
        if (type == "radio") {
            field[0].parentElement.querySelector(".alert_form").style.display = "none"
        } else {
            field.parentElement.querySelector(".alert_form").style.display = "none"
        }
        isValid = true;
    } else {
        if (type == "radio") {
            field[0].parentElement.querySelector(".alert_form").style.display = "block"
        } else {
            field.parentElement.querySelector(".alert_form").style.display = "block"
        }
    }

    return isValid
}

/**
 * Check if the field is valid for a given type and returns true or false
 * @param {string} type 
 * @param {DomElement | Array<DomElement>} field 
 * @return {Boolean} - Is the field is valid
 */
function validateField(type, field) {
    let isValid = false
    switch (type) {
        /**
         * Checking if the text field have 2 or more characters
         */
        case "text":
            if (field.value.length >= 2) isValid = true;
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
            break;

        /**
         * Checking number iunput value with a Regex : 
         * - One or more number
         */
        case "number":
            let numberRegex = /^[0-9]+$/;
            if (numberRegex.test(field.value)) isValid = true;
            break;

        /**
         * Checking if one radio button is checked
         */
        case "radio":
            field.forEach(radio => {
                if (radio.checked === true) isValid = true;
            })
            break;

        /**
         * Checking if the checkbox input is checked
         */
        case "checkbox":
            if (field.checked) isValid = true;
            break;

        /**
         * If none of case, isValid will remain false and break
         */
        default:
            break;
    }
    return isValid;
}

/**
 * Change the modal body for the confirmation message
 */
function validationModal(){
    document.getElementsByClassName("modal-body")[0].innerHTML = "<div>Merci, votre reservation a bien été recue</div>"
}