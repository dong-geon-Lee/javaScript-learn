import * as model from './model.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';

export const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

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
    resultsView.render(model.paginationResult());
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

export const paginationRecipes = async page => {
  console.log(page);
  try {
    resultsView.render(model.paginationResult(page));
    paginationView.render(model.state.search);
    console.log(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  recipeView.addHandlerRecipe(controlRecipes);
  searchView.addHandlerClick(searchRecipes);
  paginationView.addHandlerClick(paginationRecipes);
};

init();
