import { validateForm, addChangeListeners } from './form.js';
import setupModal from './modal.js';

function editNav() {
  const x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

const navBtn = document.getElementById('navbarBtn');
navBtn.addEventListener('click', editNav);

setupModal();

const form = document.getElementById('form');
// Form Validation when change
addChangeListeners();

// Form Validation when submit
form.addEventListener('submit', validateForm);
