const modalBtnEl = document.querySelectorAll('.modal--btn');
const modalContainer = document.querySelector('.modal--container');
const overlays = document.querySelector('.overlay');
const closeModal = document.querySelector('.close--modal');
const modals = [...modalBtnEl];

const hiddenModals = () => {
  modalContainer.classList.add('hidden');
  overlays.classList.add('hidden');
};

modals.forEach(modal => {
  modal.addEventListener('click', () => {
    modalContainer.classList.remove('hidden');
    overlays.classList.remove('hidden');
  });
});

closeModal.addEventListener('click', hiddenModals);
overlays.addEventListener('click', hiddenModals);
