import { levenshtein, compose } from ".";

describe("utils", () => {
  test("levenshtein", () => {
    expect(levenshtein("testing", "testing")).toEqual(0);
    expect(levenshtein("testing", "resting")).toEqual(1);
    expect(levenshtein("testing", "testings")).toEqual(1);
    expect(levenshtein("testing", "testin")).toEqual(1);
  });
  test("compose", () => {
    const num: number = 3;
    expect(compose((a) => a)(num)).toEqual(num);
    expect(
      compose(
        (a) => a * 5,
        (a) => a + 5
      )(num)
    ).toEqual((num + 5) * 5);
    expect(
      compose(
        (a) => a + 5,
        (a) => a * 5
      )(num)
    ).toEqual(num * 5 + 5);
  });
});
