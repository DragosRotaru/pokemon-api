import { PokemonType } from ".";

describe("pokemon-type", () => {
  test("type guard", () => {
    expect(PokemonType.is("")).toBeFalsy();
    expect(PokemonType.is(0)).toBeFalsy();
    expect(PokemonType.is("Bug")).toBeTruthy();
    expect(PokemonType.is("Ground")).toBeTruthy();
  });
});
