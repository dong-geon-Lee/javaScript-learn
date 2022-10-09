// ! 코딩 챌린지 #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

console.log(game);
// Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

// 1. Create one player array for each team (variables 'players1' and 'players2')

// ! 내 솔루션
// let player = game.players;
// console.log(player);

// const players1 = [...player[0]];
// console.log(players1);

// const players2 = [...player[1]];
// console.log(players2);

const [players1, players2] = game.players;
console.log(players1, players2);

// 2. The first player in any player array is the goalkeeper and the others are field players.
// For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
// and one array ('fieldPlayers') with all the remaining 10 field players

// ! 내 솔루션
// const [goalKeeper, ...fieldPlayers] = players1;
// const gk = goalKeeper;
// console.log(gk);
// console.log(goalKeeper, fieldPlayers);

const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

// 3. Create an array 'allPlayers' containing all players of both teams (22 players)

// ! 내 솔루션
// const allPlayers = [...players1, ...players2];
// console.log(allPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// 4. During the game, Bayern Munich (team 1) used 3 substitute players.
// So create a new array ('players1Final') containing all
// the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'

// ! 내 솔루션
// let players1Final = ['Thiago', 'Coutinho', 'Perisic'];
// game.players[0] = [...game.players[0], ...players1Final];
// console.log(game.players[0]);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

// 5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')

// ! 내 솔루션
// const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);

const {
  odds: { team1, x: draw, team2 },
} = game;

console.log(team1, draw, team2);

// 6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and
// prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
// TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

// ! 내솔루션
// function printGoals() {}
// printGoals()

function printGoals(...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
}

// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals(...game.scored);

// 7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win,
// WITHOUT using an if/else statement or the ternary operator.

// ! 내솔루션
// console.log(game.odds);
// const { team1: teams1, team2: teams2 } = game.odds;
// console.log(teams1 > teams2 ? teams1 : teams2);

team1 < team2 && console.log('Team 2 is more likely to win');

console.log(team1 > team2 && console.log('Team 1 is more likely to win'));

// -----------------------------------------------------------------------------------------------------------------------------------------------
// ! 115강 - 코딩 챌린지 #2
// Let's continue with our football betting app!

// todo 1. Loop over the game.scored array and print each player name to the console,
// along with the goal number (Example: "Goal 1: Lewandowski")

// ! 내솔루션
console.log(game.scored);

for (const element of game.scored.entries()) {
  // console.log(`Goal ${index + 1}: ${element}`);
  console.log(element);
}

// todo 2. Use a loop to calculate the average odd and log it to the console
// (We already studied how to calculate averages, you can go check if you don't remember)

console.log(game.odds);

const odds = Object.values(game.odds);
console.log(odds);

let average = 0;

for (const odd of odds) {
  average += odd;
}

average /= odds.length;
// console.log(Number(average.toFixed(2)));
console.log(average);

// todo 3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
//       Odd of victory Bayern Munich: 1.33
//       Odd of draw: 3.25
//       Odd of victory Borrussia Dortmund: 6.5
// Get the team names directly from the game object, don't hardcode them (except for "draw").
//  HINT: Note how the odds and the game objects have the same property names 😉

// ! 내솔루션
console.log(game);

for (const [i, el] of Object.entries(game.odds)) {
  const key = i === 'x' ? 'draw' : `victory ${game[i]}`;

  console.log(`Odd of ${key}: ${el}`);
}

// BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties,
//  and the number of goals as the value. In this game, it will look like this:
//       {
//         Gnarby: 1,
//         Hummels: 1,
//         Lewandowski: 2
//       }

console.log(game.scored);
const obj = Object.entries(game.scored);
const obj2 = game.scored;
const newObj = {};
console.log(obj);
console.log(obj2);
for (let [i, el] of obj) {
  i = 0;
  console.log(i, el);
  for (let x of obj2) {
    console.log(x);
    if (x === el) {
      i++;
      newObj[el] = i;
    }
  }
}

console.log(newObj);

// GOOD LUCK 😀

// -----------------------------------------------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------------------------------
// ! 120강 - 코딩 챌린지 #3
// 0. data
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

