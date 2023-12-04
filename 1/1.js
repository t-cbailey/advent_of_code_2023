const fsPromises = require("fs").promises;

//create a 2 digit number from the first and last digit (1-9) of each string, and return the total of all those digits.

async function sumCalibration() {
  const input = await fsPromises.readFile(
    "/Users/timbailey/coding/advent_of_code_2023/1/input.txt",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const dataArr = input.split("\n");

  const sums = dataArr.map((string) => {
    let first = findFirst(string);
    let last = findLast(string);

    return first + last;
  });
  console.log(sums);
  return sums.reduce((a, b) => {
    return parseInt(a) + parseInt(b);
  });
}

function findFirst(string) {
  const regex = /[0-9]/;
  while (string.length > 0) {
    if (string.startsWith("one")) {
      return "1";
    } else if (string.startsWith("two")) {
      return "2";
    } else if (string.startsWith("three")) {
      return "3";
    } else if (string.startsWith("four")) {
      return "4";
    } else if (string.startsWith("five")) {
      return "5";
    } else if (string.startsWith("six")) {
      return "6";
    } else if (string.startsWith("seven")) {
      return "7";
    } else if (string.startsWith("eight")) {
      return "8";
    } else if (string.startsWith("nine")) {
      return "9";
    } else if (regex.test(string[0])) {
      return string[0];
    } else string = string.slice(1, string.length);
  }
}

function findLast(string) {
  const regex = /[0-9]/;
  while (string.length > 0) {
    if (string.endsWith("one")) {
      return "1";
    } else if (string.endsWith("two")) {
      return "2";
    } else if (string.endsWith("three")) {
      return "3";
    } else if (string.endsWith("four")) {
      return "4";
    } else if (string.endsWith("five")) {
      return "5";
    } else if (string.endsWith("six")) {
      return "6";
    } else if (string.endsWith("seven")) {
      return "7";
    } else if (string.endsWith("eight")) {
      return "8";
    } else if (string.endsWith("nine")) {
      return "9";
    } else if (regex.test(string[string.length - 1])) {
      return string[string.length - 1];
    } else string = string.slice(0, string.length - 1);
  }
}

sumCalibration().then((res) => console.log(res));
