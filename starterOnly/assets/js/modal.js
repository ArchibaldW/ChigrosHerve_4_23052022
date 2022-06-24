export default function setupModal() {
  // DOM Elements
  const modalbg = document.querySelector('.bground');
  const modalBtn = document.querySelectorAll('.modal-btn');
  const closeModalBtn = document.querySelectorAll('.close-btn');

  // launch modal form
  function launchModal() {
    modalbg.style.display = 'block';
  }

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

  // Close modal form
  function closeModal() {
    modalbg.style.display = 'none';
    document.getElementById('modal-body').classList.remove('form-valid');
  }

  // Close modal event
  closeModalBtn.forEach((btn) => btn.addEventListener('click', closeModal));
}
