const { findNumbersIndeces, findNumbers, enginePartsSum } = require("./3");

describe("findNumbersIndeces - returns the index of any number found around a symbol", () => {
  test("should return indeces of numbers on the left x axis", async () => {
    const result = await findNumbersIndeces(0, 3, ["..5*.."]);
    expect(result).toEqual([[0, 2]]);
  });
  test("should return indeces of numbers on the right x axis", async () => {
    const result = await findNumbersIndeces(0, 3, ["...*5."]);
    expect(result).toEqual([[0, 4]]);
  });
  test("should return indeces of numbers on the top y axis", async () => {
    const result = await findNumbersIndeces(1, 1, [".5.", ".*.", "..."]);
    expect(result).toEqual([[0, 1]]);
  });
  test("should return indeces of numbers on the bottom y axis", async () => {
    const result = await findNumbersIndeces(1, 1, ["...", ".*.", ".5."]);
    expect(result).toEqual([[2, 1]]);
  });
  test("should return indeces of numbers on the top left", async () => {
    const result = await findNumbersIndeces(1, 1, ["5..", ".*.", "..."]);
    expect(result).toEqual([[0, 0]]);
  });
  test("should return indeces of numbers on the top right", async () => {
    const result = await findNumbersIndeces(1, 1, ["..5", ".*.", "..."]);
    expect(result).toEqual([[0, 2]]);
  });
  test("should return indeces of numbers on the bottom right", async () => {
    const result = await findNumbersIndeces(1, 1, ["...", ".*.", "..5"]);
    expect(result).toEqual([[2, 2]]);
  });
  test("should return indeces of numbers on the bottom left", async () => {
    const result = await findNumbersIndeces(1, 1, ["...", ".*.", "5.."]);
    expect(result).toEqual([[2, 0]]);
  });
  describe("Edge cases", () => {
    test("works at end of lines", async () => {
      const result = await findNumbersIndeces(1, 0, ["...", "*..", "5.."]);
      expect(result).toEqual([[2, 0]]);
      const result2 = await findNumbersIndeces(0, 0, ["*..", "5..", "..."]);
      expect(result2).toEqual([[1, 0]]);
    });
    test("finds multiple results", async () => {
      const result = await findNumbersIndeces(1, 0, ["5..", "*5.", "5.."]);
      expect(result).toEqual([
        [1, 1],
        [0, 0],
        [2, 0],
      ]);
      const result2 = await findNumbersIndeces(2, 2, ["5..", "55.", ".5*"]);
      expect(result2).toEqual([
        [2, 1],
        [1, 1],
      ]);
    });
    test("test data ", async () => {
      const input = [
        "467..114..",
        "...*......",
        "..35..633.",
        "......#...",
        "617*......",
        ".....+.58.",
        "..592.....",
        "......755.",
        "...$.*....",
        ".664.598..",
      ];
      const indeces = [
        [1, 3],
        [3, 6],
        [4, 3],
        [5, 5],
        [8, 3],
        [8, 5],
      ];

      const getResult = async () => {
        const result = [];
        indeces.forEach((index) => {
          findNumbersIndeces(index[0], index[1], input).then((res) => {
            result.push(res);
          });
        });
        return result;
      };
      const result = await getResult();
      expect(result).toEqual([
        [
          [2, 3],
          [0, 2],
          [2, 2],
        ],
        [
          [2, 6],
          [2, 7],
        ],
        [[4, 2]],
        [[6, 4]],
        [
          [9, 3],
          [9, 2],
        ],
        [
          [9, 5],
          [7, 6],
          [9, 6],
        ],
      ]);
    });
  });
});
describe("findNumbers- searches from the found number index and returns the full number.", () => {
  test("should find extra numbers to the left of index", async () => {
    const index = [[[0, 2]]];
    const input = [".55*."];
    const result = await findNumbers(index, input);
    expect(result.foundNumbers).toEqual(["55"]);
  });
  test("should find extra numbers to the left of index", async () => {
    const index = [[[0, 2]]];
    const input = ["555*."];
    const result = await findNumbers(index, input);
    expect(result.foundNumbers).toEqual(["555"]);
  });
  test("should find extra numbers to the right of index", async () => {
    const index = [[[0, 2]]];
    const input = [".*55."];
    const result = await findNumbers(index, input);
    expect(result.foundNumbers).toEqual(["55"]);
  });
  test("should overwrite used numbers with x to prevent duplicates", async () => {
    const index = [[[0, 2]]];
    const input = [".*55."];
    const result = await findNumbers(index, input);
    expect(result.mutatedInput).toEqual(".*xx.");
  });
  test("should overwrite used numbers with x to prevent duplicates", async () => {
    const index = [[[0, 2]]];
    const input = [".55*."];
    const result = await findNumbers(index, input);
    expect(input).toEqual(".xx*.");
  });
  test("should find extra numbers to the top of index", async () => {
    const index = [[[0, 4]]];
    const input = ["..555.", "..*..", "....."];
    const result = await findNumbers(index, input);
    expect(result.foundNumbers).toEqual(["555"]);
  });
  test("should find extra numbers to the bottom of index", async () => {
    const index = [[[2, 3]]];
    const input = [".....", "..*..", "...55"];
    const result = await findNumbers(index, input);
    expect(result.foundNumbers).toEqual(["55"]);
  });
  test.only("should work with multiple results", async () => {
    const index = [
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
    ];
    const input = ["..1..", "..2*.", "..3.."];
    const result = await findNumbers(index, input);
    expect(result.foundNumbers).toEqual(["1", "2", "3"]);
  });
});
