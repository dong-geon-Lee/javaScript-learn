// todo [148강] - 코딩 챌린지 (1)
// 3년 이상은 성인, 3년 미만은 강아지
// checkDogs 라는 함수를 만드세요.
// 2개의 배열을 허용합니다.

let juliaTestData = [3, 5, 2, 12, 7];
let kateTestData = [4, 1, 15, 8, 3];

function checkDogs(data1, data2) {
  let modifyData1 = data1.slice();
  modifyData1.splice(0, 1);
  modifyData1.splice(-2);

  console.log(modifyData1);

  // spread 솔루션
  // const dogs = [...modifyData1, ...data2];
  const dogs = modifyData1.concat(data2);
  console.log(dogs);
  console.log(modifyData1);
  // for of 솔루션
  // for (let age of dogs) {
  //   if (age >= 3) {
  //     console.log('adult');
  //   } else {
  //     console.log('puppy');
  //   }
  // }

  dogs.forEach((dog, i) => {
    if (dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is an puppy🐆, and is ${dog} years old`);
    }
  });
}

checkDogs(juliaTestData, kateTestData);

// todo [154강] - 코딩 챌린지 (2)
//  1. 모든 개의 나이를 계산하세요
// 개의 나이가 2년 이하다. humanAge = 2 * dogAge
// 개의 나이가 2년 초과다. humanAge = 16 + dogAge * 4

// 2. 인간의 나이가 18세보다 작은 개들은 모두 제외 시킨다.
// 최소한 사람의 나이가 18세 이상이 되어야 한다.

// 3. 모든 성인 개의 평균 나이를 구한다.

const data = [5, 2, 4, 1, 15, 8, 3];
const data2 = [16, 6, 10, 5, 6, 1, 4];

const calcAverageHumanAge = data => {
  const dogAge = data
    .map(dogAge => (dogAge > 2 ? 16 + dogAge * 4 : 2 * dogAge))
    .filter(humanAge => humanAge >= 18);

  const average = dogAge.reduce(
    (acc, cur, _, arr) => acc + cur / arr.length,
    0
  );

  return average;
};

console.log(calcAverageHumanAge(data));

// todo [154강] - 코딩 챌린지 (3)
const calcAverageHumanAgeChain = data2 => {
  const modifyDogAge = data2
    .map(age => (age > 2 ? 16 + age * 4 : 2 * age))
    .filter(age => age >= 18)
    .reduce((acc, cur, _, arr) => Math.round(acc + cur / arr.length), 0);

  return modifyDogAge;
};

console.log(calcAverageHumanAgeChain(data2));

// ! 블로그 써야 되는 부분 9 / 28
// todo [167강] - 코딩 챌린지 (4)
const dogs = [
  { weight: 22, curFood: 250, owner: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owner: ['Matilda'] },
  { weight: 13, curFood: 275, owner: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owner: ['Michael'] },
];

// 1/8
dogs.forEach(dog => {
  dog.recFood = Math.round(dog.weight ** 0.75 * 28);
});
console.log(dogs);

// 솔루션 1
// dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));
// console.log(dogs);

// 2/8
const findSarahDog = dogs.find(dog => dog.owner.includes('Sarah'));
console.log(findSarahDog);

// 솔루션 2
const dogSarah = dogs.find(dog => dog.owner.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating too ${
    dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'
  }`
);

// 3/8
// const ownersEatTooMuch = dogs.filter(dog => dog.curFood > dog.recFood);
// console.log(ownersEatTooMuch);

// const ownersEatTooLittle = dogs.filter(dog => dog.curFood < dog.recFood);
// console.log(ownersEatTooLittle);

// 솔루션 3 ~ 4
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recFood)
  .flatMap(dog => dog.owner)
  .join(' and ');

console.log(`${ownersEatTooMuch}'s dogs eat too much!`);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recFood)
  .flatMap(dog => dog.owner)
  .join(' and ');

console.log(`${ownersEatTooLittle}'s dogs eat too little!`);

// 4/8
// const eatMuch = ownersEatTooMuch.flatMap(dogs => dogs.owner);
// console.log(`${eatMuch.join(' and ')}'s dogs eat too much!`);

// const eatLittle = ownersEatTooLittle.flatMap(dogs => dogs.owner);
// console.log(`${eatLittle.join(' and ')}'s dogs eat too little!`);

// 솔루션 4
// console.log(`${eatMuch.join(' and ')}'s dogs eat too much!`);
// console.log(`${eatLittle.join(' and ')}'s dogs eat too little!`);

// 5/8
// 솔루션 5
console.log(dogs.some(dog => dog.curFood === dog.recFood));

// 6/8
const recommends = dogs.some(dog =>
  dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9
    ? true
    : false
);
console.log(recommends);

// 솔루션 6
const checkEatingOkay = dog => {
  return dog.curFood < dog.recFood * 1.1 && dog.curFood > dog.recFood * 0.9;
};

console.log(dogs.some(checkEatingOkay));

// 7/8
// 솔루션 7
console.log(dogs.filter(checkEatingOkay));

// 8/8
// 솔루션 8
const dogsCopy = dogs.slice().sort((a, b) => a.recFood - b.recFood);
console.log(dogsCopy);
