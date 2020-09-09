import { Pokemon } from "../model";

/** Exclude Legendary Pokémons */
export const excludeLegendary = (pokedex: Pokemon[]) =>
  pokedex.filter((pokemon) => !pokemon.legendary);

/** Exclude Pokémon of Type: Ghost */
export const excludeGhost = (pokedex: Pokemon[]) =>
  pokedex.filter((pokemon) => !pokemon.isType("Ghost"));

/** For Pokémon of Type: Steel, double their HP */
export const doubleSteelHP = (pokedex: Pokemon[]) =>
  pokedex.map((pokemon) => {
    if (pokemon.isType("Steel")) pokemon.hp.multiply(2);
    return pokemon;
  });

/** For Pokémon of Type: Fire, lower their Attack by 10% */
export const lowerFireAttack = (pokedex: Pokemon[]) =>
  pokedex.map((pokemon) => {
    if (pokemon.isType("Fire")) pokemon.attack.multiply(0.9);
    return pokemon;
  });

/** For Pokémon of Type: Bug & Flying, increase their Attack Speed by 10% */
export const increaseBugAndFlyingAttack = (pokedex: Pokemon[]) =>
  pokedex.map((pokemon) => {
    // TODO clarify ambiguous requirement
    if (pokemon.isType("Bug") && pokemon.isType("Flying"))
      pokemon.speed.multiply(1.1);
    return pokemon;
  });

/** For Pokémon that start with the letter **G**, add +5 Defense for every letter in their name (excluding **G**) */
export const increaseLetterGDefense = (pokedex: Pokemon[]) =>
  pokedex.map((pokemon) => {
    if (pokemon.name.val[0] === "G")
      pokemon.defense.val +=
        [...pokemon.name.val.matchAll(/[A-FH-z]/g)].length * 5;
    return pokemon;
  });
