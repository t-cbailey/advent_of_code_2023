const { assertPipelinePrimaryTopicReference } = require("@babel/types");
const { count } = require("console");

const fsPromises = require("fs").promises;

async function formatInput() {
  const input = await fsPromises.readFile(
    "/Users/timbailey/coding/advent_of_code_2023/3/testData.txt",
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
  const isSymbol = /[^0-9.]/;
  let foundNumbersIndeces = [];
  //looping through all lines
  for (let i = 0; i < input.length; i++) {
    //looping through each string
    for (let x = 0; x < input[i].length; x++) {
      //if symbol is found
      if (isSymbol.test(input[i][x])) {
        //finds indeces of surrounding integers
        foundIndeces = await findNumbersIndeces(i, x, input);
        foundNumbersIndeces.push(foundIndeces);
      }
    }
  }

  //returns an array of found numbers
  const result = await findNumbers(foundNumbersIndeces, input);
  const { mutatedInput, foundNumbers } = result;
  input = mutatedInput;
  if (foundNumbers.length > 0) {
    return foundNumbers
      .filter((num) => {
        return num !== "x";
      })
      .reduce((a, b) => {
        return +a + +b;
      });
  }
  return 0;
}

async function findNumbersIndeces(outerIndex, innerIndex, input) {
  //search all around a symbol to find an integer, returns array of successful indeces
  const isNumber = /[0-9]/;
  const numberIndeces = [];

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
    if (input[index[0]] && isNumber.test(input[index[0]][index[1]])) {
      numberIndeces.push([index[0], index[1]]);
    }
  });
  return numberIndeces;
}

async function findNumbers(indeces, input) {
  //searches for and returns numbers at supplied indexes. Marks found numbers as x
  const foundNumbers = [];
  const isNumber = /[0-9]/;

  indeces.forEach((set) => {
    set.forEach((index) => {
      let startIndex = index[1];
      let endIndex = index[1];
      let backCounter = index[1];
      let forwardCounter = index[1];

      if (input[index[0]]) {
        while (
          backCounter >= 0 &&
          isNumber.test(input[index[0]][backCounter])
        ) {
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

        //overwrite used numbers with x to prevent duplicates
        String.prototype.replaceAt = function (index, replacement) {
          return (
            this.substring(0, index) +
            replacement +
            this.substring(index + replacement.length)
          );
        };
        input[index[0]] = input[index[0]].replaceAt(
          startIndex,
          "x".repeat(endIndex + 1 - startIndex)
        );
      }
    });
  });

  return { foundNumbers: foundNumbers, mutatedInput: input };
}

enginePartsSum().then((result) => console.log(result));

module.exports = { findNumbers, enginePartsSum, findNumbersIndeces };
