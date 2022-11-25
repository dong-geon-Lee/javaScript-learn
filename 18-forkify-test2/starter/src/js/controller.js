import * as model from './model.js';
import addRecipeView from './views/addRecipeView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    await model.loadRecipes(id);
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (error) {
    console.warn(error);
    recipeView.renderError();
  }
};

const controlSearch = async query => {
  try {
    resultsView.renderSpinner();

    if (!query) return;
    await model.searchRecipes(query);

    model.state.search.page = 1;
    resultsView.render(model.searchResultsPage());
    paginationView.render(model.state.search);
  } catch (error) {
    console.warn(error);
  }
};

const controlPagination = page => {
  resultsView.render(model.searchResultsPage(page));
  paginationView.render(model.state.search);
};

const controlServings = servings => {
  model.servingRecipes(servings);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlResults = () => {
  resultsView.update(model.searchResultsPage());
};

const controlAddRecipe = async newRecipe => {
  try {
    addRecipeView.renderSpinner();
    await model.addRecipe(newRecipe);

    addRecipeView.renderMessage();
    recipeView.render(model.state.recipe);
    resultsView.update(model.searchResultsPage());
    bookmarksView.render(model.state.bookmarks);

    setTimeout(() => {
      addRecipeView.changedModal();
    }, 2000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerClick(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearch);
  paginationView.addHandlerPagination(controlPagination);
  resultsView.addhandlerResultActive(controlResults);
  addRecipeView.addHandlerForm(controlAddRecipe);
};

init();
