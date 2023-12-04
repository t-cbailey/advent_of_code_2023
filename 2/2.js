const fsPromises = require("fs").promises;

// Determine which games would have been possible if the bag had been loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs of those games?

async function formatInput() {
  const input = await fsPromises.readFile(
    "/Users/timbailey/coding/advent_of_code_2023/2/input.txt",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const dataArr = input.split("\n");
  return dataArr;
}

async function formatData() {
  const data = await formatInput();
  const games = [];
  data.forEach((game, i) => {
    game = game.split(":").slice(1);
    game = game[0].split(";").map((game) => {
      const blue = game.match(/[0-9]+(?= blue)/g);
      const red = game.match(/[0-9]+(?= red)/g);
      const green = game.match(/[0-9]+(?= green)/g);
      const turn = {
        red: +red || 0,
        blue: +blue || 0,
        green: +green || 0,
      };
      return turn;
    });
    games.push([i, game]);
  });
  return games;
}

async function possibleGaming() {
  const games = await formatData();
  let total = 0;

  for (let x = 0; x < games.length; x++) {
    let possible = true;
    for (let i = 0; i < games[x][1].length; i++) {
      if ((await isPossible(games[x][1][i])) === false) {
        possible = false;
        break;
      }
    }
    if (possible) {
      total += games[x][0] + 1;
    }
  }
  return total;
}

async function isPossible(turn) {
  const { red, blue, green } = turn;

  if (blue > 14 || red > 12 || green > 13) {
    return false;
  }
  return true;
}

async function sumOfPower() {
  const games = await formatData();
  const result = [];
  for (let x = 0; x < games.length; x++) {
    let min = { red: 0, blue: 0, green: 0 };

    for (let i = 0; i < games[x][1].length; i++) {
      let { red, green, blue } = games[x][1][i];

      if (min.red < red) {
        min.red = +red;
      }
      if (min.blue < blue) {
        min.blue = +blue;
      }
      if (min.green < green) {
        min.green = +green;
      }
    }
    const power = min.red * min.green * min.blue;
    result.push(power);
  }
  return result.reduce((a, b) => {
    return a + b;
  });
}

possibleGaming().then((res) => console.log(res));
sumOfPower().then((res) => console.log(res));
