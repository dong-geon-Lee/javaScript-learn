import { API_URL, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';

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

export const loadRecipes = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };

    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }

    console.log(recipe);
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

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;
};

/** 여기서 고민 할 것 같지 않니?
 * 여기까지 하면서 토글을 생각할까?
 * 그러니까 추가와 제거 이 로직을 어떻게 구별해주느냐 ?
 * 이생각은 분명히 했을거다. 이 순간 state를 이용해서
 * 상태를 변경시키겠다는것도 인지 하고 있는 순간이니까
 * 하지만 어떻게? 라고 생각했을거다
 */
