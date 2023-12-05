const { assertPipelinePrimaryTopicReference } = require("@babel/types");
const { count } = require("console");

const fsPromises = require("fs").promises;

async function formatInput() {
  const input = await fsPromises.readFile(
    "/Users/timbailey/coding/advent_of_code_2023/3/input.txt",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const dataArr = input.split("\n");
  return dataArr;
}

async function enginePartsSum() {
  let input = await formatInput();
  let allNumbers = [];
  //looping through all lines
  for (let i = 0; i < input.length; i++) {
    //looping through each string
    for (let x = 0; x < input[i].length; x++) {
      //if * is found
      if (input[i][x] === "*") {
        //find numbers around index
        foundNumbers = await findNumbersIndeces(i, x, input);
        allNumbers.push(foundNumbers);
      }
    }
  }
  return allNumbers
    .map((arr) => {
      if (Array.isArray(arr)) {
        return arr[0] * arr[1];
      }
    })
    .filter((num) => {
      return num !== undefined;
    })
    .reduce((a, b) => {
      return +a + +b;
    });
}

async function findNumbersIndeces(outerIndex, innerIndex, input) {
  //search all around a symbol to find an integer, returns array of successful indeces
  const isNumber = /[0-9]/;
  let foundNumbers = [];

  const indexesToSearch = [
    [outerIndex, innerIndex - 1],
    [outerIndex, innerIndex + 1],
    [outerIndex - 1, innerIndex],
    [outerIndex + 1, innerIndex],
    [outerIndex - 1, innerIndex - 1],
    [outerIndex - 1, innerIndex + 1],
    [outerIndex + 1, innerIndex + 1],
    [outerIndex + 1, innerIndex - 1],
  ];

  indexesToSearch.forEach((index) => {
    let startIndex = index[1];
    let endIndex = index[1];
    let backCounter = index[1];
    let forwardCounter = index[1];

    while (backCounter >= 0 && isNumber.test(input[index[0]][backCounter])) {
      startIndex = backCounter;
      backCounter--;
    }
    while (
      forwardCounter < input[index[0]].length &&
      isNumber.test(input[index[0]][forwardCounter])
    ) {
      endIndex = forwardCounter;
      forwardCounter++;
    }
    let foundNum = input[index[0]].slice(startIndex, endIndex + 1);

    foundNumbers.push(foundNum);
  });

  foundNumbers = foundNumbers
    .sort()
    .filter((item, i) => item !== "." && item !== foundNumbers[i + 1]);
  if (foundNumbers.length === 2) {
    return foundNumbers;
  }
}
enginePartsSum().then((result) => console.log(result));
