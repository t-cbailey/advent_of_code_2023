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
        .join(""),
    ];
    return item;
  });
}

function waitForIt() {
  const input = getInput();

  const wins = [];
  const currTime = input[0][1];
  const currRecord = input[1][1];

  let modTime = currTime;

  for (let i = 0; i < currTime; i++) {
    const distanceTravelled = i * modTime;
    modTime--;
    if (distanceTravelled > currRecord) {
      wins.push(i);
    }
  }

  return wins.length;
}

console.log(waitForIt());
