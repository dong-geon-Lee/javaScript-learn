import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async query => {
  try {
    resultsView.renderSpinner();
    if (!query) return;
    await model.loadSearch(query);
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  recipeView.addHandlerRecipe(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
