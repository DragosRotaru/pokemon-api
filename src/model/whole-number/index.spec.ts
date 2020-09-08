import { WholeNumber } from ".";

describe("natural-number", () => {
  test("type guard", () => {
    expect(WholeNumber.is("string")).toBeFalsy();
    expect(WholeNumber.is(0)).toBeTruthy();
    expect(WholeNumber.is(-1)).toBeFalsy();
    expect(WholeNumber.is(1.1)).toBeFalsy();
    expect(WholeNumber.is(5)).toBeTruthy();
    expect(WholeNumber.is(1000)).toBeTruthy();
  });
});
