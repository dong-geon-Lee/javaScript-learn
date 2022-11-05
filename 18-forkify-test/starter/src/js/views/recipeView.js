class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
    <img src="${this._data.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
</figure>
    `;
  }
}
