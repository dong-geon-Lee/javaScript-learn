import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

export const controlRecipes = async () => {
  try {
    recipeView.renderSpinner();

    const id = window.location.hash.slice(1);
    await model.loadRecipes(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

export const searchRecipes = async query => {
  try {
    if (!query) return;
    resultsView.renderSpinner();

    await model.loadSearchRecipes(query);
    resultsView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  recipeView.addHandlerRecipe(controlRecipes);
  searchView.addHandlerClick(searchRecipes);
};

init();
