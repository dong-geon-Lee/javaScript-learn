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
team1 > team2 && console.log('Team 1 is more likely to win');
