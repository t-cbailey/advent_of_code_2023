const fs = require("fs");
require("dotenv").config();

function formatInput(dataType) {
  const input = fs.readFileSync(
    `${process.env.FILE_PATH}9/${dataType}.txt`,
    "utf8"
  );
  const formattedInput = input.split("\n").map((line) => {
    return line.split(" ");
  });
  return formattedInput;
}

function mirageMaintenance(dataType) {
  const input = formatInput(dataType);
  return input
    .map((arr) => {
      return findNextNum(arr);
    })
    .reduce((a, b) => +a + +b);
}

const findNextNum = (arr) => {
  let tempArr = [arr];
  let count = 0;

  while (true) {
    const nextStep = [];
    for (let i = 0; i < tempArr[count].length - 1; i++) {
      nextStep.push(tempArr[count][i + 1] - tempArr[count][i]);
    }

    if (nextStep.every((item) => item === 0)) {
      nextStep.push(0);
      tempArr.push(nextStep);
      return addNextNum(tempArr);
    } else {
      tempArr.push(nextStep);
      count++;
    }
  }
};

const addNextNum = (arr) => {
  let count = arr.length - 1;
  while (count > 0) {
    arr[count - 1].unshift(0);
    arr[count - 1][0] = arr[count - 1][1] - arr[count][0];
    count--;
  }
  return arr[0][0];
};

console.log(mirageMaintenance("input"));

module.exports = { mirageMaintenance, findNextNum };
