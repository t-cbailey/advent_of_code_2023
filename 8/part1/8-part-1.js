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
      const split = item.match(/([A-Z]+)/g);
      return [split[0], [split[1], split[2]]];
    });

  return [directions, map];
}

function hauntedWasteland() {
  const [directions, map] = formatInput();
  let current = "AAA";
  let next = "";
  let count = 0;
  let steps = 0;

  while (current !== "ZZZ") {
    for (let i = 0; i < map.length; i++) {
      if (count >= directions.length) {
        count = 0;
      }
      if (current === "ZZZ") {
        return steps;
      }
      if (map[i][0] === current) {
        next = map[i][1][directions[count]];
        count++;
        steps++;
        current = next;
      }
    }
  }
  return steps;
}

console.log(hauntedWasteland());
