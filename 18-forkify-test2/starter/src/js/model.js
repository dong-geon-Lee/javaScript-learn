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
export const state = {
  recipe: {},
};

export const loadRecipe = async id => {
  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message}`);

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

    console.log(state.recipe);
  } catch (error) {
    console.error(error);
  }
};
