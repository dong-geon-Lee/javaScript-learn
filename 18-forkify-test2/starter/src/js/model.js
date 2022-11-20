import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

/**
 * ? 291강 ~ 292강 MVC 아키텍처
 * !12분 까지 배운점은 Controller에 집중되어 있는 데이터를
 * Model로 옮겨서 loadRecipe() 메서드를 만든것이다.
 * 정확히 HTTP Library 부분을 컨트롤러에서 모델로 옮겼다.
 * recipe 재할당 let -> const { recipe } = data -> state.recipe = {...}
 * 컨트롤러에 와서 import * as model './model.js' -> model.js에 있는 모든 것은
 * model 키워드로 시작한다는 의미로 진행해서 컨트롤러에 아래처럼 메서드를 수신시킨다.
 * 컨트롤러에서 코드를 분리해서 모델로 HTTP Library부분을 옮겨주었고 뷰 부분을 클래스로
 * 작성하는 것을 시작한다.
 * Controller(model.loadRecipe) -> model(loadRecipe) -> view(RecipeView)
 */

//  298강
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

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

export const loadSearchResults = async query => {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

    console.log(state.search.results);
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

// 298강
export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = newServings => {
  console.log(newServings, 'in');
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    // newQt = oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });

  state.recipe.servings = newServings;
  console.log(state.recipe.servings);
};

export const addBookmark = recipe => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = id => {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
};
