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
const showRecipe = async ()=>{
    try {
        const response = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcb34");
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message}`);
        let { recipe  } = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredints: recipe.ingredients
        };
        console.log(recipe);
    } catch (error) {
        console.error(error);
    }
};
showRecipe(); /**
 * 1.fetch API로 데이터 가져오기
 * 2.async await & json() 사용하기
 * 3.try-catch문 사용하기
 * 4.throw new Error() 사용하기
 * 5.데이터 recipe의 key 이름 전부 바꾸기
 */ 

//# sourceMappingURL=index.62406edb.js.map
