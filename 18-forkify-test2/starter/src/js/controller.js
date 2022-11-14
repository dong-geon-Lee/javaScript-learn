import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza
// id=5ed6604591c37cdc054bcd09
///////////////////////////////////////
console.log('시작점');

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
 * 3.recipe.ingredients 를 렌더링한다. 배열 데이터라서 map을 이용해서
 * 마크업을 하는데 map이 진행되면서 붙는 쉼표(,)를 제거하기 위해서 join()
 * 메서드를 사용해야 UI가 매끄럽게 보이게 된다.
 *
 * 4.더미마크업에 icons을 삽입하는데 parcel2 라이브러리는 리액트 처럼 리소스를
 * 가져오는 걸 허용하되 앞에 url: 을 붙여줘야 되는 규칙이 있다.
 * 지속적으로 더미데이터를 다루는게 중심이 되고있다.
 *
 * 5.renderSpinner 함수를 만든다. 준비된 더미 데이터가 있고 recipeContainer
 * 에 만들어서 삽입한다. spinner가 사라지는 트릭은 간단하다. innerHTML을 이용한것이다.
 * parentEl.innerHTML = ''; 은 관계없으며 recipeContainer.innerHTML = ''; 이
 * 원인이 된다. 이런 트릭을 쓰지않으면 스피너 애니메이션은 계속 돌고 있는거 맞다! 인피니티니까!
 *
 * 6.core-js, regenerate는 async-await 와 그 밖에 다른 것들을 폴리필하기 위해서
 * 사용한다고 하는데 무슨 말인지 모르겠다. 별로 안중요할 가능성이 높다!
 *
 * todo
 * 1) 첫 시작을 API를 요청한 후, 준비된 HTML 마크업을 이용해서
 * 데이터를 렌더링 하는 것으로 시작되었다. 더미데이터를 이용한 HTML 마크업은
 * 이미 준비되었기 떄문에 동적 데이터를 활용하기 좋다!
 * 2) API url이 단일데이터 렌더링 사용된 이유는 준비된 더미마크업이
 * 1개의 데이터 전용으로 만들어졌기 떄문이다.
 *
 * ? 290강
 * 1. a태그에서 href에 id를 넣는다. (search-results의 ul태그 아래에 url hash를 추가)
 * 2. a태그 클릭 시, 데이터를 동적으로 받아오기 위해서 이벤트를 추가한다.
 * ->  window.addEventListener('hashchange', showRecipe);
 * ->  id = window.location.hash.slice(1); API에 url에 id 넣기.
 * window.location.hash은 href 값을 가져온다.
 * a태그 요소를 클릭해서 url이 변경되면 hashchange 발생으로 showRecipe함수 호출됨.
 * 3. window.addEventListener('load', showRecipe); 주로 새로 탭을 열 떄, 앱 화면이
 * 아무것도 뜨지 않는 경우를 대비하려고 load 이벤트를 추가하는 코드가 설명되었는데, 이 코드가 없어도
 * 새탭에서 앱 화면이 잘나오고 있다. 무시해도 상관없다고 판단됨.
 * 4. id가 없으면 앱을 보호하기 위해서 guard문을 사용한다 !id -> return;
 */

const renderSpinner = parentEl => {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;

  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', markup);
};

const showRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    //  1) Loading recipe
    renderSpinner(recipeContainer);

    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();
    if (!response.ok) throw new Error(`${data.message}`);
    let { recipe } = data.data;

    console.log(recipe);

    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
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
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${recipe.ingredients
          .map(ing => {
            return `
          <li class="recipe__ingredient">
            <svg class="recipe__icon">
              <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
          `;
          })
          .join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
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

    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (error) {
    console.error(error);
  }
};

showRecipe();

window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// ['hashchange','load'].forEach(ev=> window.addEventListener(ev,showRecipe));
