class SearchView {
  _parentElement = document.querySelector('.search');
  _input = document.querySelector('.search__field');

  addHandlerSearch(hanlder) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      hanlder(this._input.value);
      this.clear();
    });
  }

  clear() {
    this._input.value = '';
  }
}

export default new SearchView();
