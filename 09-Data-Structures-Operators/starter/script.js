'use strict';

// 104강
// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIndex, mainIndex) {
    console.log(this);
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1} ${ing2} ${ing3}`);
  },
};

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// 구조분해는 원래 배열을 변형하지 않는다.
// 배열의 요소에 접근한다.
const [x, y, z] = arr;
console.log(x, y, z);

// ! key에 접근 할 때는 문자열을 써줘야 된다!
// ! 다른 방법은 .(도트 연산자로 key와 연결해라)
// 불필요한 요소는 ,(쉼표)를 추가해서 건너 뛸 수 있다
// const [first, second] = restaurant['categories'];
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// ? 1.배열 요소의 위치를 바꾸는 방법
[main, secondary] = [secondary, main];
console.log(main, secondary);

// ? 2.이거 실제 앱에서도 쓸 수있는 트릭인데?
// 함수를 이용해서 배열 요소를 구조분해 할 때,
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// console.log(categories, starterMenu);
// Nested destructuring
// ? 3.유용한 트릭
const nested = [2, 4, [5, 6]];

// const [i, ,j] = nested;
// console.log(i,j)
const [i, , [j, k]] = nested;
console.log(i, j, k);

//  Default values
const [p, q, r] = [8, 9];
console.log(p, q, r);

const [a = 1, b = 1, c = 1] = [8, 9];
console.log(a, b, c);

// 104강 - 객체 구조분해
// ? 트릭 4 구조분해 및 이름 바꾸기
const { name: restaurantName, openingHours, categories } = restaurant;
console.log(restaurantName, openingHours, categories);

// restaruant에 존재하지 않는 key를 default value로 정의 할 수 있으며
// 이미 있는 starterMenu도 배열을 기본값으로 줄 수 있다.
// ? Default values 트릭 5
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
let s = 111;
let d = 999;
const obj = { s: 23, d: 7, n: 14 };
({ s, d } = obj);
console.log(s, d);
console.log(obj);

// Nested objects
const {
  fri: { open: ocn, close: ccn },
} = openingHours;
console.log(ocn, ccn);

// 105강 spread operator
const arrList = [7, 8, 9];
const newArr = [1, 2, ...arrList];
console.log(arrList);
console.log(newArr);
console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays
const menuList = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menuList);

// iterables  arrays, strings, maos, sets. NOT objects(객체는 아니다)
// ! 자주 잊어먹는다. 배열 뿐만 아니라 문자열도 spread 사용이 가능하다.
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// console.log(`${...str}`);

const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];

console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
