import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = 'No search recipe results!';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      this._data.page = +btn.dataset.goto;
      handler(this._data.page);
    });
  }

  generateMarkup() {
    console.log(this._data);
    const currentPage = this._data.page;
    const totalPage = Math.ceil(
      this._data.results.length / this._data.resultPerpage
    );

    console.log(currentPage, totalPage);

    // 현재페이지 1, 전체페이지는 현재페이지보다 크다. (other page)
    if (currentPage === 1 && currentPage < totalPage) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // 현재 페이지 1, 전체페이지와 현재 페이지와 같다. (last page)
    if (currentPage === 1 && currentPage === totalPage) {
      return '';
    }

    // 현재 페이지가 1보다 크고 전체 페이지 보다 작다. (middle page)
    if (currentPage > 1 && currentPage < totalPage) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>

        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
    `;
    }

    // 현재 페이지가 1보다 크고 전체 페이지와 같다. (end page)
    if (currentPage > 1 && currentPage === totalPage) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
    `;
    }
  }
}

export default new PaginationView();
