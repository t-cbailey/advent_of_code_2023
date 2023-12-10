const { sortByHandType, sortByInitialValue } = require("./7");

describe("sortByHandType", () => {
  describe("should append correct hand identifier", () => {
    test("should append '7' to array to identify five of a kind", () => {
      const input = [["AAAAA", "765"]];
      expect(sortByHandType(input)).toEqual([["AAAAA", "765", "7"]]);
      const input2 = [["22222", "765"]];
      expect(sortByHandType(input2)).toEqual([["22222", "765", "7"]]);
    });
    test("should append '6' to array to identify four of a kind", () => {
      const input = [["AAAA1", "765"]];
      expect(sortByHandType(input)).toEqual([["AAAA1", "765", "6"]]);
      const input2 = [["2222A", "765"]];
      expect(sortByHandType(input2)).toEqual([["2222A", "765", "6"]]);
    });
    test("should append '5' to array to identify full house", () => {
      const input = [["AAA11", "765"]];
      expect(sortByHandType(input)).toEqual([["AAA11", "765", "5"]]);
      const input2 = [["222AA", "765"]];
      expect(sortByHandType(input2)).toEqual([["222AA", "765", "5"]]);
    });
    test("should append '4' to array to identify three of a kind", () => {
      const input = [["AAA12", "765"]];
      expect(sortByHandType(input)).toEqual([["AAA12", "765", "4"]]);
      const input2 = [["222KA", "765"]];
      expect(sortByHandType(input2)).toEqual([["222KA", "765", "4"]]);
    });
    test("should append '3' to array to identify two pair", () => {
      const input = [["1122K", "765"]];
      expect(sortByHandType(input)).toEqual([["1122K", "765", "3"]]);
      const input2 = [["A22KK", "765"]];
      expect(sortByHandType(input2)).toEqual([["A22KK", "765", "3"]]);
    });
    test("should append '2' to array to identify one pair", () => {
      const input = [["11JQK", "765"]];
      expect(sortByHandType(input)).toEqual([["11JQK", "765", "2"]]);
      const input2 = [["A22K8", "765"]];
      expect(sortByHandType(input2)).toEqual([["A22K8", "765", "2"]]);
    });
    test("should append '1' to array to identify high card", () => {
      const input = [["12JQK", "765"]];
      expect(sortByHandType(input)).toEqual([["12JQK", "765", "1"]]);
      const input2 = [["12345", "765"]];
      expect(sortByHandType(input2)).toEqual([["12345", "765", "1"]]);
    });
  });
  test("should return array sorted by hand type", () => {
    const input = [
      ["11JQK", "765"],
      ["12JQK", "765"],
    ];
    expect(sortByHandType(input)).toEqual([
      ["12JQK", "765", "1"],
      ["11JQK", "765", "2"],
    ]);
    const input2 = [
      ["32T3K", "765"],
      ["T55J5", "684"],
      ["KK677", "28"],
      ["KTJJT", "220"],
      ["QQQJA", "483"],
    ];
    expect(sortByHandType(input2)).toEqual([
      ["32T3K", "765", "2"],
      ["KK677", "28", "3"],
      ["KTJJT", "220", "3"],
      ["T55J5", "684", "4"],
      ["QQQJA", "483", "4"],
    ]);
  });
});

describe("sortByInitalValue", () => {
  test("should sort equally ranked hands", () => {
    const input = [
      ["T55J5", "684", "4"],
      ["QQQJA", "483", "4"],
    ];
    expect(sortByInitialValue(input)).toEqual([
      ["T55J5", "684", "4"],
      ["QQQJA", "483", "4"],
    ]);
    const input2 = [
      ["32T3K", "765", "2"],
      ["KTJJT", "220", "3"],
      ["KK677", "28", "3"],
      ["T55J5", "684", "4"],
      ["QQQJA", "483", "4"],
    ];

    expect(sortByInitialValue(input2)).toEqual([
      ["32T3K", "765", "2"],
      ["KTJJT", "220", "3"],
      ["KK677", "28", "3"],
      ["T55J5", "684", "4"],
      ["QQQJA", "483", "4"],
    ]);
  });
});
