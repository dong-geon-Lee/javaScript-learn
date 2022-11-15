/**
 *
 * ? 292강 MVC모델은 HTTP Library 로직이 포함된다고 했으니 말이 된다!
 * statet 상수에서 recipe 객체를 만들었기 떄문에 let {recipe} 에서
 * const {recipe} = data.data. 형태로 데이터를 받는 것이 가능해진다.
 * const는 재할당이 엄격하게 금지되어 있는데 이는 원시값에만 해당되는 사실이고
 * 객체는 원시값이 아니라 참조값이기 떄문에 가능한것이다. 이렇게 바꿔준 뒤에
 */
export const state = {
  recipe: {},
};

// 최초로 시작되는 model 함수 (1)
export const loadRecipe = async id => {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );

  const data = await response.json();
  if (!response.ok) throw new Error(`${data.message}`);
  const { recipe } = data.data;

  console.log(recipe);

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
};
