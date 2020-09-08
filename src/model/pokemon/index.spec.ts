import { Pokemon } from ".";

describe("pokemon", () => {
  const testRow = {
    "#": "1",
    Name: "Bulbasaur",
    "Type 1": "Grass",
    "Type 2": "Poison",
    Total: "318",
    HP: "45",
    Attack: "49",
    Defense: "49",
    "Sp. Atk": "65",
    "Sp. Def": "65",
    Speed: "45",
    Generation: "1",
    Legendary: "False",
  };
  test("constructor", () => {
    expect(new Pokemon(testRow)).toBeTruthy();
    expect(() => {
      new Pokemon({
        ...testRow,
        "Type 2": "Grass", // Type 1 also grass = bad
      });
    }).toThrow();
    expect(() => {
      new Pokemon({
        ...testRow,
        "#": "ABC",
      });
    }).toThrow();
    expect(() => {
      new Pokemon({
        ...testRow,
        Legendary: "DEF",
      });
    }).toThrow();
  });
  test("isType", () => {
    const pokemon = new Pokemon(testRow);
    expect(pokemon.isType("Bug")).toBeFalsy();
    expect(pokemon.isType("Grass")).toBeTruthy();
    expect(pokemon.isType("Poison")).toBeTruthy();
  });
});
