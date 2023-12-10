const fs = require("fs");
require("dotenv").config();

function formatInput() {
  const input = fs.readFileSync(
    `${process.env.FILE_PATH}8/testData.txt`,
    "utf8"
  );
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
formatInput();
