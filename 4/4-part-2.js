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
  return cards.map((card, i) => {
    let cardTotal = 0;
    const winning = card[1][0].split(" ").filter((char) => char !== "");
    const myNums = card[1][1].split(" ").filter((char) => char !== "");
    winning.forEach((winningNumber) => {
      if (myNums.includes(winningNumber)) {
        cardTotal++;
      }
    });
    return { card: i, wins: cardTotal, numCards: 1 };
  });
}

async function sumPoints() {
  cardMatches = await cardValues();
  let totalCards = 0;
  cardMatches.forEach((card, i) => {
    for (let y = 0; y < card.numCards; y++) {
      for (let x = 1; x <= card.wins; x++) {
        const curr = cardMatches[i + x].numCards;
        cardMatches[i + x].numCards = curr + 1;
      }
    }
    totalCards += card.numCards;
  });

  return totalCards;
}

sumPoints().then((res) => {
  console.log(res);
});
