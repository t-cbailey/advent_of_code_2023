const fsPromises = require("fs").promises;

async function formatInput() {
  const input = await fsPromises.readFile(
    "/Users/timbailey/coding/advent_of_code_2023/4/input.txt",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const dataArr = input.split("\n");
  return dataArr;
}

async function formatData() {
  const data = await formatInput();
  return data.map((card) => {
    card = card.split(":");
    card[1] = card[1].split("|");
    return card;
  });
}

async function cardValues() {
  const cards = await formatData();
  return cards.map((card) => {
    let cardTotal = 0;
    const winning = card[1][0].split(" ").filter((char) => char !== "");
    const myNums = card[1][1].split(" ").filter((char) => char !== "");
    winning.forEach((winningNumber) => {
      if (myNums.includes(winningNumber)) {
        cardTotal++;
      }
    });
    return cardTotal;
  });
}

async function sumPoints() {
  const cardMatches = await cardValues();
  let totalPoints = 0;
  cardMatches.forEach((val) => {
    let cardPoints = 0;
    for (let i = 1; i <= val; i++) {
      if (i === 1) {
        cardPoints += 1;
      } else {
        cardPoints *= 2;
      }
    }
    totalPoints += cardPoints;
  });
  return totalPoints;
}

sumPoints().then((res) => {
  console.log(res);
});
