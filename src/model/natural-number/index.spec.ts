import { NaturalNumber } from ".";

describe("natural-number", () => {
  test("type guard", () => {
    expect(NaturalNumber.is("string")).toBeFalsy();
    expect(NaturalNumber.is(0)).toBeFalsy();
    expect(NaturalNumber.is(-1)).toBeFalsy();
    expect(NaturalNumber.is(1.1)).toBeFalsy();
    expect(NaturalNumber.is(5)).toBeTruthy();
    expect(NaturalNumber.is(1000)).toBeTruthy();
  });
  test("multiply", () => {
    const nn = new NaturalNumber(1);
    nn.multiply(5);
    expect(nn.val).toEqual(5);
    nn.multiply(0.2);
    expect(nn.val).toEqual(1);
    nn.multiply(1.1);
    expect(nn.val).toEqual(1);
    nn.multiply(1.49999999);
    expect(nn.val).toEqual(1);
    nn.multiply(1.5);
    expect(nn.val).toEqual(2);
    expect(() => nn.multiply(0)).toThrow();
    expect(() => nn.multiply(-2)).toThrow();
  });
});