// 1. Create an array 'events' of the different game events that happened (no duplicates)
// ! 내 솔루션
const events = [...gameEvents];

let list = [];
for (const [_, el] of events) {
  list.push(el);
}

console.log(new Set(list));

// ? 강의 솔루션
console.log(gameEvents.values());
const evented = [...new Set(gameEvents.values())];
console.log(evented);

// 2. After the game has finished, is was found that the yellow card from minute 64 was unfair.
// So remove this event from the game events log.
console.log(gameEvents.delete(64));
console.log(gameEvents.has(64));

// 3. Print the following string to the console: "An event happened, on average, every 9 minutes"
// (keep in mind that a game has 90 minutes)
// ! 내 솔루션
console.log(gameEvents.keys());
const numberList = [...gameEvents.keys()];
console.log(numberList);

let totalAverage = 0;
for (let x of numberList) {
  console.log(x);
  totalAverage += x;
}

console.log((totalAverage /= numberList.length));

// ? 강의 솔루션
console.log(gameEvents.size);
const time = [...gameEvents.keys()].pop();
// console.log(time.at(-1));

console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

// 4. Loop over the events and log them to the console, marking whether it's in the first half or
// second half (after 45 min) of the game, like this: [FIRST HALF] 17: ⚽️ GOAL
// ! 내 솔루션
console.log(events);
for (let [key, value] of events) {
  if (value === '⚽️ GOAL') {
    key < 45
      ? console.log(`[FIRST HALF] ${key}: ${value}`)
      : console.log(`[SECOND HALF] ${key}: ${value}`);
  }
}

// ? 강의 솔루션
console.log(gameEvents);
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? `FIRST` : `SECOND`;

  console.log(`[${half} HALF ${min}: ${event}]`);
}

/* 
Let's continue with our football betting app! 
This time, we have a map with a log of the events that happened during the game.
The values are the events themselves, and the keys are the minutes in which each event happened
(a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

// -----------------------------------------------------------------------------------------------------------------------------------------------

// ! 124강 - 코딩 챌린지 #4
// -----------------------------------------------------------------------------------------------------------------------------------------------
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  const text = document.querySelector('textarea').value;

  const rows = text.split('\n');
  console.log(rows);

  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');

    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;

    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

// ! 내 솔루션
let data = [
  'underscore_case',
  ' first_name',
  'Some_Variable ',
  '  calculate_AGE',
  'delayed_departure',
];

for (const [i, word] of data.entries()) {
  const [firstWord, lastWord] = word.toLowerCase().trim().split('_');
  const joinLastWord = lastWord.replace(lastWord[0], lastWord[0].toUpperCase());
  const formattedWord = firstWord + joinLastWord;

  console.log(`${formattedWord.padEnd(20)}${'✅'.repeat(i + 1)}`);
}

// underscoreCase      ✅
// firstName           ✅✅
// someVariable        ✅✅✅
// calculateAge        ✅✅✅✅
// delayedDeparture    ✅✅✅✅✅

// -----------------------------------------------------------------------------------------------------------------------------------------------

// String Methods Practice
// ! 내 솔루션
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// const flight = flights.toLowerCase().split('+');

// for (const list of flight) {
//   const formattedList = list
//     .replaceAll('_', ' ')
//     .replaceAll(':', 'h')
//     .trim()
//     .split(';');

//   const statusText = formattedList[0];
//   const departures = [...formattedList[1]];
//   const arrivals = [...formattedList[2]];
//   const time = formattedList[3];

//   const destination = `from ${departures
//     .slice(0, 3)
//     .join('')
//     .toUpperCase()} to ${arrivals.slice(0, 3).join('').toUpperCase()}`;

//   const conditions = statusText.startsWith('delayed')
//     ? `🔴 ${statusText} ${destination} (${time})`
//     : `${statusText} ${destination} (${time})`;

//   const results = conditions
//     .replaceAll('de', 'De')
//     .replaceAll('arr', 'Arr')
//     .padStart(44);

//   console.log(results);
// }

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

// ? 강의 솔루션
const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);

  console.log(output);
}
