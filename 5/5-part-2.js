const fs = require("fs");

function formatInput() {
  const input = fs.readFileSync(
    "/Users/timbailey/coding/advent_of_code_2023/5/testData.txt",
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

  for (let i = 0; i < seed.length; i = i + 2) {
    seedPairs.push([seed[i], seed[i + 1]]);
  }

  const checked = [];
  const allMapped = seedPairs.map((pair) => {
    console.log(pair, "<-- currPair");
    let lowest = 0;
    const start = +pair[0];
    const end = +pair[0] + +pair[1];
    console.log(checked, "<-- checked");

    for (let i = start; i < end; i++) {
      console.log(i);
      if (checked.indexOf(i) === -1) {
        const mapped = convertToLocation(i, data);
        if (i === start || mapped < lowest) {
          lowest = mapped;
        }
        checked.push(i);
      }
    }

    return lowest;
  });

  return Math.min(...allMapped);
}

function convertToLocation(seed, data, index = 0) {
  if (Array.isArray(data[index])) {
    currData = data[index];
    for (let i = 1; i < currData.length; i++) {
      if (
        +seed >= +currData[i][1] &&
        +seed <= +currData[i][2] + +currData[i][1]
      ) {
        const difference = seed - currData[i][1];
        result = +currData[i][0] + +difference;
        break;
      } else result = +seed;
    }

    return convertToLocation(result, data, index + 1);
  } else return seed;
}

console.log(findSeedLocations(), "<-- result");
