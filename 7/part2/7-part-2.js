248836197;
const fs = require("fs");

function formatInput() {
  const input = fs.readFileSync(
    "/Users/timbailey/coding/advent_of_code_2023/7/input.txt",
    "utf8"
  );

  const formattedData = input.split("\n").map((item) => {
    return item.split(" ");
  });
  return formattedData;
}

function camelCards() {
  const input = formatInput();
  const sortedByHandType = sortByHandType(input);
  const sortedByInitialValue = sortByInitialValue(sortedByHandType);

  return sortedByInitialValue
    .map((hand, i) => {
      return hand[1] * (i + 1);
    })
    .reduce((a, b) => {
      return a + b;
    });
}

function sortByHandType(input) {
  return input
    .map((hand) => {
      const cards = {};
      hand[0].split("").forEach((card) => {
        if (cards.hasOwnProperty(card)) {
          cards[card]++;
        } else {
          cards[card] = 1;
        }
      });

      const maxCards = Math.max(
        ...Object.keys(cards).map((key) => {
          return cards[key];
        })
      );

      for (key in cards) {
        if (
          Object.keys(cards).length === 1 ||
          (Object.keys(cards).length === 2 &&
            Object.keys(cards).includes("J") &&
            +cards[key] + +cards.J === 5)
        ) {
          hand.push("7");
          break;
        } else if (
          (Object.keys(cards).length === 2 && cards[key] === 4) ||
          (Object.keys(cards).length === 3 &&
            Object.keys(cards).includes("J") &&
            +cards[key] + +cards.J === 4)
        ) {
          hand.push("6");
          break;
        } else if (
          (Object.keys(cards).length === 2 &&
            cards[key] === 3 &&
            !Object.keys(cards).includes("J")) ||
          (Object.keys(cards).length === 3 &&
            cards.J === 1 &&
            +cards[key] + +cards.J === 3)
        ) {
          hand.push("5");
          break;
        } else if (
          (cards[key] === 3 &&
            Object.keys(cards).length === 3 &&
            !Object.keys(cards).includes("J")) ||
          (Object.keys(cards).length === 4 &&
            cards.J === 1 &&
            cards[key] + cards.J === 3) ||
          (Object.keys(cards).length === 4 &&
            cards.J === 2 &&
            +cards[key] + +cards.J === 3)
        ) {
          hand.push("4");
          break;
        } else if (
          Object.keys(cards).length === 3 &&
          maxCards < 3 &&
          !Object.keys(cards).includes("J")
        ) {
          hand.push("3");
          break;
        } else if (
          (Object.keys(cards).length === 4 &&
            !Object.keys(cards).includes("J") &&
            maxCards === 2) ||
          (Object.keys(cards).length === 5 && cards.J === 1)
        ) {
          hand.push("2");
          break;
        } else if (
          Object.keys(cards).length === 5 &&
          !Object.keys(cards).includes("J")
        ) {
          hand.push("1");
          break;
        }
      }
      return hand;
    })
    .sort((a, b) => {
      if (+a[2] > +b[2]) {
        return 1;
      }
      if (+a[2] < +b[2]) {
        return -1;
      }
      return 0;
    });
}

function sortByInitialValue(input) {
  const cardValues = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    T: 10,
    J: 1,
    Q: 12,
    K: 13,
    A: 14,
  };

  return input.sort((a, b) => {
    let returnVal = 0;
    if (a[2] === b[2]) {
      for (let i = 0; i < a[0].length; i++) {
        if (cardValues[a[0][i]] > cardValues[b[0][i]]) {
          returnVal = 1;
          break;
        }
        if (cardValues[a[0][i]] < cardValues[b[0][i]]) {
          returnVal = -1;
          break;
        }
      }
    }
    return returnVal;
  });
}

console.log(camelCards());

module.exports = { sortByHandType, sortByInitialValue };
