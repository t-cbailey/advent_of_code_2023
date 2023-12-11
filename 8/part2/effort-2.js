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
  let results = [];

  let startPoints = map.filter((item) => item[0][2] === "A");

  //map over points ending with A
  startPoints.forEach((startPoint) => {
    let next = [];
    let count = 0;
    let steps = 0;
    let found = false;

    //loop through directions
    while (found === false) {
      for (let i = 0; i < map.length; i++) {
        if (count >= directions.length) {
          count = 0;
        }
        //ending clause
        if (startPoint[1][directions[count]][2] === "Z") {
          results.push(steps + 1);
          found = true;
          break;
        }
        if (map[i][0] === startPoint[1][directions[count]]) {
          next = map[i];
          count++;
          steps++;
          startPoint = next;
        }
      }
    }
  });

  console.log(results);

  const findLcm = (...arr) => {
    const gcd = (x, y) => (!y ? x : gcd(y, x % y));
    const _lcm = (x, y) => (x * y) / gcd(x, y);

    return [...arr].reduce((a, b) => _lcm(a, b));
  };

  return findLcm(...results);
}

console.log(BigInt(hauntedWasteland()));
