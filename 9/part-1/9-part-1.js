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

    if (nextStep.every((step) => step === 0)) {
      return addNextNum(tempArr);
    } else {
      tempArr.push(nextStep);
      count++;
    }
  }
};

const addNextNum = (arr) => {
  let total = 0;
  arr.forEach((innerArr) => {
    total += +innerArr[innerArr.length - 1];
  });
  return +total;
};

console.log(mirageMaintenance("input"));

module.exports = { mirageMaintenance, findNextNum };
