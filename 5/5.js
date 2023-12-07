const fs = require("fs");

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

  const mapped = seed.map((currSeed) => {
    return seedToSoil(currSeed, data);
  });

  return Math.min(...mapped);
}

function seedToSoil(seed, data, index = 0) {
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

    return seedToSoil(result, data, index + 1);
  } else return seed;
}

console.log(findSeedLocations());
