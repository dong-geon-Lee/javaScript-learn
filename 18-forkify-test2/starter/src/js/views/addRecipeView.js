import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'add Data Success!';

  constructor() {
    super();
    this.modalOpen();
    this.modalClose();
  }

  addHandlerForm(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      const formData = [...new FormData(this._parentElement)];
      const newRecipe = Object.fromEntries(formData);
      handler(newRecipe);
    });
  }

  modalOpen() {
    this._btnOpen.addEventListener('click', this.changedModal.bind(this));
  }

  modalClose() {
    this._btnClose.addEventListener('click', this.changedModal.bind(this));
    this._overlay.addEventListener('click', this.changedModal.bind(this));
  }

  changedModal() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
}

export default new AddRecipeView();
