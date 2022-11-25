import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message;

  addHandlerPagination(hanlder) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const changedpage = +btn.dataset.page;
      hanlder(changedpage);
    });
  }

  generateMarkup() {
    const currentPage = this._data.page;
    const totalPage = Math.ceil(
      this._data.results.length / this._data.resultperPage
    );

    // others page
    if (currentPage === 1 && currentPage < totalPage) {
      return `
        <button data-page="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // last page
    if (currentPage === 1 && currentPage === totalPage) {
      return '';
    }

    // middle page
    if (currentPage > 1 && currentPage < totalPage) {
      return `
        <button data-page="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-page="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // end page
    if (currentPage > 1 && currentPage === totalPage) {
      return `
        <button data-page="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    return '';
  }
}

export default new PaginationView();
