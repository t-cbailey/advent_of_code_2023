const fs = require("fs");
require("dotenv").config();

function formatInput() {
  const input = fs.readFileSync(`${process.env.FILE_PATH}8/input.txt`, "utf8");
  const formattedInput = input.split("\n");
  const directions = formattedInput
    .splice(0, 1)[0]
    .replaceAll("R", 1)
    .replaceAll("L", 0)
    .split("");
  const map = formattedInput
    .filter((item) => item.length > 0)
    .map((item) => {
      const split = item.match(/([A-Z0-9]+)/g);
      return [split[0], [split[1], split[2]]];
    });

  return [directions, map];
}

function hauntedWasteland() {
  const [directions, map] = formatInput();
  const sortedMap = map.sort((a, b) => {
    if (a[0][2] > b[0][2]) {
      return 1;
    }
    if (a[0][2] < b[0][2]) {
      return -1;
    }
    return 0;
  });

  const lookup = { A: 0 };

  for (let i = 0; i < sortedMap.length; i++) {
    const target = sortedMap[i][0][2];
    if (target !== "A" && !lookup[target]) {
      lookup[target] = i;
    }
  }

  let current = sortedMap.filter((item) => item[0][2] === "A");
  let count = 0;
  let steps = 0;
  let log = 0;

  while (current !== "ZZZ") {
    if (steps === log + 1000000) {
      log = steps;
      console.log(log);
    }
    if (count >= directions.length) {
      count = 0;
    }
    const totalZ = current.filter(
      (item) => item[1][directions[count]][2] === "Z"
    ).length;
    if (current.length === totalZ) {
      return steps + 1;
    }

    current = current.map((item) => {
      const target = lookup[item[1][directions[count]][2]];
      for (let x = target; x < sortedMap.length; x++) {
        if (item[1][directions[count]] === sortedMap[x][0]) {
          return sortedMap[x];
        }
      }
    });
    count++;
    steps++;
  }
}

console.log(hauntedWasteland());
