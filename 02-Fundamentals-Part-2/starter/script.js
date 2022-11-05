// let hasDriversLicense = false;
// const passTest = true;

// if (passTest) hasDriversLicense = true;
// if (hasDriversLicense) console.log("I can drive :D");

// // const interface = 'Audio';
// // const private = 534;

// function logger() {
//   console.log("My name is Jonas");
// }

// logger();

// function fruitProcessor(apples, oranges) {
//   const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
//   return juice;
// }

// const appleJuice = fruitProcessor(5, 0);
// console.log(appleJuice);

// const appleOrangeJuice = fruitProcessor(2, 4);
// console.log(appleOrangeJuice);

// const num = Number("23");

// // Function declaration
// function calcAge1(birthYeah) {
//   return 2037 - birthYeah;
// }
// const age1 = calcAge1(1991);

// // Function expression
// const calcAge2 = function (birthYeah) {
//   return 2037 - birthYeah;
// };
// const age2 = calcAge2(1991);

// console.log(age1, age2);

// const calcAge3 = (birthYeah) => 2037 - birthYeah;
// const age3 = calcAge3(1991);
// console.log(age3);

// // const yearsUntilRetirement = (birthYeah, firstName) => {
// //   const age = 2037 - birthYeah;
// //   const retirement = 65 - age;
// //   // return retirement;
// //   return `${firstName} retires in ${retirement} years`;
// // };

// function cutFruitPieces(fruit) {
//   return fruit * 4;
// }

// function fruitProcessor(apples, oranges) {
//   const applePieces = cutFruitPieces(apples);
//   const orangePieces = cutFruitPieces(oranges);

//   const juice = `Juice with ${applePieces} piece of apple and ${orangePieces} pieces of orange.`;
//   return juice;
// }
// console.log(fruitProcessor(2, 3));

// const calcAge = function (birthYeah) {
//   return 2037 - birthYeah;
// };

// const calcAverage = (a, b, c) => (a + b + c) / 3;
// console.log(calcAverage(3, 4, 5));

// // Test 1
// let scoreDolphins = calcAverage(44, 23, 71);
// let scoreKoalas = calcAverage(65, 54, 49);
// console.log(scoreDolphins, scoreKoalas);

// const checkWinner = function (avgDolphins, avgKoalas) {
//   if (avgDolphins >= 2 * avgKoalas) {
//     console.log(`Dolphins win 🏆 (${avgDolphins} vs. ${avgKoalas})`);
//   } else if (avgKoalas >= 2 * avgDolphins) {
//     console.log(`Koalas win 🏆 (${avgKoalas} vs. ${avgDolphins})`);
//   } else {
//     console.log("No team wins...");
//   }
// };
// checkWinner(scoreDolphins, scoreKoalas);

// checkWinner(576, 111);

// // Test 2
// scoreDolphins = calcAverage(85, 54, 41);
// scoreKoalas = calcAverage(23, 34, 27);
// console.log(scoreDolphins, scoreKoalas);
// checkWinner(scoreDolphins, scoreKoalas);

// // Introduction to Arrays
// const friend1 = "Michael";
// const friend2 = "Steven";
// const friend3 = "Peter";

// // Basic Array Operations (Methods)
// const friends = ["Michael", "Steven", "Peter"];

// // Add elements
// const newLength = friends.push("Jay");
// console.log(friends);
// console.log(newLength);

// friends.unshift("John");
// console.log(friends);

// friends.pop(); // Last
// const popped = friends.pop();
// console.log(popped);
// console.log(friends);

// friends.shift(); // First
// console.log(friends);

// console.log(friends.indexOf("Steven"));
// console.log(friends.indexOf("Bob"));

// friends.push(23);
// console.log(friends.includes("Steven"));
// console.log(friends.includes("Bob"));
// console.log(friends.includes(23));

// if (friends.includes("Steven")) {
//   console.log("You have a friend called Steven");
// }

// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// };
// // const calcTip = bill => bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;

// const bills = [125, 555, 44];
// const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
// const totals = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];

// console.log(bills, tips, totals);

// // const jonas = {
// //   firstName: "Jonas",
// //   lastName: "Schmedtmann",
// //   birthYeah: 1991,
// //   job: "teacher",
// //   friends: ["Michael", "Peter", "Steven"],
// //   hasDriversLicense: true,

// //   // calcAge: function (birthYeah) {
// //   //   return 2037 - birthYeah;
// //   // }

// //   // calcAge: function () {
// //   //   // console.log(this);
// //   //   return 2037 - this.birthYeah;
// //   // }

