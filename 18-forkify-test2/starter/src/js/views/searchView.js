class SearchView {
  _parentElement = document.querySelector('.search');
  _input = document.querySelector('.search__field');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      handler(this._input.value);
    });
  }

  clear() {
    this._input.value = '';
  }
}

export default new SearchView();
