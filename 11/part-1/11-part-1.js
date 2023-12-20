const fs = require("fs");
require("dotenv").config();

function formatInput(dataType) {
  const input = fs.readFileSync(
    `${process.env.FILE_PATH}11/${dataType}.txt`,
    "utf8"
  );
  const formattedInput = input.split("\n").map((line) => {
    return line.split("");
  });
  return formattedInput;
}

//insert extra rows
const cosmicExpansion = (inputType) => {
  const data = formatInput(inputType);
  const expandedUni = addLines(data);
  const coords = findCoords(expandedUni);
  const result = findDistances(coords);
  return result.reduce((a, b) => a + b);
};

const addLines = (data) => {
  // insert extra columns
  let index = 0;
  let count = 0;
  while (index < data[0].length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][index] !== ".") {
        break;
      } else if (count === data.length - 1) {
        for (let x = 0; x < data.length; x++) {
          data[x].splice(index, 0, ".");
        }
        index++;
      }
      count++;
    }
    count = 0;
    index++;
  }

  //insert extra rows
  for (let i = 0; i < data.length; i++) {
    let count = 0;
    for (let x = 0; x < data[0].length; x++) {
      if (data[i][x] !== ".") {
        break;
      } else if (count === data[i].length - 1) {
        const newArr = Array(data[i].length).fill(".");
        data.splice(i, 0, newArr);
        i++;
      }
      count++;
    }
  }

  return data;
};
const findCoords = (arr) => {
  const coords = [];
  arr.forEach((line, i) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] !== ".") {
        coords.push([i, x]);
      }
    }
  });
  return coords;
};
const findDistances = (coords) => {
  const distances = [];
  coords.forEach((coord, i) => {
    for (let x = i + 1; x < coords.length; x++) {
      const diff1 =
        coord[0] > coords[x][0]
          ? coord[0] - coords[x][0]
          : coords[x][0] - coord[0];
      const diff2 =
        coord[1] > coords[x][1]
          ? coord[1] - coords[x][1]
          : coords[x][1] - coord[1];
      const distance = diff1 + diff2;
      distances.push(distance);
    }
  });
  return distances;
};
console.log(cosmicExpansion("input"));
module.exports = { addLines };
