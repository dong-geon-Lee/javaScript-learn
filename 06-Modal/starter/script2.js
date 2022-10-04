const _doc = message => document.querySelector(message);
const _docAll = message => document.querySelectorAll(message);

const modalBtns = [..._docAll('.show-modal')];
const modalContainer = _doc('.modal');
const modalOverlay = _doc('.overlay');
const closeModal = _doc('.close-modal');
const app = _doc('body');

modalBtns.forEach(modalBtn => {
  modalBtn.addEventListener('click', () => {
    modalContainer.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
  });
});

closeModal.addEventListener('click', () => {
  modalContainer.classList.add('hidden');
  modalOverlay.classList.add('hidden');
});

modalOverlay.addEventListener('click', e => {
  if (
    !modalContainer.classList.contains('hidden') &&
    !modalOverlay.classList.contains('hidden')
  ) {
    modalContainer.classList.add('hidden');
    modalOverlay.classList.add('hidden');
  }
});
