const { pipeMaze } = require("./10-part-1");
describe("test directions", () => {
  test("full test", () => {
    expect(pipeMaze("testInput")).toEqual(2);
    expect(pipeMaze("testInput2")).toEqual(2);
    expect(pipeMaze("testInput3")).toEqual(16);
  });
  test("testData", () => {
    expect(pipeMaze("testData")).toEqual(8);
    expect(pipeMaze("testData2")).toEqual(4);
  });
});
