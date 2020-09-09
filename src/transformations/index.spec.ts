import { Pokemon } from "../model";
import {
  excludeLegendary,
  excludeGhost,
  doubleSteelHP,
  lowerFireAttack,
  increaseBugAndFlyingAttack,
  increaseLetterGDefense,
} from ".";

describe("transformations", () => {
  test("ExcludeLegendary", () => {
    const pokedex = [
      new Pokemon({
        "#": "1",
        Name: "Pokemon 1",
        "Type 1": "Grass",
        "Type 2": "Poison",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "False",
      }),
      new Pokemon({
        "#": "1",
        Name: "Pokemon 1",
        "Type 1": "Grass",
        "Type 2": "Poison",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "True",
      }),
    ];
    expect(excludeLegendary(pokedex).length).toEqual(1);
  });
  test("ExcludeGhost", () => {
    const pokedex = [
      new Pokemon({
        "#": "1",
        Name: "Pokemon 1",
        "Type 1": "Grass",
        "Type 2": "Poison",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "False",
      }),
      new Pokemon({
        "#": "1",
        Name: "Pokemon 2",
        "Type 1": "Ghost",
        "Type 2": "Poison",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "False",
      }),
      new Pokemon({
        "#": "1",
        Name: "Pokemon 3",
        "Type 1": "Grass",
        "Type 2": "Ghost",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "False",
      }),
    ];
    expect(excludeGhost(pokedex).length).toEqual(1);
  });
  test("DoubleSteelHP", () => {
    const pokedex = [
      new Pokemon({
        "#": "1",
        Name: "Pokemon 1",
        "Type 1": "Steel",
        "Type 2": "Poison",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "False",
      }),
    ];
    expect(doubleSteelHP(pokedex)[0].hp.val).toEqual(2);
  });
  test("LowerFireAttack", () => {
    const pokedex = [
      new Pokemon({
        "#": "1",
        Name: "Pokemon 1",
        "Type 1": "Fire",
        "Type 2": "Poison",
        Total: "1",
        HP: "1",
        Attack: "10",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "1",
        Generation: "1",
        Legendary: "False",
      }),
    ];
    expect(lowerFireAttack(pokedex)[0].attack.val).toEqual(9);
  });
  test("IncreaseBugAndFlyingAttack", () => {
    const pokedex = [
      new Pokemon({
        "#": "1",
        Name: "Pokemon 1",
        "Type 1": "Bug",
        "Type 2": "Flying",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "10",
        Generation: "1",
        Legendary: "False",
      }),
    ];
    expect(increaseBugAndFlyingAttack(pokedex)[0].speed.val).toEqual(11);
  });
  test("IncreaseLetterGDefense", () => {
    const pokedex = increaseLetterGDefense([
      new Pokemon({
        "#": "1",
        Name: "ooGaZg",
        "Type 1": "Bug",
        "Type 2": "Flying",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "10",
        Generation: "1",
        Legendary: "False",
      }),
      new Pokemon({
        "#": "1",
        Name: "GoAAGg",
        "Type 1": "Bug",
        "Type 2": "Flying",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "10",
        Generation: "1",
        Legendary: "False",
      }),
      new Pokemon({
        "#": "1",
        Name: "G",
        "Type 1": "Bug",
        "Type 2": "Flying",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "10",
        Generation: "1",
        Legendary: "False",
      }),
      new Pokemon({
        "#": "1",
        Name: "gooGoo",
        "Type 1": "Bug",
        "Type 2": "Flying",
        Total: "1",
        HP: "1",
        Attack: "1",
        Defense: "1",
        "Sp. Atk": "1",
        "Sp. Def": "1",
        Speed: "10",
        Generation: "1",
        Legendary: "False",
      }),
    ]);
    expect(pokedex[0].defense.val).toEqual(1);
    expect(pokedex[1].defense.val).toEqual(21);
    expect(pokedex[2].defense.val).toEqual(1);
    expect(pokedex[3].defense.val).toEqual(1);
  });
});
