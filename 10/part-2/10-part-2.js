const { count } = require("console");
const fs = require("fs");
require("dotenv").config();

function formatInput(dataType) {
  const input = fs.readFileSync(
    `${process.env.FILE_PATH}10/${dataType}.txt`,
    "utf8"
  );
  const formattedInput = input.split("\n").map((line) => {
    return line.split("");
  });
  return formattedInput;
}

function pipeMaze(dataType) {
  const input = formatInput(dataType);

  let startIndex = [];

  for (let i = 0; i < input.length; i++) {
    const s = input[i].indexOf("S");
    if (s !== -1) {
      startIndex = [i, s];
    }
  }
  let current = startIndex;
  let previous = [];
  let next = [];
  let steps = 0;

  const c = current;
  const indeces = [
    [c[0], c[1] + 1],
    [c[0], c[1] - 1],
    [c[0] - 1, c[1]],
    [c[0] + 1, c[1]],
  ];

  while (next[0] !== startIndex[0] || next[1] !== startIndex[1]) {
    if (current === startIndex) {
      if (
        input[c[0]] &&
        input[c[1] + 1] &&
        "7J-".includes(input[indeces[0][0]][indeces[0][1]])
      ) {
        next = indeces[0];
      } else if (
        input[c[0]] &&
        input[c[1] - 1] &&
        "FL-".includes(input[indeces[1][0]][indeces[1][1]])
      ) {
        next = indeces[1];
      } else if (
        input[c[0] - 1] &&
        input[c[1]] &&
        "FL|J7".includes(input[indeces[2][0]][indeces[2][1]])
      ) {
        next = indeces[2];
      } else if (
        input[c[0] + 1] &&
        input[c[1]] &&
        "FL|J7".includes(input[indeces[3][0]][indeces[3][1]])
      ) {
        next = indeces[3];
      }
      steps++;
    }

    previous = current;
    current = next;
    const currentLetter = input[next[0]][next[1]];
    switch (currentLetter) {
      case "-":
        if (current[0] === previous[0] && current[1] + 1 === previous[1]) {
          next = [current[0], current[1] - 1];
        } else next = [current[0], current[1] + 1];
        break;

      case "L":
        if (current[0] - 1 === previous[0] && current[1] === previous[1]) {
          next = [current[0], current[1] + 1];
        } else next = [current[0] - 1, current[1]];
        break;
      case "J":
        if (current[0] === previous[0] && current[1] - 1 === previous[1]) {
          next = [current[0] - 1, current[1]];
        } else next = [current[0], current[1] - 1];
        break;
      case "7":
        if (current[0] === previous[0] && current[1] - 1 === previous[1]) {
          next = [current[0] + 1, current[1]];
        } else next = [current[0], current[1] - 1];
        break;
      case "F":
        if (current[0] === previous[0] - 1 && current[1] === previous[1]) {
          next = [current[0], current[1] + 1];
        } else next = [current[0] + 1, current[1]];
        break;
      case "|":
        if (current[0] - 1 === previous[0] && current[1] === previous[1]) {
          next = [current[0] + 1, current[1]];
        } else next = [current[0] - 1, current[1]];
        break;
    }

    input[current[0]][current[1]] = "X";

    steps++;
  }
  console.log(input);
  return steps / 2;
}

console.log(pipeMaze("testData"));
module.exports = { pipeMaze };
