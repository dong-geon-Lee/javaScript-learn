import * as model from './model.js';
import recipeView from './views/recipeView.js';

const controlRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);

    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

controlRecipe();

window.addEventListener('hashchange', controlRecipe);
