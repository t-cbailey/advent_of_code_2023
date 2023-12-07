const fs = require("fs");
const { loadavg } = require("os");

function formatInput() {
  const input = fs.readFileSync(
    "/Users/timbailey/coding/advent_of_code_2023/5/input.txt",
    "utf8"
  );
  const dataArr = input.split("\n");
  const seed = dataArr.splice(0, 1)[0].split(",")[0].split(": ")[1].split(" ");

  const splitData = dataArr.map((string, i) => {
    return string.split(",");
  });

  let formattedArr = [];
  let count = -1;

  splitData.forEach((arr) => {
    if (arr[0] !== "") {
      formattedArr[count].push(...arr);
    } else {
      formattedArr.push([]);
      count++;
    }
  });

  formattedArr = formattedArr.map((arr) => {
    for (let i = 1; i < arr.length; i++) {
      arr[i] = arr[i].split(" ");
    }
    return arr;
  });

  return { data: formattedArr, seed };
}

function findSeedLocations() {
  const formattedData = formatInput();
  const { data, seed } = formattedData;
  const seedPairs = [];
  const search = true;

  for (let i = 0; i < seed.length; i = i + 2) {
    seedPairs.push([+seed[i], +seed[i + 1] + +seed[i]]);
  }

  for (let i = 0; search === true; i++) {
    const mapped = locationToSeed(i, data);
    console.log(mapped, "<--seed", i, "<--location");
    for (let x = 0; x < seedPairs.length; x++) {
      if (mapped >= seedPairs[x][0] && mapped < seedPairs[x][1]) {
        return i;
      }
    }
  }
}

function locationToSeed(location, data, index = data.length - 1) {
  if (Array.isArray(data[index])) {
    currData = data[index];
    let result = location;
    for (let i = 1; i < currData.length; i++) {
      if (
        +location >= +currData[i][0] &&
        +location <= +currData[i][2] + +currData[i][0]
      ) {
        const difference = +location - +currData[i][0];
        result = +currData[i][1] + +difference;
        break;
      } else result = location;
    }
    return locationToSeed(result, data, index - 1);
  } else return location;
}

console.log(findSeedLocations(), "<-- result");
