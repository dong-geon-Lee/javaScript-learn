import View from './View.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message;

  addHandlerRender(handler) {
    console.log(handler);
    this._parentElement.addEventListener('hashchange', () => {
      handler();
    });
  }

  generateMarkup() {
    return this._data.map(this.generateMarkupResult).join('');
  }

  generateMarkupResult(result) {
    const { id, imageUrl, publisher, title } = result;

    return `
      <li class="preview">
        <a class="preview__link" href="#${id}">
          <figure class="preview__fig">
            <img src="${imageUrl}" alt="${title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${title}</h4>
            <p class="preview__publisher">${publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();

// preview__link preview__link--active
