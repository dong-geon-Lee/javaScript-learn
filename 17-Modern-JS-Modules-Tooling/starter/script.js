// import { cloneDeep } from 'lodash-es';
// import './shoppingCart.js';
// import { addToCart, job as jobs, taker as takers } from './shoppingCart.js';
// import * as ShoppingCart from './shoppingCart.js';

console.log('Importing module');
// addToCart('bread', 5);
// console.log(jobs);
// console.log(takers);

// 1. module을 사용한다는 것 === strict mode
// 2. export 함수, export 변수 내보내기 === import {...} frokm '...'
// 3. 이름 바꾸기 === 기존 as 변형(modify)
// 4. 모든 모듈 한 번에 가져오기 (네임스페이스) === import * as 명칭 from '... .js'
// 5. export default 쓸 떄 함수이름도 써라 === export default function 함수명
// 6. export와 import는 사본이 아니라 실시간 연결이다. === 같은 메모리 장소

// ShoppingCart.addToCart('bread', 5);
// ShoppingCart.addToCart('bread2', 6);
// ShoppingCart.addToCart('bread3', 7);

// export default function maxToCart(product, quantity) {
//   console.log(`${quantity} ${product} added to cart`);
// }

// console.log(ShoppingCart.cart);

// 1. 최상위 await를 쓰면 promise를 소비하여 원하는 인자를 얻어낼수 있다.(then 보다 더 간결하다)
console.log('Start fetching');
// // 전체 모듈의 실행을 차단한다. 최상위 await
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
console.log('Something');

const getLastPost = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();

  return { title: data.at(-1).title, text: data.at(-1).body };
};

// const lastPost = await getLastPost();
// console.log(lastPost);

// 274강 모듈 패턴
const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (sipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();

ShoppingCart2.addToCart('apple', 4);
ShoppingCart2.addToCart('pizza', 2);
console.log(ShoppingCart2);
console.log(ShoppingCart2.shippingCost);

// 275 comment js

// 266 comment js

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 2 },
  ],
  user: { loggedIn: true },
};

// const stateClone = Object.assign({}, state);
// const stateDeepClone = cloneDeep(state);

// state.user.loggedIn = false;
// console.log(stateClone);
// console.log(stateDeepClone);

const spendingLimits = {
  jonams: 1500,
  matilda: 100,
};
let user = 'name';
const limit = spendingLimits?.[user] ?? 0;
console.log(limit);
