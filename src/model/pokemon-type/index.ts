import { ArrayLiteral } from "../../utils";

export const PokemonTypeArray = [
  "Bug",
  "Dark",
  "Dragon",
  "Electric",
  "Fairy",
  "Fighting",
  "Fire",
  "Flying",
  "Ghost",
  "Grass",
  "Ground",
  "Ice",
  "Normal",
  "Poison",
  "Psychic",
  "Rock",
  "Steel",
  "Water",
] as const;

export type PokemonTypeValue = ArrayLiteral<typeof PokemonTypeArray>;

export class PokemonType {
  private _value: PokemonTypeValue;
  constructor(value: string) {
    if (!PokemonType.is(value))
      throw new Error(`value is not a ${PokemonType.name}`);
    this._value = value;
  }
  get val(): PokemonTypeValue {
    return this._value;
  }
  set val(value: PokemonTypeValue) {
    if (!PokemonType.is(value))
      throw new Error(`value is not a ${PokemonType.name}`);
    this._value = value;
  }
  static is(input: unknown): input is PokemonTypeValue {
    return (
      typeof input === "string" && PokemonTypeArray.some((t) => input === t)
    );
  }
}
