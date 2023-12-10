const { sortByHandType, sortByInitialValue } = require("./7-part-2");

describe("sortByHandType", () => {
  describe("should append correct hand identifier", () => {
    //5 of any card
    test("should append '7' to array to identify five of a kind", () => {
      const input = [["AAAAA", "765"]];
      expect(sortByHandType(input)).toEqual([["AAAAA", "765", "7"]]);
      const input2 = [["22222", "765"]];
      expect(sortByHandType(input2)).toEqual([["22222", "765", "7"]]);
      const input3 = [["22J2J", "765"]];
      expect(sortByHandType(input3)).toEqual([["22J2J", "765", "7"]]);
      const input4 = [["JJJJJ", "765"]];
      expect(sortByHandType(input4)).toEqual([["JJJJJ", "765", "7"]]);
      const input5 = [["JJJJ1", "765"]];
      expect(sortByHandType(input5)).toEqual([["JJJJ1", "765", "7"]]);
      const input6 = [["J1JJ1", "765"]];
      expect(sortByHandType(input6)).toEqual([["J1JJ1", "765", "7"]]);
    });
    //four of one card and one of another
    test("should append '6' to array to identify four of a kind", () => {
      const input = [["AAAA1", "765"]];
      expect(sortByHandType(input)).toEqual([["AAAA1", "765", "6"]]);
      const input2 = [["2222A", "765"]];
      expect(sortByHandType(input2)).toEqual([["2222A", "765", "6"]]);
      const input3 = [["2223J", "765"]];
      expect(sortByHandType(input3)).toEqual([["2223J", "765", "6"]]);
      const input4 = [["2JJ3J", "765"]];
      expect(sortByHandType(input4)).toEqual([["2JJ3J", "765", "6"]]);
      const input5 = [["KTJJT", "220"]];
      expect(sortByHandType(input5)).toEqual([["KTJJT", "220", "6"]]);
      const input6 = [["JJJ56", "220"]];
      expect(sortByHandType(input6)).toEqual([["JJJ56", "220", "6"]]);
      const input7 = [["7JJ72", "220"]];
      expect(sortByHandType(input7)).toEqual([["7JJ72", "220", "6"]]);
      const input8 = [["J88J9", "220"]];
      expect(sortByHandType(input8)).toEqual([["J88J9", "220", "6"]]);
    });
    //3 of the same and 2 others of same type
    test("should append '5' to array to identify full house", () => {
      const input = [["AAA22", "765"]];
      expect(sortByHandType(input)).toEqual([["AAA22", "765", "5"]]);
      const input2 = [["2J2AA", "765"]];
      expect(sortByHandType(input2)).toEqual([["2J2AA", "765", "5"]]);
      const input3 = [["22JAA", "765"]];
      expect(sortByHandType(input3)).toEqual([["22JAA", "765", "5"]]);
      const input4 = [["35J53", "765"]];
      expect(sortByHandType(input4)).toEqual([["35J53", "765", "5"]]);
      const input5 = [["42J42", "765"]];
      expect(sortByHandType(input5)).toEqual([["42J42", "765", "5"]]);
      const input6 = [["4224J", "765"]];
      expect(sortByHandType(input6)).toEqual([["4224J", "765", "5"]]);
    });
    //3 of the same and 2 others of different types
    test("should append '4' to array to identify three of a kind", () => {
      const input = [["AAA12", "765"]];
      expect(sortByHandType(input)).toEqual([["AAA12", "765", "4"]]);
      const input3 = [["2J2KA", "765"]];
      expect(sortByHandType(input3)).toEqual([["2J2KA", "765", "4"]]);
      const input4 = [["J2234", "765"]];
      expect(sortByHandType(input4)).toEqual([["J2234", "765", "4"]]);
      const input5 = [["23J35", "765"]];
      expect(sortByHandType(input5)).toEqual([["23J35", "765", "4"]]);
      const input6 = [["JK87J", "864"]];
      expect(sortByHandType(input6)).toEqual([["JK87J", "864", "4"]]);
      const input7 = [["3JQ8J", "893"]];
      expect(sortByHandType(input7)).toEqual([["3JQ8J", "893", "4"]]);
    });
    //two pairs of cards, and 3 of different types
    test("should append '3' to array to identify two pair", () => {
      const input = [["1122K", "765"]];
      expect(sortByHandType(input)).toEqual([["1122K", "765", "3"]]);
      const input2 = [["A22KK", "765"]];
      expect(sortByHandType(input2)).toEqual([["A22KK", "765", "3"]]);
    });

    test("should append '2' to array to identify one pair", () => {
      const input = [["223QK", "765"]];
      expect(sortByHandType(input)).toEqual([["223QK", "765", "2"]]);
      const input2 = [["A33K8", "765"]];
      expect(sortByHandType(input2)).toEqual([["A33K8", "765", "2"]]);
      const input3 = [["J6758", "273"]];
      expect(sortByHandType(input3)).toEqual([["J6758", "273", "2"]]);
    });
    test("should append '1' to array to identify high card", () => {
      const input = [["423QK", "765"]];
      expect(sortByHandType(input)).toEqual([["423QK", "765", "1"]]);
      const input2 = [["62345", "765"]];
      expect(sortByHandType(input2)).toEqual([["62345", "765", "1"]]);
    });
  });
  test("should return array sorted by hand type", () => {
    const input = [
      ["T55J5", "765"],
      ["32T3K", "765"],
    ];
    expect(sortByHandType(input)).toEqual([
      ["32T3K", "765", "2"],
      ["T55J5", "765", "6"],
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
      ["T55J5", "684", "6"],
      ["KTJJT", "220", "6"],
      ["QQQJA", "483", "6"],
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
