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
 * 1.Error 객체의 key가 stack, message가 있다는 것을 확인했다.
 * console.dir을 사용하면 확인 할 수 있다.
 *
 * 2.response.ok를 사용해서 throw new Error()를 사용해서 에러를
 * 발견하면 try-catch문에서 에러를 감지해서 catch문에 전달된다.
 *
 */ const showRecipe = async ()=>{
    try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcd09");
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message}`);
        let { recipe  } = data.data;
        console.log(recipe);
        recipe = {
            id: recipe.id,
            cookingTime: recipe.cooking_time,
            imageUrl: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title
        };
        console.log(recipe);
    } catch (error) {
        console.error(error);
    }
};
showRecipe();

//# sourceMappingURL=index.62406edb.js.map
