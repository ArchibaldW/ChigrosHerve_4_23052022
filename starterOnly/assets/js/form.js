/**
 * Checking if the text field have 2 or more characters
 * @param {string} text
 * @returns {Object}
 */
export function validateText(text) {
  let isValid = false;
  let message = '';
  if (text.length >= 2) isValid = true;
  else message = 'Veuillez entrer 2 caractères ou plus.';
  return {
    isValid,
    message,
  };
}

/**
 * @param {string} email
 * @returns {Object}
 * Cheking email input value with a Regex with multiple rules :
 * - Only allowed characters are lower case letters between a and z (no accent no cedilla),
 *    figures, dashs and dots
 * - Mail prefix don't begin by a figure, a dot or a dash and don't finish by a dot or a dash
 * - Part between at symbol and dot of domain name don't begin or finish by a dot or a dash
 * - The email can't have two special characters in a row (".." or ".-" for exemple)
 * - Domain name have between 2 and 4 characters
 */
export function validateEmail(email) {
  const emailRegex = /^[a-z]([.-]{0,1}[a-z0-9]+)*@[a-z0-9]([.-]{0,1}[a-z0-9]+)*\.[a-z0-9]{2,4}$/i;
  const isValid = emailRegex.test(email);
  let message = '';
  if (!isValid) {
    message = 'Veuillez entrer une adresse email valide.';
  }
  return {
    isValid,
    message,
  };
}

/**
 * Add a 0 before an unique Digit number
 * @param {any} n
 * @return {any} - Exemple : 9 => 09 | 19 => 19
 */

function twoDigit(n) {
  if (n < 10) {
    return 0 + n;
  }
  return n;
}

/**
 * Return a formated date from a specific Date Object
 * @param {Date} date
 * @return {string} - Exemple : "2022-01-06"
 */

function formatDate(date) {
  return [date.getFullYear(), twoDigit(date.getMonth() + 1), twoDigit(date.getDate())].join('-');
}

/**
 * @param {string} date
 * @returns {Object}
 * Checking date input value with a Regex :
 * - Years between 1900 or 2099
 * - Months between 1 and 12
 * - Days between 1 and 31
 * - Checking if the date is valid (1991-02-31 is not valid)
 */
export function validateDate(date) {
  const dateRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])$/;
  let isValid = false;
  if (dateRegex.test(date)) {
    const testDate = new Date(date);
    isValid = formatDate(testDate) === date;
  }
  let message = '';
  if (!isValid) {
    message = 'Veuillez entrer une date valide.';
  }
  return {
    isValid,
    message,
  };
}

/**
 * @param {number} number
 * @returns {Object}
 * Checking number iunput value with a Regex :
 * - One or more number
 */
export function validateNumber(number) {
  const numberRegex = /^[0-9]+$/;
  const isValid = numberRegex.test(number);
  let message = '';
  if (!isValid) {
    message = 'Veuillez entrer un nombre valide.';
  }
  return {
    isValid,
    message,
  };
}

/**
 * @param {Element} radio
 * @returns {Object}
 * Checking if one radio button is checked
 */
export function validateRadio(radio) {
  let isValid = false;
  let message = '';
  radio.forEach((button) => {
    if (button.checked === true) isValid = true;
    else message = 'Veuillez choisir au moins une ville.';
  });
  return {
    isValid,
    message,
  };
}

/**
 * @param {Element} checkbox
 * @returns {Object}
 * Checking if the checkbox input is checked
 */
export function validateCheckbox(checkbox) {
  const isValid = checkbox.checked;
  let message = '';
  if (!isValid) {
    message = 'Vous devez accepter les termes et conditions.';
  }
  return {
    isValid,
    message,
  };
}

/**
 * Get the type of input
 * @param {Element} field
 * @return {string}
 */
function getType(field) {
  return field.length ? 'radio' : field.getAttribute('type');
}