// //   calcAge() {
// //     this.age = 2037 - this.birthYeah;
// //     return this.age;
// //   },

// //   getSummary() {
// //     return `${this.firstName} is a ${this.calcAge()}-year old ${
// //       jonas.job
// //     }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
// //   },
// // };

// // console.log(jonas.calcAge());

// // console.log(jonas.age);
// // console.log(jonas.age);
// // console.log(jonas.age);

// const mark = {
//   fullName: "Mark Miller",
//   mass: 78,
//   height: 1.69,
//   calcBMI() {
//     this.bmi = this.mass / this.height ** 2;
//     return this.bmi;
//   },
// };

// const john = {
//   fullName: "John Smith",
//   mass: 92,
//   height: 1.95,
//   calcBMI() {
//     this.bmi = this.mass / this.height ** 2;
//     return this.bmi;
//   },
// };

// mark.calcBMI();
// john.calcBMI();

// console.log(Math.trunc(mark.bmi), Math.floor(john.bmi));

// if (mark.bmi > john.bmi) {
//   console.log(
//     `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s BMI (${john.bmi})`
//   );
// } else if (john.bmi > mark.bmi) {
//   console.log(
//     `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s BMI (${mark.bmi})`
//   );
// }

// // for (let i = 1; i <= 30; i++) {
// //   console.log(`Lifting weights ietition ${i} 🏋️‍♀️`);
// // }

// const jonas = [
//   "Jonas",
//   "Schmedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
//   true,
// ];

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
// }

// let rep = 1;
// while (rep <= 10) {
//   // console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
//   rep++;
// }

// const calcTip = function (bill) {
//   return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
// };

// const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
// const tips = [];
// const totals = [];

// for (let i = 0; i < bills.length; i++) {
//   const tip = calcTip(bills[i]);
//   tips.push(tip);
//   totals.push(tip + bills[i]);
// }

// console.log(bills, tips, totals);

// const calcAverage = function (arr) {
//   let sum = 0;
//   for (let i = 0; i < arr.length; i++) {
//     // sum = sum + arr[i];
//     sum += arr[i];
//   }
//   return sum / arr.length;
// };

// console.log(calcAverage([2, 3, 7]));
let arr = ["a", "b", "c"];
let arr2 = ["d", "e", "f"];

const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'f']
console.log(arr);
console.log([...arr, ...arr2]); // ['a', 'b', 'c', 'd', 'e', 'f']

console.log(arr.join(" "));
console.log(arr.shift());
console.log(arr);
console.log(arr2.slice(-1));

let movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const balance = movements.reduce((acc, cur, i, arr) => {
  console.log(cur);
  return acc + cur;
}, 0);

console.log(balance); // 3840

//  0 0 200 200
//  1 200 450 650
//  2 650 -400 250
//  3 250 3000 3250
//  4 3250 -650 2600
//  5 2600 -130 2470
//  6 2470 70 2540
//  7 2540 1300 3840

let movemented = [200, 450, -400, 3000, -650, -130, 70, 1300];

const max = movemented.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movemented[0]
);

console.log(max);

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

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

console.log(accounts);

const overalBalance = accounts
  .flatMap((account) => account.movements)
  .reduce((acc, cur) => acc + cur, 0);

console.log(overalBalance);

const owners = ["Jonas", "Zach", "Adam", "Martha"];
console.log(owners.sort()); // ['Adam', 'Jonas', 'Martha', 'Zach']

const x = new Array(7);
console.log(x); // [empty * 7]
x.fill(1);
console.log(x); // [4,4,4,4,4,4,4]

x.pop();
console.log(x);

const z = Array.from({ length: 7 }, (_, i) => {
  console.log(owners, i);
});

console.log(z); // [1, 2, 3, 4, 5, 6, 7]

console.log(Array.from("dog")); // ['d', 'o', 'g']
console.log(Array.from("3910")); // ['3', '9', '1', '0']

const one = Array.from({ length: 100 }, (_, i) =>
  Math.round(Math.random(i + 1) * 100)
);

console.log(one); // [63, 3, 100, ... 9, 1]

const convertTitleCase = (title) => {
  const capitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const exceptions = ["a", "an", "the", "is"];
  const titleCase = title
    .toLowerCase()
    .split(" ")
    .map((word) => (exceptions.includes(word) ? word : capitalize(word)))
    .join(" ");

  return titleCase;
};

console.log(convertTitleCase("this is a NICE title"));
