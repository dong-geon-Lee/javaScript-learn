import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const target = e.target.closest('.btn--inline');
      const btnPage = +target.dataset.goto;
      this._data.page = btnPage;
      handler();
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const totalPage = Math.ceil(
      this._data.results.length / this._data.resultsPerpage
    );

    console.log(currentPage, totalPage);

    // 시나리오 1 : 첫번쨰 페이지에 있고 다른 페이지가 있다. (other page)
    if (currentPage === 1 && totalPage > 1) {
      console.log('other page');

      return `
        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // 시나리오 2 : 첫번쨰 페이지가 있고 다른 페이지는 없다. (last page)
    if (currentPage === 1 && currentPage === totalPage) {
      console.log('last page');
      return '';
    }

    // 시나리오 3 : 현재 페이지가 1페이지 보다 크지만 마지막 페이지 보단 작다. (middle page)
    if (currentPage > 1 && currentPage < totalPage) {
      console.log('middle page');

      return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>

        <button data-goto=${
          currentPage + 1
        } class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // 시나리오 4 : 현재 페이지가 1페이지 보다 크고 마지막 페이지와 같다. (end page)
    if (currentPage > 1 && currentPage === totalPage) {
      console.log('end page');

      return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
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
