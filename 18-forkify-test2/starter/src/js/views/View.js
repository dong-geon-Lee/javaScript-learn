import icons from '../../img/icons.svg';

export default class View {
  _data;

  clear() {
    this._parentElement.innerHTML = '';
  }

  update(data) {
    this._data = data;
    const markup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markup);
    const newElement = [...newDOM.querySelectorAll('*')];
    const curElement = [...this._parentElement.querySelectorAll('*')];

    newElement.forEach((newEl, index) => {
      const curEl = curElement[index];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        [...newEl.attributes].forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this.generateMarkup();
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
        `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;

    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
