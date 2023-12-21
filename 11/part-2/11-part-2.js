const fs = require("fs");
require("dotenv").config();

const cosmicExpansion = (inputType) => {
  const data = formatInput(inputType);
  const [expandedIX, expandedIY] = findExtraLines(data);
  const coords = findCoords(data);
  const distances = findDistances(coords, expandedIX, expandedIY);
  return distances.reduce((a, b) => a + b);
};

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
const findExtraLines = (data) => {
  const extraLineIndecesX = [];
  const extraLineIndecesY = [];

  // count extra columns
  let index = 0;
  let count = 0;
  while (index < data[0].length) {
    for (let i = 0; i < data.length; i++) {
      if (data[i][index] !== ".") {
        break;
      } else if (count === data.length - 1) {
        extraLineIndecesY.push(index);
        index++;
      }
      count++;
    }
    count = 0;
    index++;
  }

  //count extra rows
  data.forEach((arr) => {
    if (
      arr.every((item) => {
        item === ".";
      })
    ) {
      extraLineIndecesX.push(i);
    }
  });
  return [extraLineIndecesX, extraLineIndecesY];
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
const findDistances = (coords, expandedIX, expandedIY) => {
  const distances = [];
  coords.forEach((coord, i) => {
    for (let x = i + 1; x < coords.length; x++) {
      // calculate x-axis difference
      let startX = coord[0];
      let endX = coords[x][0];
      if (startX > endX) {
        (startX = endX), (endX = startX);
      }
      let diffX = endX - startX;
      for (let n = startX; n < endX; n++) {
        if (expandedIX.includes(n)) {
          diffX = diffX + (1000000 - 1);
        }
      }

      // calculate Y-axis difference
      let startY = coord[1];
      let endY = coords[x][1];
      if (startY > endY) {
        [startY, endY] = [endY, startY];
      }
      let diffY = endY - startY;
      for (let n = startY; n < endY; n++) {
        if (expandedIY.includes(n)) {
          diffY = diffY + (1000000 - 1);
        }
      }

      const distance = diffX + diffY;
      distances.push(distance);
    }
  });
  return distances;
};
console.log(cosmicExpansion("input"), "<-- result!");
