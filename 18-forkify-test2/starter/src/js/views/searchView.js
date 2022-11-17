class SearchView {
  _parentElement = document.querySelector('.search');
  _input = document.querySelector('.search__field');

  clearInput() {
    this._input.value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler(this._input.value);
      this.clearInput();
    });
  }
}

export default new SearchView();
