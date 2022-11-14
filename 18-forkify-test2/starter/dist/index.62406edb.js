const recipeContainer = document.querySelector(".recipe");
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
// id=5ed6604591c37cdc054bcd09
///////////////////////////////////////
console.log("시작점");
/**
 * ? 288강
 * 1.fetch API로 데이터 가져오기
 * 2.async await & json() 사용하기
 * 3.try-catch문 사용하기
 * 4.throw new Error() 사용하기
 * 5.데이터 recipe의 key 이름 전부 바꾸기
 *
 * todo
 * 1) Error 객체의 key가 stack, message가 있다는 것을 확인했다.
 * console.dir을 사용하면 확인 할 수 있다.
 *
 * todo
 * 2) response.ok를 사용해서 throw new Error()를 사용해서 에러를
 * 발견하면 try-catch문에서 에러를 감지해서 catch문에 전달된다.
 *
 * ? 289강
 * 1.index.html 에서 162~254라인의 주석처리된 코드를 복사해서
 * const markup 에 할당한다. 그리고 값을 채운다.
 * 즉 API에서 가져온 데이터를 html에 군데군데 넣어준다.
 *
 * 2.recipeContainer 에 insertAdjacentHTML() 메서드를 이용해서
 * 더미데이터를 .recipe에 추가한다. 데이터가 멋지게 렌더링 된다!
 *
 * todo
 * 1) 첫 시작을 API를 요청한 후, 준비된 HTML 마크업을 이용해서
 * 데이터를 렌더링 하는 것으로 시작되었다. 더미데이터를 이용한 HTML 마크업은
 * 이미 준비되었기 떄문에 동적 데이터를 활용하기 좋다!
 * 2) API url이 단일데이터 렌더링 사용된 이유는 준비된 더미마크업이
 * 1개의 데이터 전용으로 만들어졌기 떄문이다.
 */ const showRecipe = async ()=>{
    try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09");
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message}`);
        let { recipe  } = data.data;
        console.log(recipe);
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        };
        console.log(recipe);
        // 2) Rendering recipe
        const markup = `
        <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="src/img/icons.svg#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="src/img/icons.svg#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="src/img/icons.svg#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients.map((ing)=>{
            return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="src/img/icons.svg#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
          `;
        }).join("")}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="src/img/icons.svg#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
        recipeContainer.innerHTML = "";
        recipeContainer.insertAdjacentHTML("afterbegin", markup);
    } catch (error) {
        console.error(error);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
