import { API_URL, KEY, RES_PER_PAGE } from './config';
import { getJSON, sendJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultperPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

const createStateRecipe = data => {
  const { recipe } = data.data;

  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipes = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    state.recipe = createStateRecipe(data);

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const searchRecipes = async query => {
  try {
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
      };
    });

    console.log(state.search.results);
  } catch (error) {
    throw error;
  }
};

export const searchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultperPage;
  const end = page * state.search.resultperPage;
  return state.search.results.slice(start, end);
};

export const servingRecipes = newServings => {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const addRecipe = async newRecipe => {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(ing => {
        const check = ing[0].startsWith('ingredient') && ing[1].trim() !== '';
        if (check) return ing;
      })
      .map(ing => {
        const inputCheck = ing[1].replaceAll(' ', '').split(',');
        console.log(inputCheck);
        if (inputCheck.length < 3) {
          throw new Error('input ingredient more! at least 3!');
        }

        const [quantity, unit, description] = ing[1].split(',');

        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
    };

    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createStateRecipe(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

export const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = () => {
  const storage = JSON.parse(localStorage.getItem('bookmarks'));
  if (storage) state.bookmarks = storage;
};

init();
