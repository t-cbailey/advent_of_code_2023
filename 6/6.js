const fs = require("fs");

function getInput() {
  const input = fs.readFileSync("./input.txt", "utf8");
  const formattedData = input.split("\n");
  return formattedData.map((item) => {
    item = item.split(":");
    item = [
      item[0],
      item[1]
        .split(" ")
        .filter((item) => item.length > 0)
        .map((str) => {
          return +str;
        }),
    ];
    return item;
  });
}

function waitForIt() {
  const input = getInput();
  const totalWins = [];

  for (let x = 0; x < input[0][1].length; x++) {
    const wins = [];
    const currTime = input[0][1][x];
    const currRecord = input[1][1][x];

    let modTime = currTime;

    for (let i = 0; i < currTime; i++) {
      const distanceTravelled = i * modTime;
      modTime--;
      if (distanceTravelled > currRecord) {
        wins.push(i);
      }
    }
    totalWins.push(wins.length);
  }

  return totalWins.reduce((a, b) => {
    return a * b;
  });
}

console.log(waitForIt());
