import { NonEmptyString } from ".";

describe("non-empty-string", () => {
  test("type guard", () => {
    expect(NonEmptyString.is("")).toBeFalsy();
    expect(NonEmptyString.is(0)).toBeFalsy();
    expect(NonEmptyString.is(" ")).toBeTruthy();
    expect(NonEmptyString.is("four")).toBeTruthy();
  });
});
