export default function setupModal() {
  // DOM Elements
  const modalbg = document.querySelector('.bground');
  const modalBtn = document.querySelectorAll('.modal-btn');
  const closeModalBtn = document.getElementById('close');

  // launch modal form
  function launchModal() {
    modalbg.style.display = 'block';
  }

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

  // Close modal form
  function closeModal() {
    modalbg.style.display = 'none';
  }

  // Close modal event
  closeModalBtn.addEventListener('click', closeModal);
}
