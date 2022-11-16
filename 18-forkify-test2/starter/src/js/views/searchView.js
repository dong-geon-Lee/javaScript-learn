class SearchView {
  #parentEl = document.querySelector('.search');
  #inputEl = document.querySelector('.search__field');

  getQuery() {
    const query = this.#inputEl.value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