/**
 * Check if the field is valid for a given type and returns true or false
 * @param {string} type
 * @param {Element | null | NodeList} field
 * @return {Object} - Is the field is valid
 */
function validateField(field) {
  let returnValue = null;
  const type = getType(field);
  switch (type) {
    case 'text':
      returnValue = validateText(field.value);
      break;

    case 'email':
      returnValue = validateEmail(field.value);
      break;

    case 'date':
      returnValue = validateDate(field.value);
      break;

    case 'number':
      returnValue = validateNumber(field.value);
      break;

    case 'radio':
      returnValue = validateRadio(field);
      break;

    case 'checkbox':
      returnValue = validateCheckbox(field);
      break;

      /**
       * If none of case, isValid will remain false and break
       */
    default:
      break;
  }
  return returnValue;
}

/**
 * Displaying or removing error message from a specific field with a specific type
 * @param {string} type
 * @param {Element | null | NodeList} field
 * @return {Boolean} - Is the field is valid
 */
function displayField(field) {
  const validateReturn = validateField(field);
  const {
    isValid,
  } = validateReturn;
  const {
    message,
  } = validateReturn;
  const type = getType(field);

  const alertForm = type === 'radio' ? field[0].parentElement.querySelector('.alert_form') : field.parentElement.querySelector('.alert_form');

  if (!isValid) {
    if (type !== 'checkbox' && type !== 'radio') {
      if (!alertForm.classList.contains('is_wrong')) {
        field.classList.add('bounce');
        field.classList.add('bounce');
        setTimeout(() => {
          field.classList.remove('bounce');
        }, 1000);
      }
      field.classList.remove('form_ok');
      field.classList.add('form_wrong');
    }
    alertForm.classList.add('is_wrong');
    alertForm.textContent = message;
  } else {
    if (type !== 'checkbox' && type !== 'radio') {
      field.classList.remove('form_wrong');
      field.classList.add('form_ok');
    }
    alertForm.classList.remove('is_wrong');
    alertForm.textContent = null;
  }

  return isValid;
}

/**
 * Change the modal body for the confirmation message
 */
function validationModal() {
  document.getElementById('modal-body').classList.add('form-valid');
  document.getElementById('form').reset();
  document.querySelectorAll('.form_ok').forEach((element) => {
    element.classList.remove('form_ok');
  });
}

/**
 * Global fonction for forom validation, checking all the required fields and submiting if all good
 * @param {Event} e
 */
export function validateForm(e) {
  e.preventDefault();

  const isValidFirst = displayField(document.getElementById('first'));
  const isValidLast = displayField(document.getElementById('last'));
  const isValidEmail = displayField(document.getElementById('email'));
  const isValidBirthdate = displayField(document.getElementById('birthdate'));
  const isValidQuantity = displayField(document.getElementById('quantity'));
  const isValidRadio = displayField(document.querySelectorAll("input[name='location']"));
  const isValidCheckbox = displayField(document.getElementById('checkbox1'));

  if (isValidFirst && isValidLast && isValidEmail && isValidBirthdate
    && isValidQuantity && isValidRadio && isValidCheckbox) {
    validationModal();
  }
}

/**
 * @param {Element} input
 */
function addInputsListeners(inputs) {
  inputs.forEach((input) => {
    input.addEventListener('blur', () => displayField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('form_wrong') || input.classList.contains('form_ok')) {
        displayField(input);
      }
    });
  });
}

/**
 * Adding change or blur listeners to form fields
 */
export function addChangeListeners() {
  const first = document.getElementById('first');
  const last = document.getElementById('last');
  const email = document.getElementById('email');
  const birthdate = document.getElementById('birthdate');
  const quantity = document.getElementById('quantity');
  addInputsListeners([first, last, email, birthdate, quantity]);

  const radios = document.querySelectorAll("input[name='location']");
  radios.forEach((radio) => {
    radio.addEventListener('change', () => displayField(radios));
  });
}
