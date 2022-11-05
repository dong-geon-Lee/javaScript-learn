import * as model from './model.js';

const controlRecipes = async () => {
  await model.loadRecipe();
};

controlRecipes();
